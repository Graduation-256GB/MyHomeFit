import React, { useState, useEffect } from 'react';
import {useRecoilValue, useRecoilState, RecoilRoot} from 'recoil';
import { setidState, setidGetter } from './state';

import "../css/Training/Training.css"
import IconTraining from "../images/icon_training.png"
import PoseShoulder from "../images/pose_shoulder.png"
import NextPose from "../components/Training/NextPose";
import { FcSportsMode } from "react-icons/fc";

import myVideo from '../images/squatvideo.mp4'
import ReactPlayer from 'react-player'
import LeftBtn from '../images/menu_left.png';
import RightBtn from '../images/menu_right.png';
import { useAsync } from "react-async"
import jQuery from 'jquery'
import axios from 'axios';
import RealtimeInfo from "../components/Training/RealtimeInfo";
import TrainingReady from "../components/Training/TrainingReady";
import Navbar from '../components/Navbar';
import { MdReplay } from 'react-icons/md'


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
    // console.log("SET_ID", SET_ID)
    // const SET_ID = useRecoilState(setidState)
    // console.log(useRecoilState({setidState}))
    // console.log("트레이닝 전역변수 확인", SET_ID)
    
    // const poseURL=`http://127.0.0.1:8000/api/pose_feed/${SET_ID}/`

    const { data, error, isLoading } = useAsync({ promiseFn: loadExerciseSet, set_id: SET_ID })
    const [speed_num, setSpeedNum]=useState(4)
    const poseURL = `http://127.0.0.1:8000/api/pose_feed/?set_id=${SET_ID}&speed_num=${speed_num}`

    const csrftoken = getCookie('csrftoken');

    const Exercises = [];
    const [page, setPage] = useState(1);
    // const [speed, setSpeed] = useState('');
    const [IsStarted, setIsStarted] = useState(false)
    const [NameList, setNameList] = useState([])
    const [CountList, setCountList] = useState([])
    const [ImageList, setImageList] = useState([])
    const [Index, setIndex] = useState(0)
    const userImg=localStorage.getItem('userImg')
    const userName=localStorage.getItem('userName')

    const [Index, setIndex] = useState(0)
    // const [datalength, setDataLength] = useState(0)
    // const [isFinished, setIsFinished] = useState(false)
    // const [isResult, setIsResult] = useState(0)
    
    // 결과페이지 구현

    if (data) {
        // setDataLength(data.length)
        // console.log("length", datalength)
        Object.keys(data).forEach(function (key) {
            Exercises.push(data[key]);
        });
        // console.log("true", isFinished)
        // setIsFinished(true)
    }
    return (
        <RecoilRoot>
            <div className="menu2-container">
                <Navbar/>
            <div className="menu2-title">
                <div>
                    <h5>{ userName }, R U Ready?</h5>
                    <div className="menu-icon">
                    <FcSportsMode />
                    </div>
                </div>
                <div className="user-img">
                            <img src={userImg}></img>
                        </div>
            </div>
            <div className="menu2-small-title">
                <label>Start your Fitness.</label>
            </div>
            {
                page === 1 &&
                <TrainingReady setPage={setPage} setSpeedNum={setSpeedNum}
                    setIsStarted={setIsStarted} setNameList={setNameList} setCountList={setCountList} 
                    exercises = { Exercises } csrftoken={csrftoken} setImageList={setImageList}/>}
            {
                page===2 &&
            <div className="videos">
                <img src={LeftBtn} className="left-button"/>
                <NextPose exercises = { Exercises }/>
                <img src={RightBtn} className="right-button"/>
                <RealtimeInfo  setId = { SET_ID } Index={Index} setIndex={setIndex} IsStarted = { IsStarted } NameList={NameList} CountList={CountList} ImageList={ImageList}/>
                {/*<div className="export-video">
                    <ReactPlayer className="export"
                                url={myVideo} loop muted playing controls />
                </div>*/}
                {
                (Index < CountList.length -1) &&
                <div className="next-video">
                    <div className="next-video-label">
                        Next
                        <MdReplay/>
                    </div>
                    <div className="next-video-pose">
                        <img src={ImageList[Index+1]}/>
                    </div>
                </div>
                }
                <div className="realtime-video">
                    <div className="user-video">
                        <img src={ poseURL }></img>
                    </div>
                </div>
            </div>
            }
            { page === 3 &&
            <div>
                결과 페이지
            </div>
            
            }
        </div>
        // </RecoilRoot>
    );

};

export default Training;