<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fap extends Model
{
    use HasFactory;

    protected $table= 'faps_table';

    protected $fillable = [
        'user_id',
        'date',
        'text'        
    ];
}
