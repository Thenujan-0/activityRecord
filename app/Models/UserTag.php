<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTag extends Model
{
    use HasFactory;

    protected $table= 'user_tags';

    protected $fillable = [
        'user_id',
        'tag_id',
    ];

    public function tag(){
        return Tag::where(['id'=>$this->tag_id])->first();
    }
}
