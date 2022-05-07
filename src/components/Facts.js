import React,{useState} from 'react'
import Emotions from './Emotions'
import NavBar from './NavBar'
import PromptingEvent from './PromptingEvent'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


import { getDatabase, ref, push } from 'firebase/database';
import firebase from '../firebase';



function Facts() {
  let navigate = useNavigate();

  const localUserId = localStorage.userId
  const [alert, setAlert] = useState({ show: false, message:'' })
  const [showSaveBtn, setShowSaveBtn] = useState(false)


  const [selectedEmos, setSelectedEmos]=useState([])
  const [selectedPromptEvent, setSelectedPromptEvent]=useState([])
  const [textInput, setTextInput]=useState({
    input1 :'', input2: '', factsTitle: ''
  })
  
  const saveEmotions =(e)=>{
    e.preventDefault()
    if(textInput.input1 ===''){
      return
    }else if (textInput.input2 ===''){
      return 
      
    }else if (textInput.factsTitle ===''){
      return 
    }else {
          const entryId = uuidv4();
          const postingTime = new Date()
          const dateTime ={ 
              date: postingTime.getDate(),
              month: postingTime.getMonth(),
              year: postingTime.getFullYear(),
              hours: postingTime.getHours(), 
              minutes: postingTime.getMinutes(),
              }
      
          const updateEmoArr =[]
          selectedEmos.forEach(emos=>{
            if(emos.mood.length!==0){
              updateEmoArr.push(emos)
            }
          })
      
      
          const journObj ={
            type:"factsJournal",
            emotions: updateEmoArr,
            promptingEvents: selectedPromptEvent,
            entryId: entryId,
            dateTime: dateTime,
            text1: textInput.input1,
            text2: textInput.input2,
            title: textInput.factsTitle,
            userId: localUserId
          }
          const database = getDatabase(firebase);
          const dbRef = ref(database, `/entries`);
          try {
            push(dbRef, journObj);
            setAlert({show: true, message: 'journal added!'})
            setTextInput({input1 :'', input2: '', factsTitle: ''})
            setTimeout(() => {
                setAlert({show: false, message: ''})
                navigate(`/MyAccount`)
            }, 500);
            
          } catch (error) {
              setAlert({show: true, message: 'Something went wrong, try again please?'+ error})
          }
    }


    // console.log(journObj)
  }
  const handleInput =(e)=>{
    const {id, value} =e.target
    setTextInput({...textInput, [id]: value})
    if(textInput.input1 !== '' && textInput.input2 !== '' && textInput.factsTitle !== ''){
      setShowSaveBtn(true)
    }

  }
  return (
    <>
      <NavBar/>
      <section className='facts wrapper'>
        <h1>Check the Facts Journal Entry</h1>
        <hr />
        <form >
            <span>Tittle</span>
            <label className='srOnly' hidden htmlFor="factsTitle">See what had happened was...</label>
            <input type="text" id='factsTitle' name="factsTitle" placeholder='See what had happened was...' value={textInput.factsTitle} onChange={handleInput}/>
            <hr />
        <Emotions selectedEmos={selectedEmos} setSelectedEmos={setSelectedEmos}/>
        <hr />
        <PromptingEvent selectedPromptEvent={selectedPromptEvent} setSelectedPromptEvent={setSelectedPromptEvent}/>

          <h3>What are my interpretations, thoughts, and assumptions about the event?</h3>
          <label className='srOnly' hidden htmlFor="title">See what had happened was...</label>
          <textarea name="input1" id="input1" cols="30" rows="10" value={textInput.input1} onChange={handleInput}></textarea>
          <hr />
          <h3>Does my emotion and/or its intensity fit the actual facts? Explain</h3>
          <textarea name="input2" id="input2" cols="30" rows="10" value={textInput.input2} onChange={handleInput}></textarea>
          <hr />
          {
            showSaveBtn ? 
            <button className='generalBtn' onClick={saveEmotions}>save</button>: null}
        </form>
        { alert.show ? <p>{alert.message}</p> : null
            }
      </section>
    </>
  )
}

export default Facts