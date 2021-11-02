import React, {useState, useEffect} from 'react';
import axios from 'axios';

import '../css/MakeYourSet/MakeYourSet.css'

import MakeYourSetBlocks from '../components/MakeYourSet/MakeYourSetBlocks';
import Navbar from '../components/Navbar';

function MakeYourSet () {
    const [setList, setSetList] = useState({ data: null });
    const [currentUser, setCurrentUser] = useState({ data: null });
    
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
            SetNameArr.push(setList.data[key].title)
        });
        
    }
    return(
        <>
        <div className='page-top-layer'>
            <div className='page-top-container'>
                    <div className='page-wrapper'>
                        <Navbar />
                </div>
            </div>
            <MakeYourSetBlocks setArr={setArr} />
        </div>

        </>
    )


}

export default MakeYourSet;