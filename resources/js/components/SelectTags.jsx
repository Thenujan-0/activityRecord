import PopupMenu from "./PopupMenu"
import GridView from "./GridView"
import TagItem from "./TagItem"
import { useEffect, useRef, useState } from "react"
import axios from "axios"


function SelectTags({style, tags, confirmCallbackParent}){


    const [selectedTags, selectedTagsUpdate] = useState([])
    const deSelectedTags = tags.filter((elem)=>!selectedTags.includes(elem))

    function removeFromSelectedTags(tag){
            selectedTagsUpdate((selectedTags)=>{
                return selectedTags.filter((elem)=>{
                    return elem != tag
                })
            })
    }

    function addToSelectedTags(tag){
        selectedTagsUpdate((selectedTags)=>{
            return [...selectedTags,tag]
        })
    }

    function clickCallback(e){
        let target = e.target
        if(target instanceof HTMLHeadingElement){
            target = e.target.parentElement
        }

        const id = target.getAttribute("id")
        
        e.stopPropagation()

        for(let i=0;i<tags.length;i++){
            const tag = tags[i]
            if (tag.id != id){
                continue
            }

            if (selectedTags.includes(tag)){
                removeFromSelectedTags(tag)
                break
            }

            addToSelectedTags(tag)
            break
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
    const selectTagElement = useRef(null)
    useEffect(()=>{
        document.addEventListener('click',(e)=>{
            if (selectTagElement.current.contains(e.target)){
                e.stopImmediatePropagation()
            }
        })
    },[])

    return (<>
        <PopupMenu style={{...style,maxWidth:'50%'}} ref={selectTagElement}>
            <div className="selected-tags bg-secondary rounded p-2 mb-4" >
                <h5 className="text-center text-white">Selected Tags</h5>
                <GridView style={{minHeight:"50px"}} >
                    {selectedTags.map((tag)=>{return <TagItem key={tag.id} id={tag.id} onClick={clickCallback} name={tag.name}></TagItem>})}
                </GridView>    
            </div>
            
            <div className="selectable-tags bg-secondary rounded p-2 mb-4">
                <h5 className="text-center text-white">Select tags to add</h5>
                <GridView style={{minHeight:"50px"}} >
                    {deSelectedTags.map((tag)=>{return <TagItem key={tag.id} id={tag.id} onClick={clickCallback} name={tag.name}/>})}
                </GridView>
            </div>


            <button className="btn btn-primary" onClick={confirmCallback}>Confirm</button>
        </PopupMenu>
    </>)
}

export default SelectTags