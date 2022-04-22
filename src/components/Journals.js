import React, {useEffect, useState} from 'react'
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Navbar } from 'react-bootstrap';

function Journals() {
    const localUserId = localStorage.userId

    const [userEntries, setUserEntries]=useState([])
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
        setUserEntries(usersEntryList)
    })
    }, [])
  return (

    <>
        <Navbar/>
        <div>
            {userEntries.length>0 ?
            <ul>
                {userEntries.map(entry=>
                <li key={entry.entryId}>
                    <h4>{entry.title}</h4>
                    <p>{entry.text}</p>
                </li>
                    )}
            </ul>
                :
            <p>no entries so far</p>
        }
        </div>
    </>
  )
}

export default Journals