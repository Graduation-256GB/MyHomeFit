import React, { useState } from 'react';
import "../../css/Training/Training.css"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const TrainingReady = ({ setPage, setSpeedNum, setIsStarted, setNameList, setCountList, exercises, csrftoken, setImageList }) => {
    const [countdown, setCountDown]=useState(false)
    const startTraining = e => {
        if (e.target.name === 'fast') {
            setSpeedNum(5)
        }
        else if (e.target.name === 'basic') {
            setSpeedNum(4)
            
        }
        else if (e.target.name === 'slow') {
            setSpeedNum(3)
        }
        setCountDown(true)

        fetch('http://127.0.0.1:8000/api/log/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(exercises)
        })
        .then(response=>response.json())
        .then(data => {
            console.log(data)
            setIsStarted(true)
            exercises.map(item => {
                setNameList(NameList => [...NameList, item.name]);
                setCountList(CountList => [...CountList, item.set_count]);
                setImageList(ImageList => [...ImageList, item.img]);
            })
        })
        .catch(error=>console.log(error));
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