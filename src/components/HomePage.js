import React, {useState, useRef} from 'react'
import { Navigate} from 'react-router-dom';
import NavBar from './NavBar'
import {Modal} from 'react-bootstrap'
import SignUp from './SignUp';
import SignIn from './SignIn';
import graphicOne from '../Assets/graphicOne.jpg';
import graphicTwo from '../Assets/graphicTwo.jpg';
import mockup from '../Assets/mockup.png'

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
        <NavBar handleShow={handleShow}/>
        <main>
          <header>
            <div className="wrapper">
              <div className="headerDiv">
                <h1>Journal emotional experiences, <br/><span>Strengthen relationships!</span></h1>
                <div>
                  <button onClick={()=>handleShow('SignIn')}>Sign In</button>
                  <button onClick={()=>handleShow('signUp')}>Sign Up</button>
                  <Modal show={show} onHide={handleClose} animation={false} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
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
            <div className='appDescDiv descDivReverse wrapper'>
              <div className='appDescText'>
                <h2>Articulate Emotions,<br/> <span>improve relationships </span></h2>
                <p>Emotional regulation is hard. Especially in the midst of an emotionally charged interaction with a whole other human. <br/><br/> Journaling your experiences and using some of the cues we've provided can help.</p>
              </div>
              <div className='appDescImg'>
                <img src={graphicOne} alt="" />
              </div>
            </div>

            <div className='appDescDiv wrapper'>
              <div className='appDescImg'><img src={graphicTwo} alt="" /></div>
              <div className='appDescText'>
                <h2>Fast and memorable <br/> <span>during counseling sessions</span> </h2>
                <p>It can be tough to pinpoint and remember exactly how you felt during a past conflict. <br/><br/>Our Check The Facts journal feature can help you make the most of the time you have with your mental health care provider.</p>
              </div>
            </div>
          </section> {/**** DESCRIPTION SECTION END ****/}
          
          <section className='callToAction'>

            <div className='ctaDiv wrapper'>
              <div className='ctaText'>
                <h2>Build healthy, <br /><span>emotional bonds</span> </h2>
                <p>iJournal is fast and easy to use. Whether you want to make a quick journal entry or dive straight into a guided approach to try and map out the details of an important interaction, we can help.</p>
                <button>Get Started</button>
              </div>
              <div className='ctaImg'><img src={mockup}alt="" /></div>
            </div>

          </section> {/**** CALL TO ACTION SECTION END ****/}

          {/* <footer>
            <div className="wrapper">
            </div>
          </footer> */}
        </main>
    </>
  )
}

export default HomePage