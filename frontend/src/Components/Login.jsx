import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import Api from '../axiosConfig';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';


function Login() {
  const [userData,setUserData] =useState({
    email:"",
    password:""
  });
  const router = useNavigate();
  const { state, dispatch } = useContext(AuthContext);

  function handleChange(event){
    setUserData({...userData,[event.target.name]:event.target.value})
  }
  
  async function handleSubmit(e){
    e.preventDefault();
    try{
      if(userData.email && userData.password){
        const response = await Api.post('/auth/login',{userData});
        if(response.data.success){
          dispatch({ type: "LOGIN", payload: response.data.userData});
          setUserData({
            email:"",
            password:""
          });
          toast.success("Login Successful");
          router('/');
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
        <div id='form-card2'>
          <h2 style={{paddingTop:"25px",color:"blue"}}>Log In</h2>
          <form>
            <input type='email' name='email' onChange={handleChange}  placeholder='Email' />
            <input type='password' name='password' onChange={handleChange}  placeholder='Password' />
            <button onClick={handleSubmit}>Submit</button>
          </form>
          <div style={{marginTop:"20px"}}>
            <span>Dont have an account?  </span>
            <span style={{color:"blue",textDecoration:"underline", cursor:"pointer"}} onClick={()=>{router('/register')}}>Sign Up</span>
          </div>
        </div>
  )
}

export default Login;