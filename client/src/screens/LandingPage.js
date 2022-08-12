import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'
const LandingPage = () => {
    const user = localStorage.getItem("userInfo");


  return (
      <div className='main'>
          <div className="container row">
              <div className="col-sm-8 offset-3 text-center">
                  <h1 className='text-center fw-bold text-dark head'>Welcome To Notes Creator</h1>
                  <h6 className='text-center'>Secure Your Notes Here with our Trust.</h6>
              </div>
              {
                  !user && <div className="col-sm-7 offset-3 lsb text-center">
                      <Link className='text-light' style={{ textDecoration: "none" }} to={`/login`}><button className='btn px-5 fw-bold btn-lg btn-primary'>Login</button></Link>
                      <Link className='text-light' style={{ textDecoration: "none" }} to={`/register`}><button className='btn px-5 btn-lg btn-primary fw-bold float-end'>Singup</button></Link>
                  </div>
              }
              
           
          </div>
    </div>
  )
}

export default LandingPage