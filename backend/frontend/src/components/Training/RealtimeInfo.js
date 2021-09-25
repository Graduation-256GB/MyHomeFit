import React, { useState, useEffect } from 'react';
import '../../css/Training/RealtimeInfo.css';
import { useInterval } from 'usehooks-ts'
import { MdDone, MdClear } from 'react-icons/md'

const RealtimeInfo = ( { setId, IsStarted, NameList, CountList, setIndex, Index } ) => {
    //const [Index, setIndex] = useState(0)
    const [FailList, setFailList] = useState([0,0])
    const [SuccessList, setSuccessList] = useState([0,0])
    const [FailCount, setFailCount] = useState(0)
    const [SuccessCount, setSuccessCount] = useState(0)
    const [delay, setDelay] = useState(2000); // GET 시간 간격
    const [isRunning, setIsRunning] = useState(false)
    //const [isOK, setIsOK] = useState(false)
    //const [Result, setResult] = useState("")
    const [ColorSuccess, setColorSuccess] = useState('#27cfb3')
    const [ColorFail, setColorFail] = useState('#27cfb3')
    

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
                setColorSuccess('blue')
                setColorFail('#27cfb3')
            }
            if( FailList[Index] !== FailCount ) {
                setFailCount(FailList[Index])
                setColorFail('red')
                setColorSuccess('#27cfb3')
            }

            if (SuccessList[Index] + FailList[Index] === CountList[Index]) {
                setIndex(Index => Index + 1)
            }
        });
    }, isRunning ? delay : null);
    

    return (
        <div>
            <div className="realtime-pose">
                { SuccessList[Index] + FailList[Index] } / { CountList[Index] }회 <br/> { NameList[Index] }
            </div>
            <div className="realtime-info-success" style={{backgroundColor: ColorSuccess}}>
                성공< MdDone />
                {/*{
                    isStarted && isOK &&
                    <div className="success_or_fail">
                        {Result}
                    </div>
                }*/}
            </div>
            <div className="realtime-info-fail" style={{backgroundColor: ColorFail}}>
                실패< MdClear />
            </div>
        </div>
    )
}

export default RealtimeInfo;