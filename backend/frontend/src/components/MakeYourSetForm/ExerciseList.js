import React from 'react';
import '../../css/MakeYourSetForm/ExerciseList.css';
import { BiAddToQueue } from 'react-icons/bi'
import SquatImg from '../../images/squat.png';



const ExerciseList = ({ exerciseArr,setArr }) => {
    const addList = e => {
        const exerciseTitle = e.target.getAttribute('value');
        if (exerciseTitle != null) {
            setArr.push(exerciseTitle);
            console.log(setArr);
        }
    }

    return(
        <div className="exercise-list">
                    {
                        exerciseArr.map(item => (
                        <div className="exercise-box">
                            <div className="exercise-hover">
                                <BiAddToQueue/>
                            </div>
                            <div className="exercise-img">
                                <img src={item.img}></img>
                            </div>
                        <div className="exercise-title">{item.name}</div>
                    </div>
                        ))}
                    <div className="exercise-box">
                        <div className="exercise-hover" value="Squat" onClick={ addList}>
                            <BiAddToQueue value="Squat"/>
                        </div>
                        <div className="exercise-img">
                            <img src={SquatImg}></img>
                        </div>
                        <div className="exercise-title" >Stretch</div>
                    </div>
                    
                </div>
    )
}
export default ExerciseList;
