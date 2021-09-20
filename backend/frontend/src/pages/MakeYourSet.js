import React, {useState, useEffect} from 'react';
import axios from 'axios';

import '../css/gaok/MakeYourSet.css'
import IconSet from '../images/icon_makeyourset.png';
import {IoIosCut} from 'react-icons/io'

import MakeYourSetBlocks from '../components/MakeYourSet/MakeYourSetBlocks';

function MakeYourSet () {
    const [setList, setSetList] = useState({ data: null });

    const Token = localStorage.getItem('token')
    console.log(Token)
    useEffect(() => {
        const fetchData = async () => {
            const setlist = await axios.get(
                'http://127.0.0.1:8000/api/set/list/', {
                    headers: {
                        Authorization: `Token ${Token}`
                    }
            });

            setSetList({ data: setlist.data});
        };

        fetchData();
     }, []);

    console.log('render');
    if (setList.data) {
        console.log("setlist", setList.data);
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
                    <div className='page-title'>
                        <div>
                            <label>Make Your Set.</label>
                            {/* <img src={IconSet}/> */}
                            <IoIosCut size="50" color="#ffffff"/>
                        </div>

                        <svg width="100" height="100">
                            <circle cx="50" cy="50" r="50" fill="white"></circle>
                        </svg>
                    </div>
                    <div className='page-small-title'>
                        <label>Only For You, Gaok</label>
                    </div> 
                </div>
            </div>
           
            <MakeYourSetBlocks setArr={setArr} />
        </div>

        </>
    )


}

export default MakeYourSet;