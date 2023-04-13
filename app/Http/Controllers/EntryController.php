<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->input("date");
        $exploded = explode("-",$date);
        $year = $exploded[0];
        $month = $exploded[1];
        $user_id = Auth::user()->id;
        // $user_id = 1;
        $initialDate = date($year."-".$month."-01");
        $finalDate = date('Y-m-d', strtotime('+1 month', strtotime($year."-".$month."-01")));
        $entries = Entry::where(["user_id"=>$user_id])->whereBetween("date",[$initialDate,$finalDate])->get();
        $entriesWithTags = [];

        foreach($entries as $entry){
            $tag = $entry->tag()->name;
            $entry["tag_name"]= $tag;
            array_push($entriesWithTags,$entry);
        }

        //Now lets make date=>[list of tags]
        $datesArray= [];
        foreach($entries as $entry){
            if (!array_key_exists($entry->date,$datesArray)){
                $datesArray[$entry->date]=[];
            }
            array_push($datesArray[$entry->date],$entry->tag_name);
        }
        return response()->json($datesArray);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tags = $request->input("tags");
        // $tag_ids = $this->find_tag_ids($tag_names);
        $user_id = Auth::user()->id;
        $date = $request->input("date");
        foreach($tags as $tag){
            Entry::create(['user_id'=>$user_id,"tag_id"=>$tag["id"],"date"=>$date]);
        }
    }

    private function find_tag_ids(Array $tags){
        $tag_ids=[];
        foreach($tags as $tag){
            $id = Tag::where(['name'=>$tag])->pluck("id")->first();
            array_push($tag_ids,$id);
        }
        return $tag_ids;
    }

    /**
     * Display the specified resource.
     */
    public function show(Entry $entry)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entry $entry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Entry $entry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entry $entry)
    {
        //
    }
}
