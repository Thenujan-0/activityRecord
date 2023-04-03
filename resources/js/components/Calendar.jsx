import {useState} from  'react'
function CalendarDateItem({date,active}){
    
    //convert string to bool
    active = active == 'true'
    let commonTextClass='fs-3 m-0 p-4'
    let inactiveTextClass = 'date-inactive text-muted'+' '+commonTextClass
    let activeTextClass = 'date-active text-dark'+' '+commonTextClass
    return (<>
        <div className={"btn "+(active? activeTextClass :inactiveTextClass)} style={{'minWidth':"80px"}}>{date}</div>
    </>)
}

function CalendarRow({dates,inActiveDates}){
    return (<>
        <div className="d-flex">
            {dates.map((date)=> <CalendarDateItem key={date} date={date} active={inActiveDates.includes(date)? 'false' : 'true' }/>) }
        </div>
    </>)
}

function CalendarHeader({month,onDecrement,onIncrement}){
    return <>
        <div className="d-flex align-items-center justify-content-between position-relative w-100">
            <button className="btn fs-3 px-3 mx-4" onClick={onDecrement}><i className='fa-solid fa-caret-left'></i></button>
            <p className="monthName text-dark mb-0 fs-3">{month ? month :'Errorober'}</p>
            <button className="btn fs-3 px-3 mx-4" onClick={ () =>onIncrement()}><i className='fa-solid fa-caret-right'></i></button>
        </div>
    </>
}

function Calendar(){
    let currentDate = new Date()
    console.log(currentDate)
    const [currentMonth,setCurrentMonth] = useState(currentDate.getMonth())
    console.log(currentMonth)
    const [currentYear, setCurrentYear] = useState(Number(currentDate.getFullYear()))
    let date = new Date(currentYear,currentMonth,1)
    console.log(date)
    const monthName = date.toLocaleString('en-us', {month:'long'})

    let initialDay = date.getDay() ==0 ? 7: date.getDay()
    date.setDate(date.getDate()-initialDay +1)
    console.log(date,initialDay)
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

        calendarRow.dates.push(date.getDate())

        //Find if it is a date from another month and append it to inActive
        const prevMonth = currentMonth == 0 ? 11 : currentMonth-1
        const nextMonth = currentMonth == 11 ? 0 : currentMonth+1
        console.log(date.getMonth(),"month")
        if (date.getMonth() == prevMonth || date.getMonth() == nextMonth ){
            calendarRow.inactive.push(date.getDate())
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

        if(date.getMonth() == nextMonth && calendarRow.dates.filter(date=> date>15).length == 0) {
            break;
        }
    }
    console.log('re render')
    return <>
        <div className="calendar d-flex flex-column align-items-center">
            <CalendarHeader month={monthName} onIncrement={setNextMonth} onDecrement={setPreviousMonth}/>
            {calendarRows.map((row,index)=> <CalendarRow key={index} dates={row.dates} inActiveDates={row.inactive}/>)}
        </div>
    </>
}

export default Calendar;