<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Tag;
use App\Models\UserTag;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fap>
 */

class UserTagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $testUserId = User::where(['email'=>'testuser@gmail.com'])->pluck('id')->first();

        return [
            'user_id'=>$testUserId,
            'tag_id'=>$this->random_tag_id($testUserId),
        ];
    }

    private function random_tag_id($user_id){

        $overFlowCounter = 0;
        do{
            $tag_id = fake()->randomElement(Tag::all()->pluck("id")->toArray());
            $exists = UserTag::where(['user_id'=>$user_id,'tag_id'=>$tag_id])->get()->count()>0;
            $overFlowCounter++;
        } while($exists && $overFlowCounter <50);

        return $tag_id;

    }

}
