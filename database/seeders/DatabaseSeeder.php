<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'giuszeppe',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password')
        ]);
        Message::factory()
            ->count(200)
            ->create();
        User::factory()->count(10)->create();
        $users = User::all();
        $messages = Message::all();
        User::all()->each(function ($user) use ($users) {
            do {
                $idsToAttach = $users->random(rand(1, 3))->pluck('id')->toArray();
                $idsToAttach = array_diff($idsToAttach, array($user->id));
            } while (count($idsToAttach) <= 0);
            $user->contacts()->attach(
                $idsToAttach
            );
        });
        Message::all()->each(function ($message) use ($users) {
            do {
                $sender = $users->random(1)->pluck('uuid');
                $receiver = $users->random(1)->pluck('uuid');

            } while ($sender[0] == $receiver[0]);
            $message->receiver()->associate(
                $receiver[0]
            );
            $message->sender()->associate(
                $sender[0]
            );
            $message->save();
        });
    }
}
