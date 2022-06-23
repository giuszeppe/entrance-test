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
| Middleware auth:sanctum is assigned on RouteServiceProvider!!!!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
});
/**
 * Users
 */
Route::get('user/contacts', [UserController::class, 'getUserFromContacts'])->name('contacts');
Route::post('user/update',[UserController::class,'update'])->name('updateUser');

/**
 * Messages
 */
Route::get('chatMessages', [MessageController::class, 'getMessagesForUser'])->name('chatMessages');
Route::post('message', [MessageController::class, 'postMessage'])->name('sendMessage');
Route::get('messages', [MessageController::class, 'getMessages'])->name('messages');
Route::get('messageRead', [MessageController::class, 'readMessage'])->name('readMessage');