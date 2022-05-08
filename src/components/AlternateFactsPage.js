import React,{useState, useRef} from 'react'
import Emotions from './Emotions'
import NavBar from './NavBar'
import PromptingEvent from './PromptingEvent'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import {Modal} from 'react-bootstrap'
import { getDatabase, ref, push } from 'firebase/database';
import firebase from '../firebase';
function AlternateFactsPage() {
    let navigate = useNavigate();

    return (
        <div></div>
    )
}

export default AlternateFactsPage