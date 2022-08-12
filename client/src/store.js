import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';
import {
    noteCreateReducer,
    noteDeleteReducer,
    noteListReducer,
    noteUpdateReducer,
} from "./reducers/noteReducer"

const reducer = combineReducers({
    noteList: noteListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    noteCreate: noteCreateReducer,
    noteDelete: noteDeleteReducer,
    noteUpdate: noteUpdateReducer,
})

const userInofFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;


const initialState = {
    userLogin : {userInfo : userInofFromStorage},
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
   composeWithDevTools( applyMiddleware(...middleware))
);

export default store;