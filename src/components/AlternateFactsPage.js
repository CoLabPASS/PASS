import React,{useState, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import Emotions from './Emotions'
import NavBar from './NavBar'
import PromptingEvent from './PromptingEvent'
import { v4 as uuidv4 } from 'uuid';
import {Modal} from 'react-bootstrap'
import { getDatabase, ref, push } from 'firebase/database';
import firebase from '../firebase';
function AlternateFactsPage() {
    let navigate = useNavigate();
    const journalTitle = useRef();
    const journalText1 = useRef();
    const journalText2 = useRef();

    const [emotions,setEmotions]=useState(
        [ 
            {
                id: 1,
                name: 'anger',
                emoji: '😡',
                emos: [
                    {id:1,name:'Anger', selectStat: false}, 
                    {id:2,name: 'Annoyance', selectStat: false}, 
                    {id:3,name:'Irritation', selectStat: false}, 
                    {id:4,name:'Frustration', selectStat: false},
                    {id:5,name:'Grumpy', selectStat: false}, 
                    {name:'Rage',selectStat: false},
                    {id:6,name:'Bitterness', selectStat: false},
                    {id:7,name:'Other', selectStat: false}
                ],
            },
            {
                id:2,
                name: 'disgust',
                emoji: '🤢',
                emos:[
                    {name:'Loathing', selectStat: false}, 
                    {name:'Resentment', selectStat: false}, 
                    {name: 'Disgust', selectStat: false}, 
                    {name:'Spite', selectStat: false}, 
                    {name:'Sickened', selectStat: false}, 
                    {name:'Contempt', selectStat: false}, 
                    {name:'Dislike', selectStat: false}, 
                    {name:'Other', selectStat: false}
                ]
            },
            {
                id:3,
                name: 'envy',
                emoji: '👽',
                emos: [
                    {name:'Envy', selectStat: false}, {name:'Craving', selectStat: false},{name:'Greed', selectStat: false}, {name:'Longing', selectStat: false}, {name:'Resentment', selectStat: false}, {name:'Wishful', selectStat: false}, {name:'Displeased', selectStat: false}, {name:'Downhearted', selectStat: false}
                ]
            },
            {
                id:4,
                name: 'fear',
                emoji: '😮',
                emos: [
                {name:'Fear', selectStat: false}, {name:'Anxiety', selectStat: false},{name:'Dread', selectStat: false}, {name:'Apprehension', selectStat: false}, {name:'Fright', selectStat: false}, {name:'Horror', selectStat: false}, {name:'Nervous', selectStat: false}, {name:'Overwhelmed', selectStat: false}, {name:'Panic', selectStat: false}, {name:'Worry', selectStat: false}, {name:'Tenseness', selectStat: false}, {name:'Other', selectStat: false}
                ]
            },
            { 
                id:5,
                name: 'guilt',
                emoji:'😥',
                emos: [
                {name:'Guilt', selectStat: false}, {name:'Culpability', selectStat: false},{name:'Remorse', selectStat: false}, {name:'Apologetic', selectStat: false}, {name:'Regret', selectStat: false}, {name:'Sorry', selectStat: false}
                ]
            },
            { 
                id:6,
                name: 'happy',
                emoji: '😄',
                emos: [
                    {name:'Happy', selectStat: false}, {name:'Enjoyment', selectStat: false},{name:'Relief', selectStat: false}, {name:'Amusement', selectStat: false}, {name:'Hope', selectStat: false}, {name:'Satisfied', selectStat: false}, {name:'Bliss', selectStat: false}, {name:'Enthusiasm', selectStat: false}, {name:'Content', selectStat: false}, {name:'Excitment', selectStat: false}, {name:'Ectasy', selectStat: false}, {name:'Other', selectStat: false}
                ]
            },
            {
                id:7,
                name: 'jealousy',
                emoji: '😔',
                emos: [
                {name:'Jealousy', selectStat: false}, {name:'Cautious', selectStat: false},{name:'Clingling', selectStat: false}, {name:'Defensive', selectStat: false}, {name:'Mistrustrful', selectStat: false}, {name:'Fear of Loss', selectStat: false}, {name:'Possessive', selectStat: false}, {name:'Suspicious', selectStat: false}, {name:'Self Protective', selectStat: false}, {name:'Wary', selectStat: false}, {name:'Watchful', selectStat: false}, {name:'Other', selectStat: false}
                ]
            },
            {
                id:8,
                name: 'love',
                emoji: '😍',
                emos: [
                {name:'Love', selectStat: false}, {name:'Adoration', selectStat: false},{name:'Affection', selectStat: false}, {name:'Attraction', selectStat: false}, {name:'Arousal', selectStat: false}, {name:'Caring', selectStat: false}, {name:'Charmed', selectStat: false}, {name:'Desire', selectStat: false}, {name:'Kindness', selectStat: false}, {name:'Sentimental', selectStat: false}, {name:'Infactuation', selectStat: false}, {name:'Other', selectStat: false}
                ]
            },
            {
                id:9,
                name: 'sadness',
                emoji: '😞',
                emos: [
                {name:'Sadness', selectStat: false}, {name:'Despair', selectStat: false},{name:'Grief', selectStat: false}, {name:'Agony', selectStat: false}, {name:'Disappointment'}, {name: 'Alienation', selectStat: false}, {name:'Neglected', selectStat: false}, {name:'Hurt', selectStat: false}, {name:'Rejection', selectStat: false}, {name:'Insecure', selectStat: false}, {name:'Defeat', selectStat: false}, {name:'Other', selectStat: false}
                ]
            }
        ]
        )

    const [showSaveBtn, setShowSaveBtn] = useState(false)

    const [textInput, setTextInput]=useState({
        input1 :'', input2: '', factsTitle: ''
    })
    const [cardSects, setCardSects]=useState({tittle: false, text1: false, text2: false, emotions: true, prompts: false})

    const handleInput =(e)=>{
        const {id, value} =e.target
        setTextInput({...textInput, [id]: value})
        if(textInput.input1 !== '' && textInput.input2 !== '' && textInput.factsTitle !== ''){
        setShowSaveBtn(true)
        }else {
            setShowSaveBtn(false)
        }
    }

    return (
        <div className='factsPromptCard'>
            <div className="promptCard">
                {
                    cardSects.tittle ?
                    <div className="cardSects">
                        <h2>Provide Tittle</h2>
                        <label className='srOnly' hidden htmlFor="factsTitle">See what had happened was...</label>
                        <input type="text" id='factsTitle' name="factsTitle" placeholder='See what had happened was...' ref={journalTitle} value={textInput.factsTitle} onChange={handleInput}/>
                    </div> :
                    null
                }
                {
                    cardSects.emotions ?
                    <div className="cardSects">
                        <ul>
                            {
                                emotions.map(emot=>
                                    <li className='emoCardBtn' key={emot.id}>
                                        <button>
                                            <span className='emo'>{emot.emoji}</span><span>{emot.name}</span>
                                        </button>

                                    </li>
                                    
                                    )
                            }
                        </ul>
                    </div> :
                    null
                }
            </div>
        </div>
    )
}

export default AlternateFactsPage