import React, {useState, useEffect} from 'react';
import axios from 'axios';

import '../css/gaok/MakeYourSet.css'
import IconSet from '../images/icon_makeyourset.png';
// import {IoIosCut} from 'react-icons/io'
import {FcSearch} from 'react-icons/fc'

import MakeYourSetBlocks from '../components/MakeYourSet/MakeYourSetBlocks';
import Navbar from '../components/Navbar';

function MakeYourSet () {
    const [setList, setSetList] = useState({ data: null });
    const [currentUser, setCurrentUser] = useState({ data: null });
    // const [username, setUserName] = useState();
    const username = currentUser?.data?.username;
    const userImg = currentUser?.data?.profile_img;
    
    const Token = localStorage.getItem('token')
    useEffect(() => {
        const fetchData = async () => {
            const setlist = await axios.get(
                'http://127.0.0.1:8000/api/set/list/', {
                    headers: {
                        Authorization: `Token ${Token}`
                    }
            });
            const setuserdata = await axios.get(
                'http://127.0.0.1:8000/api/user/current/', {
                    headers: {
                        Authorization: `Token ${Token}`
                    }
            });
            setCurrentUser({ data: setuserdata.data });
            setSetList({ data: setlist.data });
            };
            
            fetchData();
        }, [currentUser.data]);
        
    if (currentUser.data) {
        localStorage.setItem('userImg',currentUser.data.profile_img)
        localStorage.setItem('userName',currentUser.data.username)
        // setUserName(currentUser.data.username);
    }
    const setArr = []
    const SetNameArr = []
    
    if (setList.data) {
        Object.keys(setList.data).forEach(function (key) {
            setArr.push(setList.data[key]);
            console.log(setList.data[key].title)
            console.log(setList.data[key].id)
            SetNameArr.push(setList.data[key].title)
        });
        console.log(SetNameArr.length);
        
    }
    return(
        <>
        <div className='page-top-layer'>
            <div className='page-top-container'>
                    <div className='page-wrapper'>
                        <Navbar />
                    <div className='page-title'>
                        <div className="page-label">
                            <label>Make Your Set.</label>
                            <div className="menu-icon">
                            <FcSearch />
                            </div>
                        </div>

                        <div className="user-img">
                            <img src={userImg}></img>
                        </div>
                    </div>
                    <div className='page-small-title'>
                            <label>Only For You, </label>
                            <label>{ username }</label>
                    </div> 
                </div>
            </div>
           
            <MakeYourSetBlocks setArr={setArr} />
        </div>

        </>
    )


}

export default MakeYourSet;