import React, { useState } from 'react';
import "../../css/Training/Training.css"


const TrainingReady = ({ setPage,setSpeed }) => {
    const startTraining = e => {
        setPage(2)
        setSpeed(e.target.name)
    }
    return (    
    <div className="ready-box">
        <div className="ready-content">
                <h2>속도를 선택해주세요.</h2>
                <div className="ready-choice">
                    <a onClick={startTraining } name="fast">빠르게</a>
                    <a onClick={startTraining } name="basic">보통 속도로</a>
                    <a onClick={startTraining } name="slow">천천히</a>
                </div>
        </div>
    </div>
    )
};
export default TrainingReady;