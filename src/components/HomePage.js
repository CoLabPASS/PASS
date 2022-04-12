import React from 'react'
import NavBar from './NavBar'
import arrowImg from '../Assets/next.png'

function HomePage() {
  return (
    <>
        <NavBar/>
        <main>
          <header>
            <div className="wrapper">
              <div className="headerDiv">
                <h1>CTA Headline & <br/> Emotion Regulation</h1>
                <div>
                  <button>SignIn</button>
                  <button>SignUp</button>
                </div>
              </div>
            </div>
          </header> {/**** HEADER END ****/}

          <section className='appDescription'>

            <div className='appDescDiv wrapper'>
              <div className='appDescText'>
                <h2>Line One <br/> Line 2</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam hic in magnam explicabo architecto velit odio ratione consequuntur eum ullam.</p>
              </div>
              <div className='appDescImg'><img src="" alt="" /></div>
            </div>

            <div className='appDescDiv wrapper'>
              <div className='appDescImg'><img src="" alt="" /></div>
              <div className='appDescText'>
                <h2>Line One <br/> Line 2</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam hic in magnam explicabo architecto velit odio ratione consequuntur eum ullam.</p>
              </div>
            </div>

          </section> {/**** DESCRIPTION SECTION END ****/}
          
          <section className='callToAction'>

            <div className='ctaDiv wrapper'>
              <div className='ctaText'>
                <h2>CTA NOW</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque aperiam vitae sapiente, neque non ea pariatur minima corrupti perferendis exercitationem?</p>
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
              <div className='row arrowDiv'>
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