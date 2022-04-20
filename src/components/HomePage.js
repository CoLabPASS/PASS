import React, {useState, useRef} from 'react'
import NavBar from './NavBar'
import arrowImg from '../Assets/next.png'
import {Modal, Button} from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";

function HomePage() {
  
  let navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [signInForm, setSignInForm] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)

  const [alert, setAlert] = useState({ show: false, message:'' })
  const [userInfo, setUserInfo]=useState({
    userName: '', userEmail: '', password: '', confirmPassword:''
  })
  
  const userName = useRef();
  const userEmail = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleClose = () => {
    setSignUpForm(false)
    setSignInForm(false)
    setShow(false)
  };

  const handleShow = (type) => {
    if(type==="signUp"){
      setSignUpForm(true)
    }
    if(type==="SignIn") {
      setSignInForm(true)
    }
    setShow(true)
  };

  const handleInput=(e)=>{
    const {id, value} =e.target
    setUserInfo({...userInfo, [id]: value})
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    // console.log(userInfo)
    if(userInfo.userName ===''){
      console.log('please enter name!')
      userName.current.focus();
      setAlert({show: true, message: 'please enter your name!'})
      return
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if( userInfo.userEmail ==='' ){
      userEmail.current.focus();
      setAlert({show: true, message: 'please enter a valid email!'})
      return
    }
    if( !emailRegex.test(userInfo.userEmail)){
      userEmail.current.focus();
      setAlert({show: true, message: 'please enter a valid email!'})
      return
    }
    if(userInfo.password === ""){
      password.current.focus();
      setAlert({show: true, message: 'please enter your password!'})
      return
    }
    if(userInfo.confirmPassword !== userInfo.password){
      confirmPassword.current.focus();
      setAlert({show: true, message: 'password does not match'})
      return
    }

    setAlert({show: true, message: 'success!!!!'})
    setTimeout(() => {
      handleClose()
      navigate(`/MyAccount`)
    }, 1000);

  }
  return (
    <>
        <NavBar/>
        <main>
          <header>
            <div className="wrapper">
              <div className="headerDiv">
                <h1>Journal emotional experiences, <br/> <span>Strengthen relationships!</span></h1>
                <div>
                  <button onClick={()=>handleShow('SignIn')}>SignIn</button>
                  <button onClick={()=>handleShow('signUp')}>SignUp</button>
                  <Modal show={show} onHide={handleClose} animation={false} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
>
                    <Modal.Header closeButton>
                      <Modal.Title>{signUpForm ? 'Sign Up' : 'Sign In'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {
                        signUpForm ?
                        <form>
                          <label htmlFor="userName" className='sr-only'>User Name</label>
                          <input type="text" ref={userName} placeholder='User Name' id="userName" onChange={handleInput}/>

                          <label htmlFor="userEmail" className='sr-only'>Email</label>
                          <input type="email" ref={userEmail} placeholder='Email' id="userEmail" onChange={handleInput} />

                          <label htmlFor="password" className='sr-only' >password</label>
                          <input type="password" ref={password} placeholder='Password' id="password" onChange={handleInput}/>

                          <label htmlFor="confirmPassword" className='sr-only'>Confirm Password</label>
                          <input type="password" ref={confirmPassword}  placeholder='confirmPassword' id="confirmPassword" onChange={handleInput}/>
                        </form>
                        : null
                      }
                      {
                        signInForm ?
                        <form>
                          <label htmlFor="userEmail" className='sr-only'>Email</label>
                          <input type="email" placeholder='Email' id="userEmail" />
                          <label htmlFor="password" className='sr-only'>password</label>
                          <input type="password" placeholder='Password' id="password" />
                        </form>
                        : null
                      }
                      {
                        alert.show ? <p>{alert.message}</p> : null
                      }
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>

                      <Button variant="primary" onClick={handleSubmit}>
                        submit
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </header> {/**** HEADER END ****/}
          <section className='appDescription'>
            <div className='appDescDiv wrapper'>
              <div className='appDescText'>
                <h2>Articulate Emotions,<br/> <span>improve relationships!!!</span></h2>
                <p>Emotional regulation is hard and can impact your relationships. Having conflicts with loved ones is a normal part of life. <br /> By journaling your emotional experiences of a coflict you utilize this tool to come to a solution. </p>
              </div>
              <div className='appDescImg'><img src="" alt="" /></div>
            </div>
            <div className='appDescDiv wrapper'>
              <div className='appDescImg'><img src="" alt="" /></div>
              <div className='appDescText'>
                <h2>Fast and memorable <br/> <span>during counseling sessions</span> </h2>
                <p>If you struggle with exactly how you felt during an experience of conflict, journaling your emotional experience could be vital to finding solutions with your mental health care provider.</p>
              </div>
            </div>

          </section> {/**** DESCRIPTION SECTION END ****/}
          
          <section className='callToAction'>

            <div className='ctaDiv wrapper'>
              <div className='ctaText'>
                <h2>Build healthy, <br /><span>emotional bonds</span> </h2>
                <p>Our journal is fast and easy to use. It allows you to quickly add your emotional state and details about your experiences with a device that is already in your pocket.</p>
                <button>Get Started</button>
              </div>
              <div className='ctaImg'><img src="" alt="" /></div>
            </div>

            <h2>User Testimonials</h2>
            <div className='testimonialsModal wrapper'>
              <div className='testimonialText'>
                <h3>"Quote about Product second line example"</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque aperiam vitae sapiente, neque non ea pariatur minima corrupti perferendis exercitationem?</p>
                <h3>Name <br/> <span>city,State</span></h3>
              </div>
              <div className='testimonialImg'><img src="" alt="" /></div>
              <div className='arrowDiv'>
                <button>
                  <img src={arrowImg} alt="" />
                </button>
                <button>
                  <img src={arrowImg} alt="" />

                </button>
              </div>
            </div>

          </section> {/**** CALL TO ACTION SECTION END ****/}

          <footer>
            <div className="wrapper">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repudiandae, iure voluptates quis, ipsam necessitatibus dolorem sequi corrupti architecto, cum inventore aperiam distinctio omnis unde non temporibus nisi dolores fuga?</p>
            </div>
          </footer>
        </main>
    </>
  )
}

export default HomePage