import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./comps/Header";
import Post from "./comps/Post";
import { db } from "./firebase";
import ModalComp from './comps/ModalComp'
import { Button } from "@material-ui/core";
import {auth} from './firebase';
import ImageUpload from './comps/ImageUpload';


function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn,setOpenSignIn] = useState(false);
  const [openUpload,setOpenUpload] = useState(false);
  const [user,setUser] = useState(null);
  

  useEffect(() => {
    db.collection("posts").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      //everytime a new post is added this code fires.
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="app">

     {/* Sign Up Modal */}
    <ModalComp open={open} setOpen={setOpen} user={user} setUser={setUser}/> 
    <ModalComp openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} user={user} setUser={setUser}/> 
    <ModalComp openUpload={openUpload} setOpenUpload={setOpenUpload} user={user} setUser={setUser}/>  



{/* header */}
      <Header user={user} setOpen={setOpen} setOpenSignIn={setOpenSignIn} setOpenUpload={setOpenUpload}/>

      <br/> <br/> <br/> <br/> <br/>
<div className="app__posts">
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          postId = {id}
          user = {user}
          imgUrl={post.imgUrl}
          username={post.username}
          caption={post.caption}
        />
      ))}
      <br/>
</div>




    </div>
  );
}

export default App;
