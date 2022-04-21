import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Navigate, useNavigate, Link } from 'react-router-dom';


function MyAccount() {
  const [user, setUser]=useState({})
  const localUserId = localStorage.userId
  useEffect(() => {
        // create a variable that holds our database details
        const database = getDatabase(firebase)
    
        // we then create a variable that makes reference to our database
        const dbRef = ref(database, '/users')

        onValue(dbRef, (response) => {
          // here we use Firebase's .val() method to parse our database info the way we want it

        const data = response.val()
        const dataArray = []
        for (let key in data) {
            const newObje = {...data[key], firebaseId: key}
            dataArray.push(newObje)
        }
        console.log(dataArray)
        dataArray.forEach(user=>{
          if(user.userId === localUserId){
            setUser(user)
          }
        })
      })
  }, [])
  return (
    <>
        {!localUserId? <Navigate to='/' /> : null}
        <NavBar/>
        <section>
            <h2>My Account</h2>
            <h3>Welcome {user.userName} !!</h3>
        </section>
        <section>
          <button>Check the Fact</button>
          <span> or </span>
          {/* <button>Quick Journal</button> */}
          <Link to="/QuickJournal" >Quick Journal</Link>
        </section>
    </>
  )
}

export default MyAccount