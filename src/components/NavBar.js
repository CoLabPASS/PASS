import React, {useState} from 'react'
import {Link, useLocation, useNavigate } from "react-router-dom";
import logoSolo from '../Assets/logoSolo.png'


function NavBar({handleShow}) {
    let navigate = useNavigate();
    let location = useLocation();
    const [showOtherMenu, setShowOtherMenu]=useState(false)
    const [showMainMenu, setShowMainMenu]=useState(false)
    const localUserId = localStorage.userId;
    const signOut=()=>{
        localStorage.removeItem("userId");
        setTimeout(() => {
            navigate(`/`)
        }, 1000);
    }
    return (
    <nav>
        <div className="wrapper">
            <h2><img className="logoSolo" src={logoSolo} alt="logo"/> iJournal</h2>
            <button className='navItem hamburger' onClick={()=>setShowMainMenu(!showMainMenu)}><i class="fas fa-bars"></i></button>
            <ul className={showMainMenu ? 'mainMenu' : 'mainMenu hide'}>
                {
                    showMainMenu ? 
                    <li>
                        <button className='navItem closeMenuBtn' onClick={()=>setShowMainMenu(!showMainMenu)}><i class="fas fa-times"></i></button>
                    </li>
                    : null
                }
                {localUserId ?
                    null : 
                    <li>
                        <Link to="/" className='navItem'>Home</Link>
                    </li>
                }
                {
                    localUserId ?
                    null : 
                    <li>
                        <button className='navItem' onClick={()=>handleShow('SignIn')}> Sign In</button>
                    </li>
                }
                {
                    localUserId ?
                    null : 
                    <li>
                        <button className='navItem' onClick={()=>handleShow('signUp')}>Sign Up</button>
                    </li>
                }
                {localUserId ?
                    location.pathname === "/MyAccount" ?null :
                    <li>
                        <Link to="/MyAccount" className='navItem'>My Account</Link>
                    </li> 
                    
                    :
                    null
                }
                {
                    localUserId ? 
                    <li >
                        <button className='navItem otherBtn' onClick={()=>setShowOtherMenu(!showOtherMenu)}> 
                            Other &nbsp; &nbsp; {showOtherMenu ? <i class="fas fa-angle-up"></i> : <i class="fas fa-angle-down"></i>} 
                        </button>
                        {showOtherMenu ?
                            <ul className={showMainMenu ? 'otherMenu' : 'otherMenu mxHght'}>
                                
                                {localUserId ?
                                    location.pathname === "/journals" ?null :

                                    <li>
                                        <Link to="/journals" className='navItem'><i class="fas fa-book"></i> &nbsp; Journals</Link>
                                    </li> 
                                    :
                                    null
                                }
                                
                                {
                                localUserId ?
                                    location.pathname === "/Calendar" ?null :

                                    <li>
                                        <Link to="/Calendar" className='navItem'><i class="fas fa-calendar-alt"></i> &nbsp; Calendar</Link>
                                    </li> 
                                    :
                                    null
                                }
                                {
                                    localUserId ?

                                    <li><button className='navItem' onClick={signOut}><i class="fas fa-sign-in-alt"></i> &nbsp;Sign Out</button></li>
                                    :null
                                }
                            </ul>
                        :
                        null
                        
                        }

                    </li> 
                    : null
                }
            </ul>
        </div>
    </nav>
    )
}

export default NavBar