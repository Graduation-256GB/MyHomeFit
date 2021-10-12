import React, { useState, useEffect } from 'react';
import '../../css/Training/RealtimeInfo.css';
import { useInterval } from 'usehooks-ts'

const RealtimeInfo = ( {  Index, setIndex, FailList, setFailList, SuccessList, setSuccessList, page, setPage, Exercises, setId, IsStarted, NameList, CountList,ImageList } ) => {
    
    
    const [FailCount, setFailCount] = useState(0)
    const [SuccessCount, setSuccessCount] = useState(0)
    const [delay, setDelay] = useState(2000); // GET 시간 간격
    const [isRunning, setIsRunning] = useState(false)
    //const [isOK, setIsOK] = useState(false)
    //const [Result, setResult] = useState("")
    const [ColorSuccess, setColorSuccess] = useState('#27cfb3')
    const [ColorFail, setColorFail] = useState('#27cfb3')
    const [DisplayFail, setDisplayFail] = useState('none')
    const [DisplaySuccess, setDisplaySuccess] = useState('none')


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
            console.log(data)
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

            if( SuccessList[Index] !== SuccessCount ) {
                setSuccessCount(SuccessList[Index])
                setDisplaySuccess('block')
                setDisplayFail('none')
                console.log('success')
            }
            if( FailList[Index] !== FailCount ) {
                setFailCount(FailList[Index])
                setDisplayFail('block')
                setDisplaySuccess('none')
                console.log('fail')
            }

            if (SuccessList[Index] + FailList[Index] === CountList[Index]) {
                setIndex(Index => Index + 1)
            }
        });
    }, isRunning ? delay : null);
    

    useEffect(()=> {
        console.log("exercises", Exercises.length)
        console.log("Index", Index)
        if (Exercises.length < Index + 1){
            console.log("result")
            setPage(3)
        }
    })

    return (
        <div className="training-note">
            <div className="note-set">
                <h2>{Exercises[Index].set_title}</h2>
                <span>{Exercises[Index].set_type}</span>        
            </div>
            <div className="current-exercise">
                <img src={ImageList[Index]} />
                <h2>{NameList[Index]}</h2>
                <span className="current-count">{SuccessList[Index] + FailList[Index]} / {CountList[Index]}</span>
                <div className="current-score">
                    <span className="current-success">Success: { SuccessList[Index] }</span>
                    <span className="current-fail">Fail: { FailList[Index] }</span>
                </div>
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