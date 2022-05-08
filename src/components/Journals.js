import React, {useEffect, useState} from 'react'
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import NavBar from './NavBar';
// import {Modal} from 'react-bootstrap'


function Journals() {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const localUserId = localStorage.userId
    // const [activeBtn, setActiveBtn]=useState({})
    const [selectedEntry, setSelectedEntry]=useState({})

    const [userEntries, setUserEntries]=useState([])
    const slectEntry =(entry)=>{
        setSelectedEntry(entry)
    }
    const sortBy=(category)=>{
        console.log(category)
        const copyEntries = [...userEntries]
        if(category ==='recent'){
            const sortingUserEntries = copyEntries.sort((a,b)=>{
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
            setUserEntries(sortingUserEntries)
        }else {
            const sortingUserEntries = copyEntries.sort((a,b)=>{
                let A = a.dateTime
                let B = b.dateTime
                if(A.year > B.year) return 1
                if(A.year < B.year) return -1
                if(A.month > B.month) return 1
                if(A.month < B.month) return -1
                if(A.date > B.date) return 1
                if(A.date < B.date) return -1
                if(A.hours > B.hours) return 1
                if(A.hours < B.hours) return -1
                if(A.minutes > B.minutes) return 1
                if(A.minutes < B.minutes) return -1
            })
            setUserEntries(sortingUserEntries)
        }
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
        console.log(usersEntryList)
        setUserEntries(usersEntryList)
    })
    }, [localUserId])
  return (
    <>
        <NavBar/>
        <div className='wrapper journals'>
            <div className='journalLists'>
                <div className="myRow justify-content-between">
                    <h2>Journals</h2>
                    <div className='sortBtn'>
                        <button className="dropDownBtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort <i className='fas fa-caret-down'></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#" onClick={()=>sortBy('recent')}>Sort by recent</a>
                            <a className="dropdown-item" href="#" onClick={()=>sortBy('oldest')}>Sort by oldest</a>
                        </div>
                    </div>
                </div>
                {userEntries.length>0 ?
                    <ul className="list-group">
                        {userEntries.map(entry=>
                        <li key={entry.entryId}>
                            <button className={selectedEntry.entryId === entry.entryId ?'active' : null} onClick={()=>slectEntry(entry)}>
                                <h6 className='entryDate'>{entry.dateTime.date}/{entry.dateTime.month}/{entry.dateTime.year} </h6>
                                <h5>{entry.title}</h5>
                            </button>
                            {/* <p>{entry.text}</p> */}
                        </li>
                            )}
                    </ul>
                        :
                    <p>no entries so far</p>
                }
            </div>
            {
                selectedEntry ?
                <div className="journalDetails">
                    <div>
                        {
                            selectedEntry.dateTime ?
                            <h6 className='entryDate'>{selectedEntry.dateTime.date} {month[selectedEntry.dateTime.month]} {selectedEntry.dateTime.year} at  { selectedEntry.dateTime.hours >= 12 ?  `${(selectedEntry.dateTime.hours - 12)}:${selectedEntry.dateTime.minutes} pm` :  `${selectedEntry.dateTime.hours}:${selectedEntry.dateTime.minutes} am`} </h6>
                            : null
                        }
                        <h2>{selectedEntry.title}</h2>
                        <p>{selectedEntry.text}</p>
                    </div>
                </div>
                : null    
            }
        </div>
    </>
  )
}

export default Journals