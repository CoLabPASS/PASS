import React, {useState, useRef, useEffect} from 'react'
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import bcrypt from 'bcryptjs'
import { useNavigate } from "react-router-dom";


function SignIn({setAlert, handleClose}) {
  let navigate = useNavigate();
  const [users, setUsers]=useState([])
  const [userSignInInfo, setUserSignInInfo]=useState({
    signInEmail: '', signInpassword: ''
  })
  const signInEmailRef = useRef();
  const signInPasswordRef = useRef();

  const handleSignInInput=(e)=>{
    const {id, value} =e.target
    setUserSignInInfo({...userSignInInfo, [id]: value})
  }
  const signUserIn =(e)=>{
    e.preventDefault()
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
    // check for user:

      let userExist = false
      let foundUser
      users.forEach(user=>{
        if(user.userEmail === userSignInInfo.signInEmail){
          foundUser = user
          userExist = true
        }
      })
      if(userExist){
          const isPassWordCorrect =bcrypt.compareSync(userSignInInfo.signInpassword, foundUser.password)
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
      // if (userFound){
      //     // if password is correct user can log in

      // }else {
      //   setAlert({show: true, message: 'sorry we could not find any account associated with this email address.'})
      // }

  }
  useEffect(()=>{
    const dataArray = [];
    const database = getDatabase(firebase)
    const dbRef = ref(database, '/users')


    onValue(dbRef, (res)=>{
      const data = res.val()
      for (let key in data) {
          const newObje = {...data[key], firebaseId: key}
          dataArray.push(newObje)
      }
      
    })
    setUsers(dataArray)

  },[])
  
  return (
    <form onSubmit={signUserIn}>
      <label htmlFor="signInEmail">Email</label>
      <input type="email" id="signInEmail" ref={signInEmailRef} value={userSignInInfo.signInEmail} onChange={handleSignInInput} />

      <label htmlFor="signInpassword">Password</label>
      <input type="password" id="signInpassword" value={userSignInInfo.signInpassword} ref={signInPasswordRef} onChange={handleSignInInput}  />
      <button className="btn-gray">Sign In</button>
    </form>
  )
}

export default SignIn