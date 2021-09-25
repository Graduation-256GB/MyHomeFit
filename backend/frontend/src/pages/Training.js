import React, { useEffect, useState } from 'react';
import {useRecoilValue, useRecoilState, RecoilRoot} from 'recoil';
import { setidState, setidGetter } from './state';

import "../css/Training/Training.css"
import IconTraining from "../images/icon_training.png"
import PoseShoulder from "../images/pose_shoulder.png"
import NextPose from "../components/Training/NextPose";
import { MdReplay } from 'react-icons/md'
import {AiFillCheckCircle} from 'react-icons/ai'
import {GrNotes} from 'react-icons/gr'
import {FaBalanceScale} from 'react-icons/fa'

import myVideo from '../images/squatvideo.mp4'
import ReactPlayer from 'react-player'
import LeftBtn from '../images/menu_left.png';
import RightBtn from '../images/menu_right.png';
import { useAsync } from "react-async"
import jQuery from 'jquery'
import axios from 'axios';
import RealtimeInfo from "../components/Training/RealtimeInfo";
import TrainingReady from "../components/Training/TrainingReady";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

{/* 추후 makeyourset 에서 값받아오도록 수정 */}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const loadExerciseSet = async ({ set_id }) => {
    const Token = localStorage.getItem('token')
    const res = await fetch(`http://127.0.0.1:8000/api/exerciseset/${set_id}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${Token}`
        }
    })
    if (!res.ok) throw new Error(res)
    return res.json()
}

const Training = () => {

    // 전역변수 사용
    // const [globalSetid, setGlobalSetid] = useRecoilState(setidState);
    // const [SET_ID, setSET_ID] = useState() 
    // console.log("test", {globalSetid})
    // setSET_ID({globalSetid})
    // useRecoilValue(setidState)
    // setSET_ID(globalSetid);
    // SET_ID = {globalSetid}

    // console.log("test", useRecoilState(setidState))

    // const SET_ID=6;
    // const [SETID, setSETID] = useState()
    // {Object.entries(localStorage).map((key, valueJSON) => {
    //     setSETID(JSON.parse(valueJSON))
    // })}
    //console.log("SETID", SETID)
    const SET_ID =  window.localStorage.getItem("setid")
    console.log("SET_ID", SET_ID)
    // const SET_ID = useRecoilState(setidState)
    // console.log(useRecoilState({setidState}))
    // console.log("트레이닝 전역변수 확인", SET_ID)
    
    // const poseURL=`http://127.0.0.1:8000/api/pose_feed/${SET_ID}/`

    const { data, error, isLoading } = useAsync({ promiseFn: loadExerciseSet, set_id: SET_ID })
    const [speed_num, setSpeedNum]=useState(14)
    const poseURL = `http://127.0.0.1:8000/api/pose_feed/?set_id=${SET_ID}&speed_num=${speed_num}`

    const csrftoken = getCookie('csrftoken');

    const Exercises = [];
    const [page, setPage] = useState(1);
    // const [speed, setSpeed] = useState('');
    const [IsStarted, setIsStarted] = useState(false)
    const [NameList, setNameList] = useState([])
    const [CountList, setCountList] = useState([])

    const [FailList, setFailList] = useState([0,0])
    const [SuccessList, setSuccessList] = useState([0,0])
    // const [FailSum, setFailSum] = useState(0)
    // const [SuccessSum, setSuccessSum]=useState(0)

    const [countSum, setCountSum] = useState(0)
    const [successSum, setSuccessSum] = useState(0) 

    useEffect (()=> {
        setSuccessSum( SuccessList.reduce((a,v) =>  a = a + v , 0 ) )
        setCountSum (CountList.reduce((a,v) =>  a = a + v , 0 ))
        console.log("success", successSum)
        console.log("count", countSum)
    }, [SuccessList, CountList])
    const percentage = 66;

    if (data) {
        Object.keys(data).forEach(function (key) {
            Exercises.push(data[key]);
            console.log(Exercises)
        });
    }

    // const [Index, setIndex] = useState(0)
    // useEffect(()=> {
    //     if (Index + 1 > Exercises.length){
    //         console.log(Index)
    //         console.log(Exercises.length)
    //         console.log(data.length)
    //         console.log("종료")
    //     }
    // }, [Index])

    return (
        <RecoilRoot>
        <div className="menu2-container">
            <div className="menu2-title">
                <div>
                    <h5>Gaok, R U Ready?</h5>
                    <img src={IconTraining}/>
                </div>
                <svg width="100" height="100">
                    <circle cx="50" cy="50" r="50" fill="white"></circle>
                </svg>
            </div>
            <div className="menu2-small-title">
                <label>Start your Fitness.</label>
            </div>
            {
                page === 1 &&
                <TrainingReady setPage={setPage} setSpeedNum={setSpeedNum}
                    setIsStarted={setIsStarted} setNameList={setNameList} setCountList={setCountList} 
                    exercises = { Exercises } csrftoken={csrftoken}/>}
            {
                page===2 &&
            <div className="videos">
                <img src={LeftBtn} className="left-button"/>
                <NextPose exercises = { Exercises }/>
                <img src={RightBtn} className="right-button"/>
                <div className="next-video">
                    <div className="next-video-label">
                        Next
                        <MdReplay/>
                    </div>
                    <div className="next-video-pose">
                        <img src={PoseShoulder}/>
                    </div>
                </div>
                <RealtimeInfo FailList={FailList} setFailList={setFailList} SuccessList={SuccessList} setSuccessList={setSuccessList} page={page} setPage={setPage} exercises={Exercises} setId = { SET_ID } IsStarted = { IsStarted } NameList={NameList} CountList={CountList}/>
                <div className="export-video">
                    <ReactPlayer className="export"
                                url={myVideo} loop muted playing controls />
                </div>
                <div className="realtime-video">
                    <div className="user-video">
                        <img src={ poseURL }></img>
                    </div>
                </div>
            </div>

            }

            {page == 3 && 
                <div className="training-result-wrapper">
                    <div className="result-title"><GrNotes size="40"/><label> Exercise List </label></div>
                    <div className="result-container">
                        <div className="result-list">

                            {Exercises.map(item => (
                                <div className="result-line"><AiFillCheckCircle size="30" className="result-check"/><label className="result-check-label">{item.name}</label></div>
                            ))}

                            
                        </div>
                        <div className="result-grade">
                        <div style={{ width: 300, height: 300 }}>
                            <CircularProgressbar value={ successSum==0 ?  parseInt( 1/countSum * 100 ) : parseInt(successSum/countSum * 100)} 
                                text={`${ successSum==0 ?  parseInt( 1/countSum * 100 ) : parseInt(successSum/countSum * 100)}%`} 
                                
                            />
                        </div>
                        </div>
                    </div>

                    <div className="result-footer">
                        <FaBalanceScale size="40"/>
                        <label className="result-fail">FailCount : {FailList.reduce((a,v) =>  a = a + v , 0 )}</label>
                        <label className="result-success">SuccessCount : {SuccessList.reduce((a,v) =>  a = a + v , 0 )}</label>
                    </div>

                </div>
            }
        </div>
        </RecoilRoot>
    );

};

export default Training;