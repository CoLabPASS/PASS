import React,{useState} from 'react'
import Emotions from './Emotions'
import NavBar from './NavBar'
import PromptingEvent from './PromptingEvent'
import { v4 as uuidv4 } from 'uuid';

// import firebase from '../firebase';
// import { getDatabase, ref, onValue } from 'firebase/database';


function Facts() {
  const localUserId = localStorage.userId

  const [selectedEmos, setSelectedEmos]=useState([])
  const [selectedPromptEvent, setSelectedPromptEvent]=useState([])
  const [textInput, setTextInput]=useState({
    input1 :'', input2: ''
  })
  
  const saveEmotions =()=>{

    const entryId = uuidv4();
    const postingTime = new Date()
    const dateTime ={ 
        date: postingTime.getDate(),
        month: postingTime.getMonth(),
        year: postingTime.getFullYear(),
        hours: postingTime.getHours(), 
        minutes: postingTime.getMinutes(),
        }

    
    // console.log(selectedEmos)
    // console.log(selectedPromptEvent)
    // console.log(textInput)
    const journObj ={
      type:"factsJournal",
      emotions: selectedEmos,
      promptingEvents: selectedPromptEvent,
      entryId: entryId,
      dateTime: dateTime,
      text1: textInput.input1,
      text2: textInput.input1,
    }
    console.log(journObj)
  }
  const handleInput =(e)=>{
    const {id, value} =e.target
    setTextInput({...textInput, [id]: value})

  }
  return (
    <>
    <NavBar/>
      <section className='facts wrapper'>
        <h1>Check the Facts Journal Entry</h1>
        <hr />
        <Emotions selectedEmos={selectedEmos} setSelectedEmos={setSelectedEmos}/>
        <hr />
        <PromptingEvent selectedPromptEvent={selectedPromptEvent} setSelectedPromptEvent={setSelectedPromptEvent}/>

        <form >
          <h3>What are my interpretations, thoughts, and assumptions about the event?</h3>
          <textarea name="input1" id="input1" cols="30" rows="10" value={textInput.input1} onChange={handleInput}></textarea>
          <hr />
          <h3>Does my emotion and/or its intensity fit the actual facts? Explain</h3>
          <textarea name="input2" id="input2" cols="30" rows="10" value={textInput.input2} onChange={handleInput}></textarea>
        </form>
        <button className='generalBtn' onClick={saveEmotions}>save</button>
      </section>
    </>
  )
}

export default Facts