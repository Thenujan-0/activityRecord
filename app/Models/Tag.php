<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\UserTag;

class Tag extends Model
{
    use HasFactory;

    protected $table= 'tags';

    protected $fillable = [
        'name',
        'description',
        'icon'
    ];

    public function users(){
        $userTags = UserTag::where(['tag_id'=>$this->id]);
        $users = [];
        foreach ($userTags as $userTag){
            $user = User::find($userTag->user_id);
            array_push($users,$user);
        }
        return $users;
    }
}
