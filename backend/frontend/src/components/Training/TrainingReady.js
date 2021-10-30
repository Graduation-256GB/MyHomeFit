import React, { useState } from 'react';
import "../../css/Training/Training.css"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Content } from 'antd/lib/layout/layout';

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


    const renderTime = ({ remainingTime }) => {
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
      };

    return (
    <div className="speedModal">
         
                {
                    countdown===false&&
                    <div className="modalContainer">  
                    <div className="ready-content">
                        <h2>운동 속도를 선택해주세요.</h2>
                        <div className="ready-choice">
                            <a onClick={startTraining } className="fast" name="fast">빠르게</a>
                            <a onClick={startTraining } className="basic" name="basic">보통 속도로</a>
                            <a onClick={startTraining } className="slow" name="slow">천천히</a>
                        </div>
                    </div>
                    </div>
                }
                {
                    countdown===true&&
                    <div className="count-circle-content">
                        <label> 세 발자국 뒤로 가서 전신이 보이게 서주세요. </label>
                    <CountdownCircleTimer
                        isPlaying
                        size="350"
                        strokeWidth="25"
                        duration={5}
                        colors={[
                            ["#9000ff", 0],
                            ["#0066FF", 1]
                          ]}
                        isLinearGradient={true}
                        
                        onComplete={() => { setPage(2)}}
                    >
                        {renderTime}
                    </CountdownCircleTimer>
                    </div>
                }
        </div>
    // </div>
    )
};
export default TrainingReady;