import React from 'react'

function PromptingEvent({selectedPromptEvent, setSelectedPromptEvent}) {
    const selectEvent=(event)=>{
        let copyEvents = []
        let doesEventExists = false
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
    return (
        <div className='prompts'>
            <h3>What is the event prompting my emotion?</h3>
            <ul >
                <li >
                    <button className='myRow' onClick={()=>selectEvent('Work')}>
                        <i className="fas fa-briefcase"></i>
                        <p>Work</p>
                    </button>
                </li>
                <li >
                    <button className='myRow' onClick={()=>selectEvent('Romance')}>
                        <i className="fas fa-kiss"></i>
                        <p>Romance</p>
                    </button>
                </li>
                <li >
                    <button className='myRow'  onClick={()=>selectEvent('Friends')}>
                        <i className="fas fa-users"></i>                        
                        <p>Friends</p>
                    </button>
                </li>
                <li >
                    <button className='myRow'  onClick={()=>selectEvent('Family')}>
                        <i className="fas fa-users"></i>                        
                        <p>Family</p>
                    </button>
                </li>
                <li >
                    <button className='myRow'  onClick={()=>selectEvent('Finance')}>
                        <i className="fas fa-dollar-sign"></i>                        
                        <p>Finance</p>
                    </button>
                </li>
                <li >
                    <button className='myRow'  onClick={()=>selectEvent('Other')}>
                        <i className="fas fa-plus"></i>                        
                        <p>Other</p>
                    </button>
                </li>
            </ul>
        </div>
    )
    }

export default PromptingEvent