import React from 'react'
import {Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
        <div className="wrapper row">
            <h2>LOGO</h2>
            <ul>
                <li>
                    <Link to="/" className='navItem'>Home</Link>
                </li>
                <li>
                    <button className='navItem'> Sign In</button>
                </li>
                <li>
                    <button className='navItem'>Sign Up</button>
                </li>
                <li>
                    <Link to="/MyAccount" className='navItem'>My Account</Link>
                </li>
                <li>
                    <button className='navItem'>Sign Out</button>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar