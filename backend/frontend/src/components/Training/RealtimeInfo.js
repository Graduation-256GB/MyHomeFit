import React, { useState, useEffect } from 'react';
import '../../css/Training/RealtimeInfo.css';
import { useInterval } from 'usehooks-ts'
import countSound from '../../audio/countSound';
import one from '../../audio/1.mp3';
import two from '../../audio/2.mp3';
import three from '../../audio/3.mp3';
import four from '../../audio/4.mp3';
import five from '../../audio/5.mp3';
import six from '../../audio/6.mp3';
import seven from '../../audio/7.mp3';
import eight from '../../audio/8.mp3';
import nine from '../../audio/9.mp3';
import ten from '../../audio/10.mp3';

const RealtimeInfo = ({ Index, setIndex, FailList, setFailList, SuccessList, setSuccessList, page, setPage, Exercises, setId, IsStarted, NameList, CountList, ImageList, setAllCount,allCount, isRunning, setIsRunning}) => {
    const soundOne = countSound(one, 1); 
    const soundTwo = countSound(two, 1); 
    const soundThree = countSound(three, 1); 
    const soundFour = countSound(four, 1); 
    const soundFive = countSound(five, 1); 
    const soundSix = countSound(six, 1); 
    const soundSeven = countSound(seven, 1); 
    const soundEight = countSound(eight, 1); 
    const soundNine = countSound(nine, 1); 
    const soundTen = countSound(ten, 1); 

    const [flag1, setFlag1] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(true);
    const [flag4, setFlag4] = useState(true);
    const [flag5, setFlag5] = useState(true);
    const [flag6, setFlag6] = useState(true);
    const [flag7, setFlag7] = useState(true);
    const [flag8, setFlag8] = useState(true);
    const [flag9, setFlag9] = useState(true);
    const [flag10, setFlag10] = useState(true);
    
    const [FailCount, setFailCount] = useState(0)
    const [SuccessCount, setSuccessCount] = useState(0)
    const [delay, setDelay] = useState(1000); // GET 시간 간격
    const [DisplayFail, setDisplayFail] = useState('none')
    const [DisplaySuccess, setDisplaySuccess] = useState('none')

    const [SuccessLength, setSuccessLength] = useState(0)
    const [FailLength, setFailLength] = useState(0)

    // start button을 눌러서 객체를 만든 후 GET
    useEffect(() => {
        const Token = localStorage.getItem('token')
        fetch(`http://127.0.0.1:8000/api/log/${setId}/`, {
            method: "GET",
            dataType: 'json',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Token ${Token}`
            }
        })
        .then(response => response.json())
        .then(data => {
                        if (IsStarted == true) {
                setIsRunning(true)
            }
        });
    }, [IsStarted]);
    
    // delay마다 반복 GET
    useInterval(() => {
        const Token = localStorage.getItem('token')
        fetch(`http://127.0.0.1:8000/api/log/${setId}/`, {
            method: "GET",
            dataType: 'json',
            headers: {
                'accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Token ${Token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setSuccessList([])
            setFailList([])
            Object.keys(data).forEach(function (key) {
                setSuccessList(SuccessList => [...SuccessList, data[key].correct_count]);
                setFailList(FailList => [...FailList, data[key].fail_count]);
            })
            setSuccessLength(SuccessList.length)
            setFailLength(FailList.length)
        });
    }, isRunning ? delay : null);

    useEffect(() => {
        if (SuccessList.length === SuccessLength && FailList.length === FailLength && 0 < SuccessLength && 0 < FailLength ) {
            if ( SuccessList[Index] !== SuccessCount ) {
                setSuccessCount(SuccessList[Index])
                setDisplaySuccess('block')
                setDisplayFail('none')
                setAllCount(allCount+1)
            }
            else if( FailList[Index] !== FailCount ) {
                setFailCount(FailList[Index])
                setDisplayFail('block')
                setDisplaySuccess('none')
                setAllCount(allCount+1)
            }

            if (SuccessList[Index] + FailList[Index] === CountList[Index]) {
                setIndex(Index => Index + 1)
                setFlag1(true)
                setFlag2(true)
                setFlag3(true)
                setSuccessCount(0)
                setFailCount(0)
            }
        }
    }, [SuccessList, FailList])

    useEffect(()=> {

        if (flag1==true){
            if ( (SuccessList[Index]+FailList[Index]) == 1) {
                soundOne.play()
                setFlag1(false)
            } 
        }
        if (flag2==true){
            if ( (SuccessList[Index]+FailList[Index]) == 2) {
                soundTwo.play()
                setFlag2(false)
            } 
        }

        if (flag3==true){
            if ( (SuccessList[Index]+FailList[Index]) == 3) {
                soundThree.play()
                setFlag3(false)
            } 
        }


        if (Exercises.length < Index + 1){
            setPage(3)
        }
    })

    return (
        <div className="training-note">
            {/* <div className="note-set">
                <h2>{Exercises[0].set_title}</h2>
                <span>{Exercises[0].set_type}</span>        
            </div> */}
            <div className="current-exercise">
                <img src={ImageList[Index]} />
                <span className="current-name">{NameList[Index]}</span>
                <span className="current-count">{SuccessList[Index] + FailList[Index]} / {CountList[Index]}</span>
                {/* <div className="current-score">
                    <span className="current-success">Success: { SuccessList[Index] }</span>
                    <span className="current-fail">Fail: { FailList[Index] }</span>
                </div> */}
            </div>
            {/* <div className="realtime-info-success" style={{backgroundColor: ColorSuccess}}>
                Success: { SuccessList[Index] } / { CountList[Index] }회
            </div>
            <div className="realtime-info-fail" style={{backgroundColor: ColorFail}}>
                &nbsp; Fail: { FailList[Index] } / { CountList[Index] }회
            </div>  */}
            
            <div className="realtime-info-success" style={{display:DisplaySuccess}}>
                Success!
            </div>
            <div className="realtime-info-fail" style={{display:DisplayFail}}>
                Fail
            </div>
        </div>
        
    )
}

export default RealtimeInfo;