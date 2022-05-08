import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';

import Calendar from 'react-calendar';
import RecentJournal from './RecentJournal';
import NavBar from './NavBar';

function JournalCalendar() {
    const localUserId = localStorage.userId;
    const [userJournals, setUserJournals]=useState([])

    const [value, onChange] = useState(new Date());
    const [entriesThisDate, setEntriesThisDate] = useState([])
    const clickingDay =(val)=>{
        const selectedDate = `${val.getDate()}/${val.getMonth()}/${val.getUTCFullYear()}`
        const entriesThisDay = []
        userJournals.forEach(userJour=>{
            const userDate = `${userJour.dateTime.date}/${userJour.dateTime.month}/${userJour.dateTime.year}`
            if(userDate === selectedDate){
                entriesThisDay.push(userJour)
            }
        })
        setEntriesThisDate(entriesThisDay)
    }
    const renderingJournals =({ date })=>{

        let className = ''
        const d = new Date()
        const currentDate = `${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()}`
        const today = `${d.getDate()}/${d.getMonth()}/${d.getUTCFullYear()}`
        if(currentDate === today){
            className = `todayDate`
        }
        if(userJournals){
            if(userJournals.length>0){
                userJournals.forEach(userJour=>{
                    const userDate = `${userJour.dateTime.date}/${userJour.dateTime.month}/${userJour.dateTime.year}`
                    if(userDate === currentDate){
                        if(className === ""){
                            className=`existingEvent`
                        }else{
                            className=`${className} existingEvent`
                        }
                    }
                })
            }
        }
        return className

    }
    useEffect(() => {
        // create a variable that holds our database details
        const database = getDatabase(firebase)
    
        // we then create a variable that makes reference to our database
        const dbRef = ref(database, '/entries')
        onValue(dbRef, (response) => {
          // here we use Firebase's .val() method to parse our database info the way we want it
            
            const data = response.val()
            const dataArray = []
            for (let key in data) {
                const newObje = {...data[key], firebaseId: key}
                dataArray.push(newObje)
            }
            let usersEntryList = []
            dataArray.forEach(entries=>{
                if(entries.userId === localUserId){
                    usersEntryList.push(entries)
                }
            })
            // sort it based on recent 
            const sortingUserEntries = usersEntryList.sort((a,b)=>{
                let A = a.dateTime
                let B = b.dateTime
                if(A.year > B.year) return -1
                if(A.year < B.year) return 1
                if(A.month > B.month) return -1
                if(A.month < B.month) return 1
                if(A.date > B.date) return -1
                if(A.date < B.date) return 1
                if(A.hours > B.hours) return -1
                if(A.hours < B.hours) return 1
                if(A.minutes > B.minutes) return -1
                if(A.minutes < B.minutes) return 1
            })
            setUserJournals(sortingUserEntries)
        })

    }, [localUserId])
    return (
        <>
            <NavBar/>
            <div className='calendarJournal wrapper myRow'>
                <Calendar onChange={onChange} value={value} onClickDay={clickingDay} tileClassName={renderingJournals}/>
                <div className='journalDetail'>
                    {
                        entriesThisDate.length>0 ?
                        <RecentJournal userJournals={entriesThisDate} />
                        : 
                        <p>no entries available</p>
                    }
                </div>
            </div>  

        </>
        )
}

export default JournalCalendar