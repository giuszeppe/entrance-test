<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserFromContacts(Request $request)
    {
        $searchQuery = $request->get('searchQuery', '');


        return response()->json(
            [
                'query' => $searchQuery,
                auth()->user()->contacts->where('name', $searchQuery)
            ]
        );
    }
    //
}
