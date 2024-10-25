import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Api from '../axiosConfig';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [userData,setUserData] =useState({
    name:"",
    email:"",
    password:""
  });
  const router = useNavigate();

  function handleChange(event){
    setUserData({...userData,[event.target.name]:event.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault();
    try{
      if(!userData.name || !userData.email || !userData.password){
        return toast.error("All fields are mandatory!!");
      }
      if(userData.name.length < 3){
        return toast.error("Username must be at least 3 characters long.");
      }
      if(userData.password.length < 6){
        return toast.error("Password must be at least 6 characters long.");
      }
      if(userData.name && userData.email && userData.password){
        const response = await Api.post('/auth/register',{userData});
        if(response.data.success){
          setUserData({
            name:"",
            email:"",
            password:""
          });
          toast.success("Resgitration Successful");
          router('/login');
        }
        if(response?.data?.error){
          console.log("response.data.error",response?.data?.error);
          toast.error(response?.data?.error);
      }
      }else{
        toast.error("All fields are required")
      }
    }catch(error){
      toast.error(error?.response?.data?.error)
    }
  }

  return(
    <div id='form-card1'>
      <h2 style={{paddingTop:"25px",color:"blue"}}>Register</h2>
      <form>
        <input type='text' name='name' onChange={handleChange} placeholder='Name' />
        <input type='email' name='email' onChange={handleChange}  placeholder='Email' />
        <input type='password' name='password' onChange={handleChange}  placeholder='Password' />
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <div style={{marginTop:"20px"}}>
        <span>Already have an account?  </span>
        <span style={{color:"blue",textDecoration:"underline",cursor:"pointer"}} onClick={()=>{router('/login')}}>Log in</span>
      </div>
    </div>
  )
}

export default Register