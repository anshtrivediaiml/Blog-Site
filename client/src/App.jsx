import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Projects from './pages/Projects'
import Header from './components/Header'
import FooterCom from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route element={<PrivateRoute/>}>
       <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      <FooterCom/>
    </BrowserRouter>
  )
}

export default App
