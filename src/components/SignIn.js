import React, {useState} from 'react'

function SignIn() {
  const [userSignInInfo, setUserSignInInfo]=useState({
    userEmail: '', password: ''
  })
  const handleInput=(e)=>{
    const {id, value} =e.target
    setUserSignInInfo({...userSignInInfo, [id]: value})
  }
  return (
    <form>
      <label htmlFor="userEmail" className='sr-only'>Email</label>
      <input type="email" placeholder='Email' id="userEmail" value={userSignInInfo.userEmail} onChange={handleInput} />
      <label htmlFor="password" className='sr-only'>password</label>
      <input type="password" placeholder='Password' id="password" value={userSignInInfo.password} onChange={handleInput}  />
    </form>
  )
}

export default SignIn