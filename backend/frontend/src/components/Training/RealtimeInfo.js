import React, { useState, useEffect } from 'react';
import '../../css/Training/RealtimeInfo.css';
import { useInterval } from 'usehooks-ts'

const RealtimeInfo = ( { setId, exercises, csrftoken } ) => {
    const [isStarted, setIsStarted] = useState(false)
    const [NameList, setNameList] = useState([])
    const [CountList, setCountList] = useState([])
    const [Index, setIndex] = useState(0)
    const [FailList, setFailList] = useState([0,0])
    const [SuccessList, setSuccessList] = useState([0,0])
    const [FailCount, setFailCount] = useState(0)
    const [SuccessCount, setSuccessCount] = useState(0)
    const [delay, setDelay] = useState(2000); // GET 시간 간격
    const [isRunning, setIsRunning] = useState(false)
    const [isOK, setIsOK] = useState(false)
    const [Result, setResult] = useState("")
    const [ColorSuccess, setColorSuccess] = useState('#27cfb3')
    const [ColorFail, setColorFail] = useState('#27cfb3')

    const formSubmit = e => {
        e.preventDefault();
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
            })
        })
        .catch(error=>console.log(error));
    }
    

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
            if (isStarted == true) {
                setIsRunning(true)
            }
        });
    }, [isStarted]);
    
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
                setColorSuccess('green')
                setColorFail('#27cfb3')
            }
            if( FailList[Index] !== FailCount ) {
                setFailCount(FailList[Index])
                setColorFail('red')
                setColorSuccess('#27cfb3')
            } 

            if (SuccessList[Index] + FailList[Index] === CountList[Index]) {
                setIndex(Index => Index + 1)
                if (CountList.length <= Index) {
                    setIsRunning(false) 
                }
            }
        });
    }, isRunning ? delay : null);
    
    {/*
    // Success
    useEffect(() => {
        setResult("Success")
        setIsOK(true)
        setTimeout(function(){ setIsOK(false); }, 1000);
    }, [SuccessCount]);

    // Fail
    useEffect(() => {
        setResult("Fail")
        setIsOK(true)
        setTimeout(function(){ setIsOK(false); }, 1000);
    }, [FailCount]);
    */}

    return (
        <div>
            <div className="realtime-pose">
                { NameList[Index] }
            </div>
            <div className="realtime-info-success" style={{backgroundColor: ColorSuccess}}>
                <button className="form-submit" onClick={ formSubmit }>START</button>
                Success: { SuccessList[Index] } / { CountList[Index] }회
                {/*{
                    isStarted && isOK &&
                    <div className="success_or_fail">
                        {Result}
                    </div>
                }*/}
            </div>
            <div className="realtime-info-fail" style={{backgroundColor: ColorFail}}>
                &nbsp; Fail: { FailList[Index] } / { CountList[Index] }회
            </div> 
        </div>
    )
}

export default RealtimeInfo;