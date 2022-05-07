import React, { useState } from 'react'

function PromptingEvent({selectedPromptEvent, setSelectedPromptEvent}) {
    const [promptEvents, setPromptEvents]=useState([
        {eventName: 'Work', logo:"fas fa-briefcase", status: false},
        {eventName: 'Romance', logo:'fas fa-kiss', status: false},
        {eventName: 'Friends', logo:'fas fa-users', status: false},
        {eventName: 'Family', logo:'fas fa-users', status: false},
        {eventName: 'Finance', logo:'fas fa-dollar-sign', status: false},
        {eventName: 'Other', logo:'fas fa-plus', status: false},
    ])
    const selectEvent=(e,event)=>{
        e.preventDefault()

        if(event==='Other'){
        }else {
            let copyEvents = []
            let doesEventExists = false
            let copyPromptEvents =[...promptEvents]
            copyPromptEvents.forEach(prompt=>{
                if(prompt.eventName===event){
                    prompt.status = !prompt.status
                }
            })
            setPromptEvents([...copyPromptEvents])
            selectedPromptEvent.forEach(eve=>{
                if(eve === event){
                    doesEventExists = true;
                }else {
                    copyEvents.push(eve)
                }
            })
            if(!doesEventExists){
                copyEvents.push(event)
            }
            setSelectedPromptEvent(copyEvents)
        }
    }
    return (
        <div className='prompts'>
            <h3>What is the event prompting my emotion?</h3>
            <ul >
                {
                    promptEvents.map((evtPrompt,idx)=>
                        <li key={`${evtPrompt.eventName}${idx}`}>
                            <button className='myRow' onClick={(e)=>selectEvent(e,evtPrompt.eventName)}>
                                <i className={evtPrompt.logo}></i>
                                <p className={evtPrompt.status ? 'active myRow': 'myRow'}>{evtPrompt.eventName}</p>
                            </button>
                        </li>
                        )
                }
            </ul>
        </div>
    )
    }

export default PromptingEvent