<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Tag;
use App\Models\UserTag;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fap>
 */

class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $testUserId = User::where(['email'=>'testuser@gmail.com'])->pluck('id');

        return [
            'name'=>$this->create_random_tag(),
            'description'=>fake()->text(),
        ];
    }

    private function create_random_tag(){
        
        //To avoidit failing to detect a tag that has already been inserted and try to duplicate entry

        $tags = ['Wash cloths','Sweep house','Fap', 'Go out', 'Eat out', 'Gym', 'Movie', 'Friends', 'Girl Friend'];
        $selected = NULL;
        $tag_exists = FALSE;

        $overFlowCount = 0;
        $selected =NULL;

        do{
            $selected = fake()->randomElement($tags);
            $tag_exists = Tag::where(['name'=>$selected])->get()->count() > 0 ;
            echo($tag_exists."\n");
            $overFlowCount++;
        } while ($tag_exists  && $overFlowCount < 20);

        if($overFlowCount >= 20){
            $selected = fake()->unique()->word();
        }
        return $selected;
    }
}
