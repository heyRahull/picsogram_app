import { Button } from '@material-ui/core';
import React from 'react';
import {auth} from '../firebase';

function Header({user, setOpen, setOpenSignIn, setOpenUpload}) {
    return (
            
      <div className="header">
          {/* header */}
      <img className="header__image" alt="abc" src="https://raw.githubusercontent.com/heyRahull/picsogram-image/main/logo3.png" />
     

      {user ? (
      <div>
          <Button variant="contained" onClick={() => setOpenUpload(true)}>Upload Image</Button>
        <Button variant="contained" onClick={() => auth.signOut()} className="app__logoutbtn">Log Out</Button>
        </div>
        
      ):(
        <div className="app__loginContainer">
        <Button variant="contained" onClick={() => setOpenSignIn(true)} className="app__loginbtn">Log In</Button>
        <Button variant="contained" onClick={() => setOpen(true)} className="app__loginbtn">Sign Up</Button>
        </div>
      )}
        </div>
      
    )
}

export default Header
