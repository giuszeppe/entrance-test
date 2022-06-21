<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'content' => $this->faker->text(30),
            'from_id' => \App\Models\User::all()->random(1)[0]->uuid,
            'to_id' => \App\Models\User::all()->random(1)[0]->uuid,
            //
        ];
    }
}
