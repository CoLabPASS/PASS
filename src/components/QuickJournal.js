import React, {useState} from 'react'
import NavBar from './NavBar'
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';
import Facts from './Facts';
import { useNavigate } from "react-router-dom";





function QuickJournal() {
    let navigate = useNavigate();

    const [showSaveBtn, setShowSaveBtn] = useState(false)

    const [alert, setAlert] = useState({ show: false, message:'' })

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
            // console.log(newEntry)
            // fetiching database 
            const database = getDatabase(firebase);
            const dbRef = ref(database, `/entries`);
            try {
                push(dbRef, newEntry);

                setAlert({show: true, message: 'journal added!'})
                setJournalEntry({title: '', text: '', userId: localUserId})
                setTimeout(() => {
                    setAlert({show: false, message: ''})
                    navigate(`/MyAccount`)
                }, 500);
                
            } catch (error) {
                setAlert({show: true, message: 'Something went wrong, try again please?'+ error})
            }

        }else {
            return 
        }
    }
return (
    <>
        <NavBar/>
        <section className='quickJournal'>
            <form onSubmit={(e)=>e.preventDefault()} className='wrapper'>
                <div>
                    <label className='srOnly' hidden htmlFor="title">See what had happened was...</label>
                    <input type="text" id='title' name="title" placeholder='See what had happened was...' value={journalEntry.title}onChange={handleInput}/>
                </div>
                <div>
                    <label className='srOnly' hidden htmlFor="title">See what had happened was...</label>
                    <textarea name="text" id="text" cols="30" rows="10" value={journalEntry.text} onChange={handleInput}></textarea>

                </div>
                {
                showFactsForm ? 
                    <div>
                        <Facts/>
                    </div>
                    :null
                }
            {
                showSaveBtn ?
                <div>
                    <button onClick={submitEntry}>Save</button>
                    {
                        showFactsForm ? null: 
                        <button onClick={()=>setShowFactsForm(true)}>Let's try diving deeper</button>
                    }
                    {
                        showFactsForm ? <button >Oop, never mind!</button>
                        : 
                        null
                    }
                    
                </div>
                : null
                }
            </form>
            {
                alert.show ? <p>{alert.message}</p> : null
            }
        </section>

    </>
  )
}

export default QuickJournal