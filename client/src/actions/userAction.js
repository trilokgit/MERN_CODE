import { USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_SUCCESS } from "../contants/userContants";
import axios from 'axios'
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST } from './../contants/userContants';
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            header: {
                'Contenet-Type': 'application/json'
            },
        };
        const { data } = await axios.post(
            '/api/user/login', { email, password },
            config
        );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {

        dispatch(({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message :
                    error.message,
        }))
        
    }
};




export const logout = () => async(dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
}



export const register = (name, email, password, picture) => async (dispatch) => {
    try {
        
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                'Contenet-Type': 'application/json',
            },


        };
        const { data } = await axios.post(
            "/api/user", { name, email, password, picture },
            config
        );
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        
    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
                error.response && error.response.data.message ? error.response.data.message :
                    error.message,
        })
        
     }
}


