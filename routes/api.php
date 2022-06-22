<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('user/contacts', [UserController::class, 'getUserFromContacts'])->middleware('auth:sanctum')->name('contacts');
Route::get('messages', [UserController::class, 'getMessages'])->middleware('auth:sanctum')->name('messages');
Route::post('message', [UserController::class, 'postMessage'])->middleware('auth:sanctum')->name('sendMessage');
