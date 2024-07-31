import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
    const {currentUser}=useSelector(state=>state.user);
    const [imageFile,setImageFile]=useState(null);
    const [imageFileUrl,setImageFileUrl]=useState(null);
    const [imageFileUploadProgess,setImageFileUploadProgress]=useState(0);
    const [ImageFileUploadError,setImageFileUploadError]=useState(null);
    const filePickerRef=useRef();

    const handleImageChange=(e)=>{
      const file=e.target.files[0];
      if(file){
        const imageUrl=URL.createObjectURL(file);
        setImageFile(file);
        setImageFileUrl(imageUrl);
        
      }
    };

    useEffect(()=>{
      if(imageFile){
        uploadImage();
      }
    },[imageFile]);

    const uploadImage=async()=>{
      // service firebase.storage {
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read;
      //       allow write: if request.resource.size < 2*1024*1024 &&
      //       request.resource.contentType.matches('image/.*');
      //     }
      //   }
      // }
    setImageFileUploadError(null);
      const storage=getStorage(app);
      const fileName=new Date().getTime() + imageFile.name;
      const storageRef=ref(storage,fileName);
      const uploadTask=uploadBytesResumable(storageRef,imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error)=>{
          setImageFileUploadError('Could not upload image (File must be less than 2MB'); 
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{setImageFileUrl(downloadUrl)});
        }
      );
    };


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1> 
      <form className='flex flex-col gap-4'>
        <input type="file" accept="image/*" onChange={handleImageChange} hidden ref={filePickerRef}/>
        <div className=' relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
          
         {imageFileUploadProgess &&<CircularProgressbar value={imageFileUploadProgess || 0} text={`${imageFileUploadProgess}%`} strokeWidth={5}
         style={{
            root:{
              width:'100%',
            height:'100%',
          position:'absolute',
        top:0,
      left:0,},
      path:{
        stroke:`rgba(62,152,199,${imageFileUploadProgess/100})`,
      }
         }} />}
        <img src={imageFileUrl || currentUser.profilePicture} alt={currentUser.displayName} className='w-full h-full rounded-full object-cover border-8 border-[lightgray]' />
        </div>
        {ImageFileUploadError && <Alert color="failure">{ImageFileUploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
      <span className='cursor-pointer hover:text-red-700'>Delete Account</span>
      <span className=' cursor-pointer hover:text-red-700'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile
