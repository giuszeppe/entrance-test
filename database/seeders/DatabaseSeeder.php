<?php

namespace Database\Seeders;

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
        User::factory()->count(10)->create();
        $users = User::all();
        User::all()->each(function ($user) use ($users) {
            do {
                $idsToAttach = $users->random(rand(1, 3))->pluck('id')->toArray();
                $idsToAttach = array_diff($idsToAttach, array($user->id));
            } while (count($idsToAttach) <= 0);
            $user->contacts()->attach(
                $idsToAttach
            );
        });
    }
}
