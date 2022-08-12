import React from 'react'

const ErrorMessage = ({variant = "info",children}) => {
    return (
      <div className=''>
          <div className={`alert alert-${variant}`} role="alert">
              <strong>{ children }</strong>
          </div>
    </div>
  )
}

export default ErrorMessage