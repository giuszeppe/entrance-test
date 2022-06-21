<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

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
        $received = auth()->user()->received()->where('from_id', $uuid)->get(['id','content','created_at','from_id']);
        $sent = auth()->user()->sent()->where('to_id', $uuid)->get(['id','content','created_at','from_id']);
        $messages = collect([$received,$sent])->flatten();

        return response()->json([
            'lenght' => $received->count() + $sent->count(),
            'messages' => $messages,
            'sender' => User::where('uuid',$uuid)->first(),
        ]);
    }
    //
}
