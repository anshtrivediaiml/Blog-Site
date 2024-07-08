import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
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
        <form className='flex flex-col gap-4'>
        <div>
          <Label value="Your Username"/>
          <TextInput placeholder='username' id="username" type="text"/>
        </div>
        <div>
          <Label value="Your Email"/>
          <TextInput placeholder='name@gmail.com' id="email" type="text"/>
        </div>
        <div>
          <Label value="Your Password"/>
          <TextInput placeholder='Password' id="password" type="text"/>
        </div>
        <Button gradientDuoTone='purpleToPink' type="submit">Sign Up</Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Have an account?</span>
          <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SignUp
