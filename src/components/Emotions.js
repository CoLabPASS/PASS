import React,{useState} from 'react'

function Emotions({selectedEmos,setSelectedEmos}) {
    const [showEmoForms, setShowEmoForms]=useState({
        anger: false, disgust: false, fear: false, guilt: false, happy: false, jealousy: false, love: false, sadness: false
    })
    
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
        }]
        )
    const showEmoOptions =(emotion)=>{
        console.log(emotion)
        if(emotion === 'anger'){
        if(showEmoForms.anger){
            setShowEmoForms({...showEmoForms, anger:false})
        }else{
            setShowEmoForms({...showEmoForms, anger:true})
        }
        }
        if(emotion === 'disgust'){
        if(showEmoForms.disgust){
            setShowEmoForms({...showEmoForms, disgust:false})
        }else{
            setShowEmoForms({...showEmoForms, disgust:true})
        }
        }
        if(emotion === 'envy'){
        if(showEmoForms.envy){
            setShowEmoForms({...showEmoForms, envy:false})
        }else{
            setShowEmoForms({...showEmoForms, envy:true})
        }
        }
        if(emotion === 'fear'){
        if(showEmoForms.fear){
            setShowEmoForms({...showEmoForms, fear:false})
        }else{
            setShowEmoForms({...showEmoForms, fear:true})
        }
        }
        if(emotion === 'guilt'){
        if(showEmoForms.guilt){
            setShowEmoForms({...showEmoForms, guilt:false})
        }else{
            setShowEmoForms({...showEmoForms, guilt:true})
        }
        }
        if(emotion === 'happy'){
        if(showEmoForms.happy){
            setShowEmoForms({...showEmoForms, happy:false})
        }else{
            setShowEmoForms({...showEmoForms, happy:true})
        }
        }
        if(emotion === 'jealousy'){
        if(showEmoForms.jealousy){
            setShowEmoForms({...showEmoForms, jealousy:false})
        }else{
            setShowEmoForms({...showEmoForms, jealousy:true})
        }
        }
        if(emotion === 'love'){
        if(showEmoForms.love){
            setShowEmoForms({...showEmoForms, love:false})
        }else{
            setShowEmoForms({...showEmoForms, love:true})
        }
        }
        if(emotion === 'sadness'){
        if(showEmoForms.sadness){
            setShowEmoForms({...showEmoForms, sadness:false})
        }else{
            setShowEmoForms({...showEmoForms, sadness:true})
        }
        }

    }
    const selectMood=(category, mood)=>{

        let copySelected = [...selectedEmos]
        let catExists = false;
        if(copySelected.length>0){
            copySelected.forEach(selected=>{
                if(selected.cat === category){
                    catExists=true
                    // console.log(copySelected)
                    let moodExist = false
                    let selectedMood
                    selected.mood.forEach(each=>{
                        if (each === mood){
                            moodExist = true
                            selectedMood = each
                        }
                    })
                    if(!moodExist){
                        selected.mood.push(mood)
                    }else{
                        // if exists remove from the selected 
                        let newArr=[]
                        selected.mood.forEach(each=>{
                            if(each=== selectedMood){
                                
                            }else{
                                newArr.push(each)
                            }
                        })
                        selected.mood = [...newArr]
                    }
                }else{
                }
            })
        }
        if(!catExists){
            copySelected =[...copySelected, {cat: category, mood: [mood]}]
        }
        setSelectedEmos([...copySelected])
        let copyEmotionAll = [...emotions]
        copyEmotionAll.forEach(emo=>{
            if(emo.name === category){
                emo.emos.forEach(emoEach=>{
                if(emoEach.name === mood){
                    emoEach.selectStat = !emoEach.selectStat
                }
                })
            }
        })
        setEmotions([...copyEmotionAll])
    }
    return (
        <div className="feelingSect">
            <h3>What am I feeling?</h3>
            <ul>
                {emotions.map((emot)=>
                <li className='emoCardBtn' key={emot.id}>
                    <button  onClick={()=>showEmoOptions(emot.name)}>
                    <span className='emo'>{emot.emoji}</span><span>{emot.name}</span><span>{
                    showEmoForms[`${emot.name}`] ? '▲': '▼'}</span>
                    </button>
                    {
                    showEmoForms[`${emot.name}`] ? 
                    <ul >
                        {emot.emos.map((emo, num)=>
                        <li key={num}><button className={emo.selectStat?'selected': null} onClick={()=>selectMood(emot.name, emo.name)}>{emo.name}</button></li>
                        )}
                    </ul>
                    :null
                }
                </li>
                )}
            </ul>
        </div>
    )
}

export default Emotions