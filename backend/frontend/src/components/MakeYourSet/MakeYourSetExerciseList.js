import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import axios from 'axios';
// import MakeYourSetMainSet from '../makeyourset/MakeYourSetMainSet'
import '../../css/gaok/MakeYourSet.css'

function MakeYourSetExerciseList ({setid}) {

    const SET_ID=setid
    console.log("props 전달 확인")
    console.log(SET_ID)
    
    const isDesktopOrLaptop = useMediaQuery( {minDeviceWidth: 1224} )
    const isBigScreen = useMediaQuery({minDeviceWidth: 1824})
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})
    const isTabletOrMobileDevice = useMediaQuery({maxDeviceWidth: 1224})
    const isPortrait = useMediaQuery({orientation: 'portrait'})
    const isRetina = useMediaQuery({minResolution: '2dppx'})

    const [exercise, setExercise] = useState({ data: '' });
    const Token = localStorage.getItem('token')
    useEffect(() => {
        const fetchData = async () => {
            const exerciselist = await axios(
                `http://127.0.0.1:8000/api/exerciseset/${setid}/`, {
                    headers: {
                        Authorization: `Token ${Token}`
                    }
            });
            
            setExercise({ data: exerciselist.data });
        };

        fetchData();
     }, [setid]);

    console.log('render2');
    const exerciseArr=[]
    if (exercise.data) {
        Object.keys(exercise.data).forEach(function (key) {
            exerciseArr.push(exercise.data[key])
            // console.log("setlist", resp.data);
            console.log("exerciseset", exercise.data)
        });
    }  
    
   
    return(    
            <div className='page-contents-exercise-list'>
                
                {exerciseArr.map(item => (
                    <div className='page-contents-exercise-item'>
                        <img src={item.img}/>
                        <label>{item.set_count}회 반복</label>
                    </div>
                ))}   
                 
            </div>
    )
}

export default MakeYourSetExerciseList;