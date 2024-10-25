import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context';
import "../styles/Navbar.css"
import { useNavigate } from 'react-router-dom';
import Api from '../axiosConfig';
import toast from 'react-hot-toast';


function Navbar() {
  const router = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  console.log("state",state);
  
  async function handleLogout() {
    try {
      const response = await Api.post("/auth/logout");
      if (response.data.success) {
        dispatch({ type: "LOGOUT" });
        router("/");
        toast.success(response.data.message);
      } else {
        toast.error("Logout failed.");
      }
    } catch (error) {
      toast.error("Failed to logout.");
    }
  }

  return (
    <div>
      <div style={{backgroundColor:"lightsteelblue"}}>
        <div id='navbar'>
          <h2 className='h2Navbar' onClick={()=>{router('/')}}>Home</h2>
          {state?.user?.name ? (
            <h2 className='h2Navbar'  onClick={handleLogout}>Log Out</h2>
            ) : (
            <h2 className='h2Navbar'  onClick={()=>{router('/login')}}>Log In</h2>
            )}
        </div>
      </div>
    </div>
  )
}

export default Navbar;