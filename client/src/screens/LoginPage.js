import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainScree from '../components/mainScree'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import {useDispatch, useSelector} from 'react-redux'
import { login } from './../actions/userAction';
const LoginPage = () => {
  let navigate = useNavigate();
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
 
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin; 

  useEffect(() => {
    // const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes")
    }
  }, [navigate,userInfo]);

  const submithandler = async (e) => {
    e.preventDefault();
    dispatch(login(email,password));

  
  }
  
  

  return (
    <MainScree title="Login YourSelf">
      {error && <ErrorMessage variant='danger'>{ error }</ErrorMessage>}
      { loading && <Loading/> }
      <form onSubmit={submithandler} className='fw-bold'>
        <div className="mb-3 fw-bold">
          <label  className="form-label">Email address</label>
          <input name='email' value={email}  onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input name="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary fw-bold">Submit</button>
        <h6 className='mt-3 fw-bold'>New Customer ? <Link to={`/register`}>Signup Here</Link> </h6>
      </form>
    </MainScree>
  )
}

export default LoginPage
