<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Tag;
use App\Models\UserTag;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $user = User::firstOrCreate(['email' => 'testuser@gmail.com',],[
            'name' => 'Thenujan Sandramohan',
            'password' => Hash::make("thenujan2002"),
        ]);

        if(Tag::all()->count() <10){
            Tag::factory(10)->create();
        }
        if(UserTag::all()->count() <10){
            echo (UserTag::all()->count());
            UserTag::factory(10)->create();
        }
    }
}
