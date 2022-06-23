<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File ;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function getUserFromContacts(Request $request)
    {
        $searchQuery = $request->get('searchQuery', '');

       $contacts = User::with(['contacts' => function($q){
            $q->where('user_id',auth()->user()->id);
       }])
       ->where('name', 'like', "%$searchQuery%")
       ->get(['name','uuid','profile']);


        return response()->json(
            [
                'query' => $searchQuery,
                'contacts' => $contacts
            ]
        );
    }
    public function update(Request $request)
    {
        $validated = $request->validate([
            'email' => 'email|nullable',
            'name' => 'string|nullable',
            'profile' => 'mimes:jpeg,jpg,png,gif,svg|nullable'
        ]);
        if($request->file('profile')){
            $file= $request->file('profile');
            $filename= date('YmdHi').$file->getClientOriginalName();
            Storage::put('public/images/users/' . $filename,File::get($file));
            $validated['profile'] = 'storage/images/users/' . $filename;
        }
        auth()->user()->update($validated);
    }
    

    //
}
