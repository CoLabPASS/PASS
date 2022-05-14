import React, {useState} from 'react'

function JournalDetail({journalDetail}) {
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
    return (
        <div className='journalDetail'>
            <h3>{journalDetail.title}</h3>
            <p className='journalDate'>{journalDetail.dateTime.month+1}/{journalDetail.dateTime.date}/{journalDetail.dateTime.year}</p>
            <hr />
            {
                journalDetail.type ==="factsJournal" ?
                <>
                    {/* emotions */}
                        { journalDetail.emotions?
                        <div>
                            <h4>During this time I felt: </h4>

                            <div className='emotions'>
                                <ul className='myRow'>
                                    {
                                        journalDetail.emotions.map((emo, idx)=>
                                        <li key={`emo${idx}`}>{emotions[`${emo.cat}`] }
                                        </li>
                                        )
                                    }
                                </ul>
                                <h4>emotions</h4>
                            </div>
                            <hr />
                        </div>
                        : null }
                    {/* emotions */}

                    {/* prompts */}
                        { journalDetail.promptingEvents?
                        <div>
                            <div className='prompts'>
                                <ul className='myRow'>
                                    {
                                        journalDetail.promptingEvents.map((prompts, idx)=>
                                        <li key={`prompts${idx}`}>
                                            <i className={promptEvents[`${prompts}`]}></i>
                                        </li>
                                        )
                                    }
                                </ul>
                                    <h4>Prompts</h4>
                            </div>
                                <hr />
                        </div>
                        : null }
                    {/* prompts */}
                    <div className='myRow spaceBetween editPrnt'>
                        <h3>My interpretations, thoughts, and assumptions about the event</h3>
                        <button className='editBtn'>edit</button>
                    </div>
                    {/* text1 */}
                    
                        <p>{journalDetail.text1}</p>
                    {/* text1 */}
                    <hr />
                    <div className='myRow spaceBetween editPrnt'>
                        <h3>Did my emotion and/or its intensity fit the actual facts? Explain</h3>
                        <button className='editBtn'>edit</button>
                    </div>
                    {/* text2 */}
                        <p>{journalDetail.text2}</p>
                    {/* text2 */}
                </>
                
                : 
                <>
                    {/* text2 */}
                        <p>{journalDetail.text}</p>
                    {/* text2 */}
                </>
            }
        </div>
    )
}

export default JournalDetail