import React from 'react'

const Footer = () => {
  return (
    <>
      <footer  style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "gray",
        color: "white",
        fontWeight: "bold",
        fontSize : 15
        
      }}>
       
          <div className="row">
              <div className="col text-center py-3">Copyright 2019 &copy; Note Creator</div>
          </div>
        
        </footer>
   </>
  )
}

export default Footer