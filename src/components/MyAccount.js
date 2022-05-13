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
          setUserJournals(sortingUserEntries)
      })

  }, [localUserId])
  return (
    <div className='myAccount'>
        {!localUserId? <Navigate to='/' /> : null}
        <NavBar/>

        <section className='wrapper accountGreeting'>
            <h1> 
              <span>Hey</span> 
              <span className="greetingName">{user.userName}</span>
              <span>,</span>
            </h1>

            <h2> 
              <span>Which</span> 
              <span>journal</span>
              <span>are</span>
              <span>we</span>
              <span>feeling</span>
              <span>today?</span>
            </h2>
        </section>

        <section className='wrapper '>
          <div className='buttonContainer'>
            <Link className="mainBtn" to="/QuickJournal">Quick  Journal</Link>
            <Link className="mainBtn" to="/CheckTheFacts">Check  the  Facts</Link>
          </div>
        </section>

        <section className="myRow wrapper minHt">
          <div>
            <h2>My Recent Journals</h2>
            <RecentJournal userJournals={userJournals}/>
          </div>
        </section>

    </div>
  )
}

export default MyAccount