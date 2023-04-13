import PopupMenu from "./PopupMenu"
import GridView from "./GridView"
import TagItem from "./TagItem"
import { useEffect, useState } from "react"
import axios from "axios"


function SelectTags({style, tags, confirmCallbackParent}){


    const [selectedTags, selectedTagsUpdate] = useState([])
    const deSelectedTags = tags.filter((elem)=>!selectedTags.includes(elem))
    function clickCallback(e){
        let target = e.target
        if(target instanceof HTMLHeadingElement){
            target = e.target.parentElement
        }

        const id = target.getAttribute("id")
        
        e.stopPropagation()

        for(let i=0;i<tags.length;i++){
            const tag = tags[i]
            if (tag.id == id){

                selectedTagsUpdate((selectedTags)=>{
                    return [...selectedTags,tag]
                })
                break
            }
        }

    }

    function confirmCallback(){
        const dateTime = document.getElementById("selectedDate").value
        const date = new Date(Number(dateTime))
        const dateStr = date.toISOString().slice(0, 10)
        console.log(dateStr)
        axios.post("/entries",{tags:selectedTags,date:dateStr}).then((resp)=>{
            console.log(resp)            
        })
        confirmCallbackParent()
        selectedTagsUpdate([])
    }

    return (<>
        <PopupMenu style={{...style,maxWidth:'50%'}}>
            <h5 className="text-center">Selected Tags</h5>
            <GridView>
                {selectedTags.map((tag)=>{return <TagItem key={tag.id} name={tag.name}></TagItem>})}
            </GridView>
            <h5 className="text-center">Select tags to add</h5>
            <GridView>
                {deSelectedTags.map((tag)=>{return <TagItem key={tag.id} id={tag.id} onClick={clickCallback} name={tag.name}/>})}
            </GridView>

            <button className="btn btn-primary" onClick={confirmCallback}>Confirm</button>
        </PopupMenu>
    </>)
}

export default SelectTags