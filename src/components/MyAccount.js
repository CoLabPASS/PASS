import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Navigate, Link } from 'react-router-dom';
import RecentJournal from "./RecentJournal";

function MyAccount() {
  const [user, setUser]=useState({})
  const [userJournals, setUserJournals]=useState([])
  const localUserId = localStorage.userId
  useEffect(() => {
        // create a variable that holds our database details
        const database = getDatabase(firebase)
    
        // we then create a variable that makes reference to our database
        const dbRef = ref(database, '/users')
        onValue(dbRef, (response) => {

        const data = response.val()
        const dataArray = []
        for (let key in data) {
            const newObje = {...data[key], firebaseId: key}
            dataArray.push(newObje)
        }
        dataArray.forEach(user=>{
          if(user.userId === localUserId){
            setUser(user)
          }
        })
      })
  }, [localUserId])
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
        console.log(sortingUserEntries)
          setUserJournals(sortingUserEntries)
      })

  }, [localUserId])
  return (
    <div className='myAccount'>
        {!localUserId? <Navigate to='/' /> : null}
        <NavBar/>
        <section className='wrapper accountGreeting'>
            <h3>Hello <span>{user.userName}</span>,</h3>
            <h1>Ready To Journal?</h1>
        </section>
        <section className='wrapper buttonContainer'>
          <div>
            <Link className="mainBtn" to="/QuickJournal">Quick  Journal</Link>
            <span> </span>
            {/* <button>Quick Journal</button> */}
            <Link className="mainBtn" to="/CheckTheFacts">Check  the  Facts</Link>
          </div>
        </section>
        <section className="myRow wrapper minHt">
          <div>
            <h3>My Recent Journals</h3>
            <RecentJournal userJournals={userJournals}/>

          </div>
          {/* <JournalCalendar userJournals={userJournals}/> */}
        </section>
    </div>
  )
}

export default MyAccount