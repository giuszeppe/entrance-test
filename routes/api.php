<?php

use App\Http\Controllers\MessageController;
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
Route::get('chatMessages', [MessageController::class, 'getMessagesForUser'])->middleware('auth:sanctum')->name('chatMessages');
Route::post('message', [MessageController::class, 'postMessage'])->middleware('auth:sanctum')->name('sendMessage');
Route::get('messages', [MessageController::class, 'getMessages'])->middleware('auth:sanctum')->name('messages');

Route::get('messageRead', [MessageController::class, 'readMessage'])->middleware('auth:sanctum')->name('readMessage');