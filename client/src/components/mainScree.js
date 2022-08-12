import React from 'react'
import './MainScreen.css'
const MainScree = ({title,children}) => {
  return (
    <div className='p-2  container mainback mt-4'>
          <div className="row form-control">
              <div className="page">
                  {
                      title && <>
                          <h1 className='heading fs-1 fw-bold'>{title}</h1>
                          <hr />
                      </>
                  }
                  {
                      children
                  }
              </div>
              
      </div>
    </div>
  )
}

export default MainScree
