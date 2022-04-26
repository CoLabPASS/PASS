import React from 'react'
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs'
import firebase from '../firebase';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';



function SignUp({userName, handleInput, userEmail, password, confirmPassword, userInfo, setAlert, handleClose }) {
    let navigate = useNavigate();

    const handleSignUp =(e)=>{
        e.preventDefault()
        // console.log(userInfo)
        if(userInfo.userName ===''){
            console.log('please enter name!')
            userName.current.focus();
            setAlert({show: true, message: 'please enter your name!'})
            return
        }
    
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
        if( userInfo.userEmail ==='' ){
            userEmail.current.focus();
            setAlert({show: true, message: 'please enter a valid email!'})
            return
        }
        if( !emailRegex.test(userInfo.userEmail)){
            userEmail.current.focus();
            setAlert({show: true, message: 'please enter a valid email!'})
            return
        }
        if(userInfo.password === ""){
            password.current.focus();
            setAlert({show: true, message: 'please enter your password!'})
            return
        }
        if(userInfo.confirmPassword !== userInfo.password){
            confirmPassword.current.focus();
            setAlert({show: true, message: 'password does not match'})
            return
        }
        // first check if email exist 

        // encrypting password
        const saltRounds = 10;
        const hash = bcrypt.hashSync(userInfo.password, saltRounds);
        const userId = uuidv4();

        // updating user Info by creating a shallow copy
        const newUser ={...userInfo, password: hash, userId: userId}
        // removing confirmPassword property for the data base
        delete newUser.confirmPassword;

        // fetiching database 
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/users`);
        // check if users email is already in the database
        let doesEmailExist = false

        onValue(dbRef, (response)=>{
            const data = response.val()
            const dataArray = []
            for (let key in data) {
                const newObje = {...data[key], firebaseId: key}
                dataArray.push(newObje)
            }
            dataArray.forEach(user=>{
                if(userInfo.userEmail === user.userEmail){
                // setUser(user)
                doesEmailExist=true
                }
            })
        })
        if(doesEmailExist){
            setAlert({show: true, message: 'There is already an email associated with this email.!!!'})
            return

        }else {
            // push the value of the `userInput` state to the database
            try {
                push(dbRef, newUser);
                
                setAlert({show: true, message: 'success!!!!'})
                localStorage.setItem("userId", userId);
                setTimeout(() => {
                    handleClose()
                    navigate(`/MyAccount`)
                }, 1000);
                
            } catch (error) {
                setAlert({show: true, message: 'there was an error, please try again'+ error})
            }
        }
    }
    return (
        <form>
            <label htmlFor="userName" className='sr-only'>User Name</label>
            <input type="text" ref={userName} placeholder='User Name' id="userName" onChange={handleInput} value={userInfo.userName}/>

            <label htmlFor="userEmail" className='sr-only'>Email</label>
            <input type="email" ref={userEmail} placeholder='Email' id="userEmail" onChange={handleInput} value={userInfo.userEmail} />

            <label htmlFor="password" className='sr-only' >password</label>
            <input type="password" ref={password} placeholder='Password' id="password" onChange={handleInput} value={userInfo.password}/>

            <label htmlFor="confirmPassword" className='sr-only'>Confirm Password</label>
            <input type="password" ref={confirmPassword}  placeholder='confirmPassword' id="confirmPassword" onChange={handleInput} value={userInfo.confirmPassword}/>
            <button onClick={handleSignUp}>Sign Up</button>
        </form>
    )
}

export default SignUp