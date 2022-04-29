import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Navigate, Link } from 'react-router-dom';


function MyAccount() {
  const [user, setUser]=useState({})
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
    </div>
  )
}

export default MyAccount