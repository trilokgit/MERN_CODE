import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import LandingPage from './screens/LandingPage'
import MyNotes from './screens/MyNotes/MyNotes'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import CreateNote from '../src/screens/MyNotes/CreateNote'
import EditPage from './screens/EditPage'
const App = () => {
  return (
      <BrowserRouter>
          <div>
              
              <Header />
              <main>
                  <Routes>
                      <Route exact path='/' element={<LandingPage />} />
                      <Route path='/login' element={<LoginPage />} />
                      <Route path='/register' element={<RegisterPage />} />
                      <Route path='/mynotes' element={<MyNotes />} />
                      <Route path='/createnote' element={<CreateNote />} />
                      <Route path='/edit/:id' element={<EditPage />} />
                  </Routes>
              </main>
              <Footer/>
          </div>
     </BrowserRouter>
  )
}

export default App