<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         $users = User::all();
        foreach ($users as $user) {
            Task::factory()
                ->count(12)
                ->for($user) // <--- без 'user_id'
                ->create();
        }
    }
}
