import React, { useState, useEffect } from 'react';
import '../../css/Training/RealtimeInfo.css';
import { useInterval } from 'usehooks-ts'

const RealtimeInfo = ( { setId, exercises, csrftoken } ) => {
    const [IsStarted, setIsStarted] = useState(false)
    const [NameList, setNameList] = useState([])
    const [CountList, setCountList] = useState([])
    const [Index, setIndex] = useState(0)
    const [FailCount, setFailCount] = useState([0,0])
    const [CorrectCount, setCorrectCount] = useState([0,0])
    const [delay, setDelay] = useState(2000); // GET 시간 간격
    const [isRunning, setIsRunning] = useState(false)

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
            setCorrectCount([])
            setFailCount([])
            Object.keys(data).forEach(function (key) {
                setCorrectCount(CorrectCount => [...CorrectCount, data[key].correct_count]);
                setFailCount(FailCount => [...FailCount, data[key].fail_count]);
            })
            if (CorrectCount[Index] + FailCount[Index] === CountList[Index]) {
                setIndex(Index => Index + 1)
                if (CountList.length <= Index) {
                    console.log("CountList.length: ", CountList.length)
                    setIsRunning(false) 
                    console.log("isRunning: ", isRunning)
                }
            }
        });
    }, isRunning ? delay : null);
    

    return (
        <div className="realtime-info">
            <button className="form-submit" onClick={ formSubmit }>START</button>
            &nbsp;{ NameList[Index] }&nbsp; { CorrectCount[Index] + FailCount[Index] } / { CountList[Index] }회
        </div>
    )
}

export default RealtimeInfo;