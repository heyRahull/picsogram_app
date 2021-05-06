import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import { auth } from '../firebase';
import ImageUpload from './ImageUpload'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ModalComp({ open, setOpen, user, setUser, openSignIn,setOpenSignIn,openUpload,setOpenUpload}) {
    const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //User has logged in
        // console.log(authUser);
        setUser(authUser);
      }else{
        //user has logged out
        setUser(null);
      }
    })
    return () =>{
      //perform some cleanup action
      unsubscribe();
    }
  },[user,setUser])

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName : username
      })
      
    })
    .catch((error)=>alert(error.message))

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div>
      {/* modal for sign up */}
      <Modal open={open} onClose={() => setOpen(false)} >
        <div style={modalStyle} className={classes.paper}>
          {/* Insta Logo */}
          <center>
          <img className="ModalComp__image" alt="insta-logo" src="https://raw.githubusercontent.com/heyRahull/picsogram-image/main/logo3.png"></img>
          </center>
          {/* <h2>Sign Up</h2> */}
          <form action="" className="ModalComp__signup">

          <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" onClick={signUp} >SignUp</Button>
          
          </form>
        </div>
      </Modal>

    {/* Modal for Log In */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          {/* Insta Logo */}
          <center>
          <img className="ModalComp__image" alt="insta-logo" src="https://raw.githubusercontent.com/heyRahull/picsogram-image/main/logo3.png"></img>
          <img src="" alt=""/>
          </center>
          {/* <h2>Log In</h2> */}
          <form action="" className="ModalComp__signin">

          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" onClick={signIn} >Log In</Button>
          
          </form>
        </div>
      </Modal>

      {/* Modal for image Upload */}
      <Modal open={openUpload} onClose={() => setOpenUpload(false)}>
        <div style={modalStyle} className={classes.paper}>
          {/* Insta Logo */}
          <center>
          <img className="ModalComp__image" alt="insta-logo" src="https://raw.githubusercontent.com/heyRahull/picsogram-image/main/logo3.png"></img>
          </center>
         
         
          {user?.displayName ? (
          <ImageUpload username={user.displayName} />
          ):(
            <h3>You need to log in to upload.</h3>
          )
          }
        </div>
      </Modal>
    </div>
  );
}

export default ModalComp;
