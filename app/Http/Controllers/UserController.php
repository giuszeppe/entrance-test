<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getUserFromContacts(Request $request)
    {
        $searchQuery = $request->get('searchQuery', '');

       $contacts = User::with(['contacts' => function($q){
            $q->where('user_id',auth()->user()->id);
       }])
       ->where('name', 'like', "%$searchQuery%")
       ->get(['name','uuid']);


        return response()->json(
            [
                'query' => $searchQuery,
                'contacts' => $contacts
            ]
        );
    }
    public function getMessages(Request $request)
    {

        $uuid = $request->get('uuid','');
        if(!$uuid) return redirect('route');
        $received = DB::select('SELECT messages.id,messages.content,messages.created_at,messages.from_id,messages.to_id
        FROM users
        INNER JOIN messages ON users.uuid=messages.to_id
        WHERE users.uuid=:to_uuid AND messages.from_id=:from_uuid
        ',['to_uuid' => $uuid,'from_uuid' => auth()->user()->uuid]);
        $sent = DB::select('SELECT messages.id,messages.content,messages.created_at,messages.from_id,messages.to_id
        FROM users
        INNER JOIN messages ON users.uuid=messages.from_id
        WHERE messages.to_id=:to_uuid AND messages.from_id=:from_uuid
        ',
        ['from_uuid' => $uuid,'to_uuid' => auth()->user()->uuid]
    );
        //auth()->user()->received()->where('from_id', $uuid)->get(['id','content','created_at','from_id']);
        //$sent = auth()->user()->sent()->where('to_id', $uuid)->get(['id','content','created_at','from_id']);

        
        $messages = collect([$received,$sent])->flatten();
        $messages = $messages->sortBy('created_at')->values()->all();
        return response()->json([
            'lenght' => count($messages),
            'messages' => $messages,
            'sender' => User::where('uuid',$uuid)->first(),
        ]);
    }
    public function postMessage(Request $request)
    {

        $message = Message::create([
            'to_id' => $request['uuid'],
            'content' => $request['content'],
            'from_id' => auth()->user()->uuid
        ]);
        MessageSent::dispatch([
            'content' => $message->content,
            'to_id' => $message->to_id,
            'timestamp' => $message->created_at
        ]);
    }
    //
}
