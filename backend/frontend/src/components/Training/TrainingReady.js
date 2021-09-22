import React, { useState } from 'react';
import "../../css/Training/Training.css"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const TrainingReady = ({ setPage, setSpeed }) => {
    const [countdown, setCountDown]=useState(false)
    const startTraining = e => {
        setSpeed(e.target.name)
        setCountDown(true)
    }
    return (    
    <div className="ready-box">   
            {
                countdown===false&&
                <div className="ready-content">
                    <h2>속도를 선택해주세요.</h2>
                    <div className="ready-choice">
                        <a onClick={startTraining } name="fast">빠르게</a>
                        <a onClick={startTraining } name="basic">보통 속도로</a>
                        <a onClick={startTraining } name="slow">천천히</a>
                    </div>
                </div>
            }
            {
                countdown===true&&
                <CountdownCircleTimer
                    isPlaying
                    duration={3}
                    colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                    ]}
                    onComplete={() => { setPage(2)}}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
            }
    </div>
    )
};
export default TrainingReady;