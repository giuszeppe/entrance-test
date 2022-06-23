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
    

    //
}
