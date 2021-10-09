import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import {IoMdLogIn,IoMdLogOut} from "react-icons/io"
import {MdPlayCircleOutline} from "react-icons/md"
import {FiFolderPlus, FiUserPlus} from "react-icons/fi"
import {BiNotepad, BiLineChart} from "react-icons/bi"

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
  const userImg=localStorage.getItem('userImg')
  const userName=localStorage.getItem('userName')

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
      <div className="navbar-wrapper">
        <div className="navbar-menu">
          <div className="navbar-menu-item">
            <Link to="/login" className="logo">MY HOME FIT</Link>
          </div>
          <div className="navbar-menu-item">
            <Link to="/makeyourset"><FiFolderPlus />&nbsp;Make Your Set</Link>
            <Link to="/training"><MdPlayCircleOutline />&nbsp;Training</Link>
            <Link to="/fitnotes"><BiLineChart/>&nbsp;Community</Link>
            <Link to="/calender"><BiNotepad/>&nbsp;Calender</Link>
          
        {auth ?
          <div>
            <div className="navbar-user">
              <div className="user-img">
                <img src={userImg}></img>
              </div>
                <span>
                  {userName}&nbsp;
              </span>
            <div key="logout" onClick={handleLogout} className="logout" >
              <IoMdLogOut/>
            </div>
            </div>
          </div>
            
            :
              <div key="signin" className="log-box">
                <Link to="/login">
                  <IoMdLogIn />&nbsp;Login
                </Link>
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