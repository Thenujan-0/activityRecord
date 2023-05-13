import PopupMenu from "./PopupMenu"
import GridView from "./GridView"
import TagItem from "./TagItem"
import { useEffect, useRef, useState } from "react"
import axios from "axios"

import dateToStr from "../includes/dateToStr"

function SelectTags({style, tags, confirmCallbackParent, date}){

    const [selectableTags, selectableTagsUpdate] = useState(tags)
    const [selectedTags, selectedTagsUpdate] = useState([])
    const deSelectedTags = selectableTags.filter((elem)=>!selectedTags.includes(elem))

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
        const date_ = new Date(Number(dateTime))
        const dateStr = dateToStr(date_)
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

    // update selectable tags
    useEffect(()=>{
        const dateTime = date.getTime()
        const dateElem = document.querySelector(`[date="${dateTime}"]`)
        let tagElems = dateElem?.children
        if (tagElems == null){
            return
        }
        tagElems = Array.from(tagElems)
        const dateTags = tagElems.map(element => {
            const tagName =  element.children[0].innerHTML
            let tagItem 
            tags.forEach(tagElem => {
                if (tagElem.name == tagName){
                    tagItem = tagElem
                }
            });
            return tagItem
        });

        selectableTagsUpdate(tags.filter((tag)=>{
            return !dateTags.includes(tag)
        }))

    },[date])
    const dateStr = `${date.getFullYear()}  ${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}`
    return (<>
        <PopupMenu style={{...style,maxWidth:'50%'}} ref={selectTagElement}>
            <h3 className="text-center">{dateStr}</h3>
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