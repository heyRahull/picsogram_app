import React, { useState } from 'react';
import { storage, db } from '../firebase';
import firebase from 'firebase';
import { Button, Input } from '@material-ui/core';

function ImageUpload({username}) {
    const [caption,setCaption] = useState("");
    const [image,setImage] = useState(null);
    const [progress,setProgress] = useState('');
    const [error,setError] = useState("Please enter a valid file (png or jpeg)");
    const types = ["image/png", "image/jpeg","image/jpg"];

    const handleChange = (e) =>{
        if(e.target.files[0] && types.includes(e.target.files[0].type)){
            setImage(e.target.files[0]);
            
        }else{
            setImage(null);
            alert(error);
        }
    }

    const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress);
            },
            (error) =>{
                //Error Function
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db
                        db.collection("posts").add({
                            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                            caption : caption,
                            imgUrl : url,
                            username : username,

                        });

                        setProgress(0)
                        setCaption("")
                        setImage(null)
                    })
            }
            )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max='100'/><br/>
            <Input type="file" onChange={handleChange}/> <br/>
            <Input placeholder="Enter Caption for Image" value={caption} onChange={event => setCaption(event.target.value)} type="text"/> <br/>
            
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
