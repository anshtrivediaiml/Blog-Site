import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

const Dashboard = () => {
  const location=useLocation();
  const [tab,setTab]=useState('');
  useEffect(()=>{
    const UrlParams=new URLSearchParams(location.search);
    const tabFromUrl=(UrlParams.get('tab'));
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar/>
      </div>
      <div>
        {/* Profile ... */}
     {tab=='profile' && <DashProfile/>}
      </div>
    </div>
  )
}

export default Dashboard
