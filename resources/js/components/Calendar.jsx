import {useState, useEffect} from  'react'
import axios from "axios";

import ContextMenu from './ContextMenu'
function CalendarDateItem({date,active,clickCallback,fapped}){
    
    //convert string to bool
    active = active == 'true'
    let commonTextClass='fs-3 m-1 p-4'
    let inactiveTextClass = 'date-inactive text-muted'+' '+commonTextClass
    let activeTextClass = 'date-active text-dark'+' '+commonTextClass
    const fappedClass = ' bg-secondary'

    const className = "btn " + (active ? activeTextClass :inactiveTextClass) + (fapped? fappedClass : '')
    const style = {'minWidth':"80px"} 


    return (<>
        <div className={className} style={style} date={date.getTime()} onClick={clickCallback}>{date.getDate()}</div>
    </>)
}

function CalendarRow({dates,inActiveDates,clickCallback,fapDates}){
    
    //To make it comparable with another datetime object
    inActiveDates = inActiveDates.map((dateObj)=>dateObj.getTime())
    fapDates = fapDates.map((dateStr)=>{
        const splitted = dateStr.split("-")
        //To make month zero indexed
        splitted[1]=splitted[1]-1
        let dateObj = new Date(...splitted)
        return dateObj.getTime()
        
    })
    
    return (<>
        <div className="d-flex">
            {dates.map((date)=> <CalendarDateItem key={date} date={date} clickCallback={clickCallback} fapped={fapDates.includes(date.getTime())} active={inActiveDates.includes(date.getTime())? 'false' : 'true' }/>) }
        </div>
    </>)
}

function CalendarHeader({month,year,onDecrement,onIncrement}){
    return <>
        <div className="d-flex align-items-center justify-content-between position-relative w-100">
            <button className="btn fs-3 px-3 mx-4" onClick={onDecrement}><i className='fa-solid fa-caret-left'></i></button>
            <p className="monthName text-dark mb-0 fs-3">{ `${year ? year : 'Erroryear'} ${month ? month :'Errorober'}`}</p>
            <button className="btn fs-3 px-3 mx-4" onClick={ () =>onIncrement()}><i className='fa-solid fa-caret-right'></i></button>
        </div>
    </>
}

function Calendar(){
    let currentDate = new Date()
    const [currentMonth,setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(Number(currentDate.getFullYear()))
    let date = new Date(currentYear,currentMonth,1)
    const monthName = date.toLocaleString('en-us', {month:'long'})

    let initialDay = date.getDay() ==0 ? 7: date.getDay()
    date.setDate(date.getDate()-initialDay +1)
    let calendarRows=[]
    let count = 0
    let calendarRow = {dates:[], inactive:[]}

    function setNextMonth(){
        if(currentMonth<11){
            setCurrentMonth((month)=>month+1)
        }else{
            setCurrentMonth(0)
            setCurrentYear((year)=>year+1)
        }
    }

    function setPreviousMonth(){
        if(currentMonth>0){
            setCurrentMonth((month)=>month-1)
        }else{
            setCurrentMonth(11)
            setCurrentYear((year)=>year-1)
        } 
    }

    while(true){
        count++

        calendarRow.dates.push(new Date(date))

        //Find if it is a date from another month and append it to inActive
        const prevMonth = currentMonth == 0 ? 11 : currentMonth-1
        const nextMonth = currentMonth == 11 ? 0 : currentMonth+1
        if (date.getMonth() == prevMonth || date.getMonth() == nextMonth ){
            calendarRow.inactive.push(new Date(date))
        }
        date.setDate(date.getDate()+1)

        if(calendarRow.dates.length == 7){
            calendarRows.push(calendarRow)
            calendarRow = {dates:[],inactive:[]}
        }
        if (count>45){
            console.log("Error: broke out of loop because of overflow")
            console.log(calendarRows.length,calendarRow.dates.length)
            break
        }

        if(date.getMonth() == nextMonth && calendarRow.dates.filter(date=> date.getDate()>15).length == 0) {
            break;
        }
    }


    function clickCallback(e){
        const target = e.target
        const x = e.pageX
        const y = e.pageY
        const date = new Date(parseInt(target.getAttribute("date")))
        console.log(x,y,date)
        contextMenuXUpdate(x+20)
        contextMenuYUpdate(y+20)
        contextMenuDisplayUpdate('block')
        contextMenuDateUpdate(date)
        e.stopPropagation()
    }
    const [currentFaps, currentFapsUpdate] = useState([])
    useEffect(()=>{
        axios.get('/faps').then((response)=>{
            currentFapsUpdate(response.data);
            console.log(response.data)
        })
    },[])

    document.addEventListener('click',()=>{
        contextMenuDisplayUpdate('none')
    })

    const [contextMenuX,contextMenuXUpdate] = useState(1)
    const [contextMenuY,contextMenuYUpdate] = useState(1)
    const [contextMenuDate, contextMenuDateUpdate] = useState(new Date())
    const [contextMenuDisplay, contextMenuDisplayUpdate] = useState('none')
    console.log(contextMenuDisplay)

    return <>
        <div className="calendar d-flex flex-column align-items-center">
            <CalendarHeader month={monthName} year={currentYear} onIncrement={setNextMonth} onDecrement={setPreviousMonth}/>
            {calendarRows.map((row,index)=> <CalendarRow key={index} dates={row.dates} fapDates={currentFaps} clickCallback={clickCallback} inActiveDates={row.inactive}/>)}
        </div>
        <ContextMenu style={{display:contextMenuDisplay,top:contextMenuY+'px',left:contextMenuX+'px'}} date={contextMenuDate}/>
    </>
}

export default Calendar;