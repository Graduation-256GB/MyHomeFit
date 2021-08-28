import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

function NavBar() {

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
      <MenuList>
        <Menu>
          { auth ?
            <Menu.Item key="logout" onClick={handleLogout}>
              로그아웃
            </Menu.Item>
            
            :
            <Menu.Item key="signin">
              <Link to="/login">
              로그인
              </Link>
            </Menu.Item>
          }
          { auth ?
            <></>
          :
            <Menu.Item key="signup">
              <Link to="/signup">
              회원가입
              </Link>
            </Menu.Item>
          }
        </Menu>
      </MenuList>
    </div>
  )
}

export default NavBar;