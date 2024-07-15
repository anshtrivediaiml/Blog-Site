import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import GoogleAuthProvider from 'firebase/sutth';

const OAuth = () => {

const auth= getAuth();

    const handleGoogleClick=async()=>{
    const provider=new GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'});
    try{
       const res= await signInWithPopup(auth,provider); 
    }catch(err){
        console.log(err);
    }
h    }
  return (
    <Button type="button" gradientDuoTone={'pinkToOrange'} outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/> 
        Continue with Google
    </Button>
  )
}

export default OAuth
