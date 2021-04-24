import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import '../comps/Post.css'
import { Button, Input, Modal } from '@material-ui/core';
import { db } from '../firebase';
import firebase from 'firebase';
import { makeStyles } from "@material-ui/core/styles";

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
    height: 400,
    // backgroundColor: theme.palette.background.paper,
    outline: 'none',
    border: "none",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
}));


function Post({imgUrl, user, postId, username, caption}) {
  const [comments, setComments] = useState([]);
  const [comment,setComment] = useState('');
  const [openImage,setOpenImage] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    let unsubscribe;
    if(postId){
      unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy('timestamp','asc')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()))
      });
// console.log(comments);
    }

    return () =>{
      unsubscribe();
    } 
  },[postId])

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text : comment,
      username : user.displayName,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })

    setComment("");
  }

  
    return (
        <div>

          <Modal open={openImage} onClose={() => setOpenImage(false)}>
        <div style={modalStyle} className={classes.paper} >
          <img className="imageUpload__openimage" src={imgUrl} alt="insta-post"/>
         </div> 
        
      </Modal>



            {/* posts */}
      <div className="post">
        {/* header */}
        <div className="post___header">
        <Avatar className="post__avatar" alt={username} src={username} />
        <h3>{username}</h3>
        </div>
        {/* image */}
        <img style={{cursor : "pointer"}} className="post__image" onClick={() => setOpenImage(true)} src={imgUrl} alt="insta-post"/>
        {/* caption */}
        <h4 className="post__text"><strong>{username} </strong> {caption}</h4>

{/* posting comments */}
      <div className="post_comments">
        {comments.map((comment)=>(
          
            <div className="post__comment">
            <Avatar  className="post__avatar"  alt={comment.username} src={comment.username} />
            <p>
            <strong>{comment.username}</strong> {comment.text}
            </p>
            </div>
          
        ))}
      </div>

        {/* comment Box */}
        <form >
        <div className="post__commentBox">
        <Input placeholder="Add a Comment..." value={comment} onChange={(event) => setComment(event.target.value)} className="post__commentInput" type="text"/>
        <Button type="submit" className="post__commentButton" onClick={postComment}>Post</Button>
        </div>
        </form>

      </div>
      {/* posts */}
        </div>
    )
}

export default Post
