import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { set } from 'mongoose';
import React, { useState } from 'react'
import { Link,useNavigate,Navigate } from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

const SignIn = () => {

  const [formData,setFormData]=useState({});
  const {loading,error:errorMessage}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const handleChange=(e)=>{
   setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill in all fields'));
      
    }
    try{
     dispatch(signInStart());
     const res=await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
     });
     const data =await res.json();
     if(data.success ===false){
      dispatch(signInFailure(data.message));
     }
     if(res.ok){
      dispatch(signInSuccess(data));
      Navigate('/');
     }
    }catch(err){
     dispatch(signInFailure(err.message));
    }

  }

  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* Left Side div */}
      <div className='flex-1'>
      <Link to="/" className='text-4xl font-bold dark:text-white'>
     <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to bg-pink-500 rounded-lg text-white'>Sahand's</span>Blog
     </Link>
     <p className='text-sm mt-5 '>
      This is a demo project. Sign up to see the dashboard.
     </p>
      </div>

      {/* Right Side Div */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}> 
        <div>
          <Label value="Your Email"/>
          <TextInput placeholder='name@gmail.com' id="email" type="email" onChange={handleChange}/>
        </div>
        <div>
          <Label value="Your Password"/>
          <TextInput placeholder='Password' id="password" type="password" onChange={handleChange}/>
        </div>
        <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>
          {loading ? (<>
            <Spinner size={sm}/>
            <span className='pl-3'>Loading....</span>
          </>
          ) : 'Sign In'}
        </Button>
        <OAuth/>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Don't Have an account?</span>
          <Link to='/signup' className='text-blue-500'>Sign Up</Link>
        </div>
        {errorMessage && 
        <Alert className='mt-5' color='failure'>
      {errorMessage}    
        </Alert>}
      </div>
    </div>
    </div>
  )
}

export default SignIn
