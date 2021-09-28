import React from 'react';
import { useAsync } from "react-async"
import '../../css/FitNotes/FitnessRank.css';
import Fitness from '../../components/FitNotes/Fitness'
import img1 from "../../images/running.png"
import img2 from "../../images/fitnotes_squat.png"
import img3 from "../../images/fitnotes_handup.png"
import Calories from "../../images/FitCalories.JPG"
import Calender from "../../pages/Calender";


const loadExercise = async () => {
    const Token = localStorage.getItem('token')
    const res = await fetch('http://127.0.0.1:8000/api/exercise/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${Token}`
        }
    })
    if (!res.ok) throw new Error(res)
    return res.json()
}

{/*
const FitnessRank = ({name}) => {
    return(
        <div className='rank-fitness-container'>
            <img src={Calories}/>
        </div>
    )
}
*/}

const FitnessCalories = () => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadExercise })
    const new3List = []

    if (data) {
        Object.keys(data).forEach(function (key) {
            new3List.push(data[key]);
        });
        console.log(new3List)
    }

    return(
        <div className='rank-fitness-container'>
            <label>New 3 Fitness</label>
            <div>
                {
                    new3List.slice(-3,).map(item => (        
                        <div className="fitness-container">
                            <div className="fitness">
                                <img src={item.img}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FitnessCalories;