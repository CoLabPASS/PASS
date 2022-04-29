import React, {useState, useRef} from 'react'
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import bcrypt from 'bcryptjs'
import { useNavigate } from "react-router-dom";




function SignIn({setAlert, handleClose}) {
  let navigate = useNavigate();

  const [userSignInInfo, setUserSignInInfo]=useState({
    signInEmail: '', signInpassword: ''
  })
  const signInEmailRef = useRef();
  const signInPasswordRef = useRef();

  const handleInput=(e)=>{
    const {id, value} =e.target
    setUserSignInInfo({...userSignInInfo, [id]: value})
  }
  const signUserIn =(e)=>{
    e.preventDefault()
    let good = false
    if(userSignInInfo.signInEmail === ""){
      signInEmailRef.current.focus();
      setAlert({show: true, message: 'please provide your email!'})
      return
    }
    if(userSignInInfo.signInpassword === ""){
      signInPasswordRef.current.focus();
      setAlert({show: true, message: 'please provide password!'})
      return
    }
    good = true
    // console.log(userSignInInfo)
    // check for user:
    if(good){
      const database = getDatabase(firebase)
      const dbRef = ref(database, '/users')
      onValue(dbRef, (res)=>{
        const data = res.val()
        const dataArray = []
        for (let key in data) {
            const newObje = {...data[key], firebaseId: key}
            dataArray.push(newObje)
        } 
        // console.log(dataArray)
        let userFound = false
        let foundUser
        dataArray.forEach(user=>{
          if(user.signInEmail === userSignInInfo.userEmail){
            console.log('user found')
            userFound = true
            foundUser = user;
          }
        })
        if (userFound){
          console.log(foundUser)
          const isPassWordCorrect =bcrypt.compareSync(userSignInInfo.signInpassword, foundUser.password)
            // if password is correct user can log in
            if(isPassWordCorrect){
              setAlert({show: true, message: 'success'})
              localStorage.setItem("userId", foundUser.userId);
              setTimeout(() => {
                handleClose()
                setAlert({show: false, message: ''})
                navigate(`/MyAccount`)
            }, 1000);
            }else {
              setAlert({show: true, message: 'Sorry Password is incorrect'})
            }
        }else {
          setAlert({show: true, message: 'sorry we could not find any account associated with this email address.'})
        }
      })

    }

  }
  
  return (
    <form onSubmit={signUserIn}>
      <label htmlFor="signInEmail">Email</label>
      <input type="email" id="signInEmail" ref={signInEmailRef} value={userSignInInfo.signInEmail} onChange={handleInput} />

      <label htmlFor="signInpassword">Password</label>
      <input type="password" id="signInpassword" value={userSignInInfo.signInpassword} ref={signInPasswordRef} onChange={handleInput}  />
      <button className="btn-gray">Sign In</button>
    </form>
  )
}

export default SignIn