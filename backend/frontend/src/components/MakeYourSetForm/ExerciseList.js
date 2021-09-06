import React from 'react';
import '../../css/MakeYourSetForm/ExerciseList.css';
import { BiAddToQueue } from 'react-icons/bi'
import SquatImg from '../../images/squat.png';



const ExerciseList = ({ exerciseArr,addList }) => {
    

    return(
        <div className="exercise-list">
                    {
                        exerciseArr.map(item => (
                        <div className="exercise-box">
                                <div className="exercise-hover" value={ item.name} onClick={ addList}>
                                <BiAddToQueue value={ item.name}/>
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
