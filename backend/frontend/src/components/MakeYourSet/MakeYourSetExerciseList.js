import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/gaok/MakeYourSet.css'

function MakeYourSetExerciseList ({setid}) {

    //const SET_ID=setid
    //console.log("props 전달 확인")
    //console.log(SET_ID)

    const [exercise, setExercise] = useState({ data: '' });
    const Token = localStorage.getItem('token')
    useEffect(() => {
        if (setid !== -1) {
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
        }
        else {
            setExercise([])
        }
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