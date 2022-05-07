import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import JournalDetail from './JournalDetail';




function RecentJournal({userJournals}) {
    const [promptEvents, setPromptEvents]=useState(
        {
            Work: "fas fa-briefcase",
            Romance: "fas fa-kiss",
            Friends: 'fas fa-users',
            Family: 'fas fa-users',
            Finance: 'fas fa-dollar-sign'
        }
    )
    const [emotions, setEmotions]=useState(
        {
            anger: '😡',
            disgust: "🤢",
            envy: '👽',
            fear: '😮',
            guilt: '😥',
            happy: '😄',
            jealousy: '😔',
            love: '😍',
            sadness: '😞',
        }
    )
    const [show, setShow] = useState(false);
    const [journalDetail, setJournalDetail] = useState({});

    const [alert, setAlert] = useState({ show: false, message:'' })
    const handleClose = () => {
        // setSignUpForm(false)
        // setSignInForm(false)
        setShow(false)
        
    };
    const handleShow = (entryId, fireId) => {
        setShow(true)
        console.log(fireId)
              // create a variable that holds our database details
            const database = getDatabase(firebase)
    
            // we then create a variable that makes reference to our database
            const dbRef = ref(database, `/entries/${fireId}`)
            onValue(dbRef, (res)=>{
                const data = res.val()
                console.log(data)
                setJournalDetail(data)
            })
    };
    return (
        <div className='recentJournal'>
            <Modal show={show} onHide={handleClose} animation={false} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <JournalDetail journalDetail={journalDetail}/>
                </Modal.Body>
            </Modal>
            <ul>
                {userJournals.slice(0,6).map(journal=>
                    <li  key={journal.entryId}>
                        <button className='journalCards' onClick={()=>handleShow(journal.entryId, journal.firebaseId)}>
                            <p className='journalDate'>{journal.dateTime.month+1}/{journal.dateTime.date}/{journal.dateTime.year}</p>
                            <h4 className='journalTittle'>{journal.title}</h4>
                            {
                                journal.type==='factsJournal' ?
                                <div className='myRow'>
                                    {journal.promptingEvents ? 
                                    <div>
                                        <i className={promptEvents[`${journal.promptingEvents[0]}`]}></i>
                                        {journal.promptingEvents[0]}
                                    </div>
                                    :null}
                                    {journal.emotions ? 
                                    <div>
                                        {emotions[`${journal.emotions[0].cat}`]}
                                        {journal.emotions[0].cat}
                                    </div>
                                    :null}
                                    
                                </div>
                                :null
                            }
                        </button>
                    </li>
                    )}
            </ul>
        </div>
    )
}

export default RecentJournal