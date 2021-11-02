import React from 'react';
import '../../css/MakeYourSetForm/ExerciseList.css';
import { BiAddToQueue } from 'react-icons/bi'



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
                        <a className="exercise-video-url" href={item.url} target="_blank">전문가 영상</a>
                    </div>
                ))
            }
                    
                </div>
    )
}
export default ExerciseList;
