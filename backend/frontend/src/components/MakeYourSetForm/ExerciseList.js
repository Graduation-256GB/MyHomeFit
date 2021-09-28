import React from 'react';
import '../../css/MakeYourSetForm/ExerciseList.css';
import { BiAddToQueue } from 'react-icons/bi'
import SquatImg from '../../images/squat.png';
import Stretch from '../../images/stretch.png';



const ExerciseList = ({ exerciseArr,addList }) => {
    

    return(
        <div className="exercise-list">
            {
                exerciseArr.map(item => (
                        <div className="exercise-box">
                            <div className="exercise-hover"
                                    data-id={item.id}
                                    data-name={item.name}
                                    data-img={item.img}
                                    onClick={addList}>
                            <BiAddToQueue data-id={item.id}
                                data-name={item.name}
                                data-img={item.img} />
                            </div>
                            <div className="exercise-img">
                                <img src={item.img}></img>
                            </div>
                        <div className="exercise-title">{item.name}</div>
                    </div>
                ))
            }
                    {/* <div className="exercise-box">
                    <div className="exercise-hover" data-id="1" data-name="Squat" data-img="/static/media/squat.a09ebb93.png" onClick={addList}>
                            <BiAddToQueue data-id="1" data-name="Squat" data-img="/static/media/squat.a09ebb93.png"/>
                        </div>
                        <div className="exercise-img">
                            <img src={SquatImg}></img>
                        </div>
                        <div className="exercise-title" >Squat</div>
                    </div>
                    <div className="exercise-box">
                        <div className="exercise-hover" data-id="2" data-name="Stretch" data-img="/static/media/stretch.16cd2c25.png" onClick={addList}>
                            <BiAddToQueue data-id="2" data-name="Stretch" data-img="/static/media/stretch.16cd2c25.png"/>
                        </div>
                        <div className="exercise-img">
                            <img src={Stretch}></img>
                        </div>
                        <div className="exercise-title" >Stretch</div>
                    </div> */}
                    
                </div>
    )
}
export default ExerciseList;
