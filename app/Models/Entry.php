<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Tag;

class Entry extends Model
{
    use HasFactory;

    protected $fillable =[
        'user_id',
        'tag_id',
        'date'
    ];

    public function tag(){
        return Tag::where(["id"=>$this->tag_id])->first();
    }
}
