import React from 'react'
import {Link, useLocation } from "react-router-dom";


function NavBar() {
    let location = useLocation();
    const localUserId = localStorage.userId
    return (
    <nav>
        <div className="wrapper">

            <h2>LOGO</h2>
            <ul>
                {localUserId ?
                    null : 
                    <li>
                        <Link to="/" className='navItem'>Home</Link>
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
                    null : 
                    <li>
                        <button className='navItem'> Sign In</button>
                    </li>
                }
                {
                    localUserId ?
                    null : 
                    <li>
                        <button className='navItem'>Sign Up</button>
                    </li>
                }
                {localUserId ?
                    <li>
                        <button className='navItem'>Sign Out</button>
                    </li> :
                    null
                }
            </ul>

        </div>
    </nav>
    )
}

export default NavBar