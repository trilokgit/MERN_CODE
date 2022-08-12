import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userAction';
const Header = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    const user = localStorage.getItem(("userInfo"));
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    console.log(user);
    

    const logouthandler = async () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg shadow-lg bg-primary">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-light" to="/">Note Creator</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {
                                    userInfo && <li className="nav-item">
                                        <Link className="nav-link active text-light" aria-current="page" to="/mynotes">My Notes</Link>
                                    </li>
                               }
                               
                               
                            </ul>
                            <div>
                                {
                                    userInfo && 
                                    <ul style={{ listStyle: "none", marginRight: "200px" }}>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle text-white fw-bold" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {userInfo.name}
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li onClick={logouthandler}><a className="dropdown-item" href="/">Logout</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                               }
                            </div>
                           
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );

}

export default Header