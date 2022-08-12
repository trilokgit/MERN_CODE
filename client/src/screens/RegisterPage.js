import React,{useState,useEffect} from 'react'
import MainScree from '../components/mainScree'
import { Link,useNavigate } from 'react-router-dom'
import ErrorMessage from './../components/ErrorMessage';
import Loading from './../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './../actions/userAction';
const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState(
    "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-21.jpg"
  );
  const [message, setMessage] = useState(null);
  const [pictureMessage, setPictureMessage] = useState(null);
  
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    
    if (userInfo) {
      navigate("/mynotes");
    }

  },[navigate,userInfo])


  const submithandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(name,email,password,picture));
    }
    
  };

  const postDetails = (picture) => {
    if (picture === undefined) {
      return setPictureMessage("pleace select Image");
    }
    setPictureMessage(null);

    if (picture.type === 'image/jpeg' || picture.type === 'image/png' || picture.type === 'image/pdf') {
      const data = new FormData();
      data.append('file', picture);
      data.append('upload_preset','curdapi')
      data.append('cloud_name', 'dpblyzl1t')
      fetch("https://api.cloudinary.com/v1_1/dpblyzl1t/image/upload", {
        method: "POST",
        body: data,
        
      }).then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setPicture(data.url.toString());
        })
        .catch((err) => {
          return setPictureMessage("Please select  Image");
      })
    }
  }

  return (
    <MainScree title="Register YourSelf">
      {error && <ErrorMessage variant='danger'>{ error }</ErrorMessage>}
      {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
      {loading && <Loading/>}
      <form onSubmit={submithandler} className='fw-bold'>
        <div className="mb-3">
          <label className="form-label">Enter Full Name</label>
          <input  value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label  className="form-label">Email address</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control"  aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label  className="form-label">Password</label>
          <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
        </div>
        <div className="mb-3">
          <label  className="form-label">Confirm Password</label>
          <input  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control"  />
        </div>
        {
          pictureMessage && <ErrorMessage variant='danger'>{ pictureMessage }</ErrorMessage>
        }
        <div className="mb-3">
          <label  className="form-label">Upload Profile Image</label>
          <input
            onChange={(e) => postDetails(e.target.files[0])}
            id="custom-file"
            className="form-control form-control-sm" type="file" />
        </div>
        <button type="submit" className="btn btn-primary mt-3 fw-bold">Register</button>
        <h6 className='mt-3 fw-bold'>Have an Account ? <Link to={`/login`}>Login Here</Link></h6>
      </form>
      </MainScree>
  )
}

export default RegisterPage
