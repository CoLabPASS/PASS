import React from 'react'
import {Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
        <ul>
            <li>
                <Link to="/" className='navItem'>Home</Link>
            </li>
            <li>
                <button>Sign In</button>
            </li>
            <li>
                <button>Sign Up</button>
            </li>
            <li>
                <Link to="/MyAccount" className='navItem'>My Account</Link>
            </li>
            <li>
                <button>Sign Out</button>
            </li>
        </ul>
    </nav>
  )
}

export default NavBar