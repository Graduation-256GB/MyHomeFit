import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import {IoMdLogIn,IoMdLogOut} from "react-icons/io"
import {FiUserPlus} from "react-icons/fi"

const MenuList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .ant-menu {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
`;

const NavBar=()=> {

  const [auth, setAuth] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setAuth(true);
    }
  }, [])

  const handleLogout = () => {

   fetch('http://127.0.0.1:8000/api/auth/logout/', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       Authorization: `Token ${localStorage.getItem('token')}`
     }
   })
     .then(res => res.json())
     .then(data => {
       console.log(data);
       localStorage.clear();
       window.location.replace('http://127.0.0.1:8000/login');
     });
  };

  return(
    <div>
      <div className="navbar-wrapper">
        <div className="navbar-menu">
          { auth ?
            <div key="logout" onClick={handleLogout} className="navbar-menu-item">
              <IoMdLogOut/>&nbsp;
              Logout
            </div>
            
            :
            <div key="signin" className="navbar-menu-item">
              <Link to="/login">
                <IoMdLogIn />&nbsp;Login
              </Link>
            </div>
          }
          { auth ?
            <></>
          :
            <div key="signup" className="navbar-menu-item">
              <Link to="/signup">
                <FiUserPlus/>&nbsp;
              Sign Up
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar;