import React,{useState, useRef} from 'react'
import Emotions from './Emotions'
import NavBar from './NavBar'
import PromptingEvent from './PromptingEvent'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import {Modal} from 'react-bootstrap'
import { getDatabase, ref, push } from 'firebase/database';
import firebase from '../firebase';
import breatheEasy from '../Assets/breatheEasy.jpg'



function Facts() {
  let navigate = useNavigate();
  const journalTitle = useRef();
  const journalText1 = useRef();
  const journalText2 = useRef();
  const [show, setShow] = useState(true);


  const localUserId = localStorage.userId
  const [showTitleAlert, setShowTitleAlert]=useState(false)
  const [showText1Alert, setShowText1Alert]=useState(false)
  const [showText2Alert, setShowText2Alert]=useState(false)
  const [alert, setAlert] = useState({ show: false, message:'' })
  const [showSaveBtn, setShowSaveBtn] = useState(false)

  const [selectedEmos, setSelectedEmos]=useState([])
  const [selectedPromptEvent, setSelectedPromptEvent]=useState([])
  const [textInput, setTextInput]=useState({
    input1 :'', input2: '', factsTitle: ''
  })
  
  const saveEmotions =(e, type)=>{
    e.preventDefault()
    if(type==='completeForm'){
      if(textInput.factsTitle ===''){
        setShowTitleAlert(true)
        setShowText1Alert(false)
        setShowText2Alert(false)
        journalTitle.current.focus();
        return
      }
      if(textInput.input1 ===''){
        setShowTitleAlert(false)
        setShowText1Alert(true)
        setShowText2Alert(false)
        journalText1.current.focus();
        return
      }
      if(textInput.input2 ===''){
        setShowTitleAlert(false)
        setShowText1Alert(false)
        setShowText2Alert(true)
        journalText2.current.focus();
        return
      }
    }else {
      setShowTitleAlert(false)
      setShowText1Alert(false)
      setShowText2Alert(false)
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
            setShow(true)
            setTimeout(() => {
              // setAlert({show: false, message: ''})
              setShow(false)
              navigate(`/MyAccount`)
            }, 3000);
            
          } catch (error) {
              setAlert({show: true, message: 'Something went wrong, try again please?'+ error})
          }
    }


  }
  const handleInput =(e)=>{
    const {id, value} =e.target
    setTextInput({...textInput, [id]: value})
    if(textInput.input1 !== '' && textInput.input2 !== '' && textInput.factsTitle !== ''){
      setShowSaveBtn(true)
    }else {
      setShowSaveBtn(false)
    }

  }
  const handleClose = () => {
    setShow(false)
  };
  const moveToNext= ()=>{
    navigate(`/MyAccount`)
    setShow(false)
  }
  return (
    <>
      <NavBar/>
      <Modal className='modalComplete' show={show} onHide={handleClose} animation={false} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
        <div className="breatheImg">
                    <img src={breatheEasy} alt=""/>
                </div>
        </Modal.Header>
        <Modal.Body>
          <h3>Breathe Easy</h3>
          <p>Your journal is ready</p>
          <button onClick={moveToNext}>continue</button>
        </Modal.Body>
      </Modal>
      <section className='facts'>
        <div className="wrapper">
          <h1>Check the Facts</h1>
          <hr />
          <form >
            <div className='parentCntr'>
              <label className='srOnly' hidden htmlFor="factsTitle">Title</label>
              <input type="text" id='factsTitle' name="factsTitle" placeholder='Title hint: Try to come up with an at-a-glance recap of this event' ref={journalTitle} value={textInput.factsTitle} onChange={handleInput}/>
              {
                showTitleAlert ?
                <p>What do we want to call this journal entry?</p> : null
              }
            </div>
            
            <Emotions selectedEmos={selectedEmos} setSelectedEmos={setSelectedEmos}/>
            
            <PromptingEvent selectedPromptEvent={selectedPromptEvent} setSelectedPromptEvent={setSelectedPromptEvent}/>

            <h3>What are my interpretations, thoughts, and assumptions about the event?</h3>
            <div className='parentCntr journalTxtDiv'>
              <label className='srOnly' hidden htmlFor="input1">Type here</label>
              <textarea ref={journalText1} name="input1" id="input1" cols="30" rows="10" placeholder='Type here' value={textInput.input1} onChange={handleInput}></textarea>
                {
                  showText1Alert ?
                  <p>please fill up</p> : null
                }
            </div>

            <h3>Does my emotion and/or its intensity fit the actual facts? Explain</h3>
            <div className='parentCntr journalTxtDiv'>
              <label className='srOnly' hidden htmlFor="input2">Type here</label>
              <textarea ref={journalText2} name="input2" id="input2" cols="30" rows="10" placeholder='Type here' value={textInput.input2} onChange={handleInput}></textarea>
              {
                  showText2Alert ?
                  <p>please fill up</p> : null
                }
            </div>
            <hr />

            {
              showSaveBtn ? 
              <button className='saveBtn generalBtn active' onClick={(e)=>saveEmotions(e,'')}>save</button> : 
              <button className='generalBtn' onClick={(e)=>saveEmotions(e, 'completeForm')}>save</button> 
            }
          </form>
          { alert.show ? <p>{alert.message}</p> : null
              }
        </div>
      </section>
    </>
  )
}

export default Facts