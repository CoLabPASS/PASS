import React, { useState } from 'react';

import Calendar from 'react-calendar';
import RecentJournal from './RecentJournal';
function JournalCalendar({userJournals}) {
    const [value, onChange] = useState(new Date());
    const [entriesThisDate, setEntriesThisDate] = useState([])
    const clickingDay =(val, eve)=>{
        const selectedDate = `${val.getDate()}/${val.getMonth()}/${val.getUTCFullYear()}`
        console.log(selectedDate)
        const entriesThisDay = []
        userJournals.forEach(userJour=>{
            const userDate = `${userJour.dateTime.date}/${userJour.dateTime.month}/${userJour.dateTime.year}`
            if(userDate === selectedDate){
                entriesThisDay.push(userJour)
            }
        })
        setEntriesThisDate(entriesThisDay)
    }
    const renderingJournals =({ date, view })=>{

        let className = ''
        const d = new Date()
        const currentDate = `${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()}`
        const today = `${d.getDate()}/${d.getMonth()}/${d.getUTCFullYear()}`
        // console.log(today)
        // console.log(currentDate)
        if(currentDate === today){
            className = `todayDate`
            console.log('its today')
        }
        if(userJournals){
            if(userJournals.length>0){
                userJournals.forEach(userJour=>{
                    const userDate = `${userJour.dateTime.date}/${userJour.dateTime.month}/${userJour.dateTime.year}`
                    if(userDate === currentDate){
                        if(className === ""){
                            className=`existingEvent`
                        }else{
                            // console.log("className", className)
                            className=`${className} existingEvent`
                        }
                    }
                })
            }
        }
        return className

    }
    return (
        <div className='calendarJournal'>
            <Calendar onChange={onChange} value={value} onClickDay={clickingDay} tileClassName={renderingJournals}/>
            <div>
                {
                    entriesThisDate.length>0 ?
                    <RecentJournal userJournals={entriesThisDate} />
                    : 
                    <p>no entries available</p>
                }
            </div>
        </div>  )
}

export default JournalCalendar