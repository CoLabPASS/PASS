import React, {useState} from 'react'
import NavBar from './NavBar'
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';
import { useNavigate } from "react-router-dom";
import {Modal} from 'react-bootstrap'
import breatheEasy from '../Assets/breatheEasy.jpg'


function QuickJournal() {
    let navigate = useNavigate();

    const [showSaveBtn, setShowSaveBtn] = useState(false)
    const [alert, setAlert] = useState({ show: false, message:'' })
    const [show, setShow] = useState(false);


    const localUserId = localStorage.userId

    const [journalEntry, setJournalEntry]=useState({title: '', text: '', userId: localUserId})
    const [showFactsForm, setShowFactsForm]=useState(false)

    const handleInput =(e)=>{
        const {id, value}=e.target
        setJournalEntry({...journalEntry, [id]: value})
        if (id === 'text'){
            if(value.length>0){
                setShowSaveBtn(true)
            }else {
                setShowSaveBtn(false)
            }
        }
    }
    const submitEntry =(e)=>{
        e.preventDefault()
        if(journalEntry.text.length>0){
            
            const entryId = uuidv4();
            const postingTime = new Date()
            const dateTime ={ 
                date: postingTime.getDate(),
                month: postingTime.getMonth(),
                year: postingTime.getFullYear(),
                hours: postingTime.getHours(), 
                minutes: postingTime.getMinutes(),
                }
            const newEntry = {...journalEntry, dateTime, entryId}
            const database = getDatabase(firebase);
            const dbRef = ref(database, `/entries`);
            try {
                push(dbRef, newEntry);

                setAlert({show: true, message: 'journal added!'})
                setJournalEntry({title: '', text: '', userId: localUserId})
                setShow(true)
                setTimeout(() => {
                    setAlert({show: false, message: ''})
                    setShow(false)

                    navigate(`/MyAccount`)
                }, 3000);
                
            } catch (error) {
                setAlert({show: true, message: 'Something went wrong, try again please?'+ error})
            }
        }else {
            return 
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
            <p>This entry has been safely tucked away.<br/>Maybe take a break and do something that makes you smile?</p>

            <button onClick={moveToNext}>continue</button>
            </Modal.Body>
        </Modal>
        <section className='quickJournal'>
            <form onSubmit={(e)=>e.preventDefault()} className='wrapper'>
                <div className='titleDiv' >
                    <label htmlFor="title"> Title:</label>
                    <input type="text" id='title' name="title" placeholder='(try to make this an at-a-glance recap of the event)' value={journalEntry.title}onChange={handleInput}/>
                </div>
                <div className='bodyDiv' >
                    <label className='srOnly' hidden htmlFor="title">See what had happened was...</label>
                    <textarea name="text" id="text" cols="30" rows="15" placeholder='See, what had happened was...' value={journalEntry.text} onChange={handleInput}></textarea>

                </div>
                {/* {
                showFactsForm ? 
                    <div>
                        <Emotions/>
                    </div>
                    :null
                } */}
            {
                showSaveBtn ?
                <div>
                    <button onClick={submitEntry}>Save</button>
                    {/* {
                        showFactsForm ? null: 
                        <button onClick={()=>setShowFactsForm(true)}>Let's try diving deeper</button>
                    } */}
                    {/* {
                        showFactsForm ? <button >Oop, never mind!</button>
                        : 
                        null
                    } */}
                    
                </div>
                : null
            }

            </form>
            { alert.show ? <p>{alert.message}</p> : null }
        </section>

    </>
  )
}

export default QuickJournal