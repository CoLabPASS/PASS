import React, {useEffect, useState} from 'react'
import firebase from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';


function Facts() {

  return (
    <>
      <section>
        <h1>Check the Facts Journal Entry</h1>
        <hr />
        <div className="feelingSect">
          <h3>What am I feeling?</h3>
          <ul>
            <li >
              <button>
                <img src="https://toppng.com/uploads/preview/facebook-angry-emoji-png-facebook-angry-emoji-11562897326xbugxlhbk8.png" alt="bb" />
              </button>
            </li>
          </ul>

        </div>
      </section>
    </>
  )
}

export default Facts