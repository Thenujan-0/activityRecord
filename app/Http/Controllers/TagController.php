<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use Auth;

class TagController extends Controller
{
    
    function tags(Request $request){
        $tags = Tag::all()->pluck("date")->toArray();
        return response()->json($tags);
    }

    function create(Request $request){
        $tag = Tag::create(['']);
    }
}
