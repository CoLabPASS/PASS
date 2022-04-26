import React, {useState, useRef} from 'react'
import { Navigate} from 'react-router-dom';
import NavBar from './NavBar'
import arrowImg from '../Assets/next.png'
import {Modal} from 'react-bootstrap'
import SignUp from './SignUp';

import SignIn from './SignIn';

function HomePage() {
  const localUserId = localStorage.userId

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

  return (
    <>
    {localUserId? <Navigate to='/MyAccount' /> : null}
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
                        <SignUp userName={userName} handleInput={handleInput} userEmail={userEmail} password={password} confirmPassword={confirmPassword} userInfo={userInfo} setAlert={setAlert} handleClose={handleClose}/>
                        : null
                      }
                      {
                        signInForm ?
                        <SignIn setAlert={setAlert} handleClose={handleClose}/>
                        : null
                      }
                      {
                        alert.show ? <p>{alert.message}</p> : null
                      }
                    </Modal.Body>
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