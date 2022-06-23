<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function getMessagesForUser(Request $request)
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
        $ids = $messages->where('to_id',auth()->user()->uuid)->pluck('id');
        Message::find($ids)->each(function($item){$item->read = true;$item->save();});
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
            'timestamp' => $message->created_at,
            'from_id' => auth()->user()->uuid
        ]);
        
    }
    public function getMessages()
    {
        $received = Message::where('to_id', auth()->user()->uuid)
            ->orWhere('from_id',auth()->user()->uuid)
            ->orderByDesc('created_at')->get();
        $messages = collect();
        $ids = [];
        foreach ($received as $message => $item) {
            if(!in_array($item->from_id,$ids) && !in_array($item->to_id,$ids)){
                if($item->from_id == auth()->user()->uuid){
                    array_push($ids,$item->to_id);
                } else {
                    array_push($ids,$item->from_id);
                }
                $notReadCount = Message::where('from_id',$item->from_id)
                    ->where('to_id',auth()->user()->uuid)
                    ->where('read',false)->count();
                $messages->push([
                    'message' => Message::findOrFail($item->id),
                    'sender' => User::where('uuid',$item->from_id == auth()->user()->uuid ? $item->to_id : $item->from_id)->first(),
                    'notReadCount' => $notReadCount
                ]);
            }
        }
        
        return response()->json([
            'messages' => $messages
        ]);
    }
    public function readMessage(Request $request)
    {
        $chatId = $request->get('chatId');
        Message::where('from_id',$chatId)->where('to_id', auth()->user()->uuid)->update(['read' => true]);
        return response()->json([]);
    }
}
