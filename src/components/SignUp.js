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

        if(userInfo.userName ===''){

            userName.current.focus();
            setAlert({show: true, message: "Oops! Forgot your name!"})
            return
        }
    
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
        if( userInfo.userEmail ==='' ){
            userEmail.current.focus();
            setAlert({show: true, message: "Mmm that doesn't look like a valid email"})
            return
        }
        if( !emailRegex.test(userInfo.userEmail)){
            userEmail.current.focus();
            setAlert({show: true, message: "Mmm that doesn't look like a valid email"})
            return
        }
        if(userInfo.password === ""){
            password.current.focus();
            setAlert({show: true, message: "Don't forget your password!"})
            return
        }
        if(userInfo.confirmPassword !== userInfo.password){
            confirmPassword.current.focus();
            setAlert({show: true, message: "Gotta make sure the passwords match :)"})
            return
        }
        // first check if email exists 

        // ENCRYPT PASSWORD
        const saltRounds = 10;
        const hash = bcrypt.hashSync(userInfo.password, saltRounds);
        const userId = uuidv4();

        // CREATE SHALLOW COPY OF USER INFO
        const newUser ={...userInfo, password: hash, userId: userId}
        // removing confirmPassword property for the data base
        delete newUser.confirmPassword;

        // FETCH DATABASE
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
            // PUSH VALUE OF 'USERINPUT' STATE TO DATABASE
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
            <label htmlFor="userName">User Name</label>
            <input type="text" ref={userName} id="userName" onChange={handleInput} value={userInfo.userName}/>

            <label htmlFor="userEmail">Email</label>
            <input type="email" ref={userEmail} id="userEmail" onChange={handleInput} value={userInfo.userEmail} />

            <label htmlFor="password">password</label>
            <input type="password" ref={password} id="password" onChange={handleInput} value={userInfo.password}/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" ref={confirmPassword} id="confirmPassword" onChange={handleInput} value={userInfo.confirmPassword}/>
            <button onClick={handleSignUp}>Create Account</button>
        </form>
    )
}

export default SignUp