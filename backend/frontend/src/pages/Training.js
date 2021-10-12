import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {useRecoilValue, useRecoilState, RecoilRoot} from 'recoil';
import { setidState, setidGetter } from './state';

import "../css/Training/Training.css"
import {AiFillCheckCircle} from 'react-icons/ai'
import {GrNotes} from 'react-icons/gr'
import {FaBalanceScale, FaCircleNotch} from 'react-icons/fa'

import { useAsync } from "react-async"
import jQuery from 'jquery'
import axios from 'axios';
import RealtimeInfo from "../components/Training/RealtimeInfo";
import TrainingReady from "../components/Training/TrainingReady";
import Navbar from '../components/Navbar';
import { MdReplay } from 'react-icons/md'

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

    const SET_ID =  window.localStorage.getItem("setid")

    const { data, error, isLoading } = useAsync({ promiseFn: loadExerciseSet, set_id: SET_ID })
    const [speed_num, setSpeedNum]=useState(4)
    const poseURL = `http://127.0.0.1:8000/api/pose_feed/?set_id=${SET_ID}&speed_num=${speed_num}`

    const csrftoken = getCookie('csrftoken');

    const Exercises = [];
    const [page, setPage] = useState(1)
    const [IsStarted, setIsStarted] = useState(false)
    const [NameList, setNameList] = useState([])
    const [CountList, setCountList] = useState([])
    const [ImageList, setImageList] = useState([])
    const [Title, setTitle] = useState('')
    const [Type, setType] = useState('')
    const userImg=localStorage.getItem('userImg')
    const userName=localStorage.getItem('userName')

    const [Index, setIndex] = useState(0)
    
    // 결과페이지 구현

    const [FailList, setFailList] = useState([0,0])
    const [SuccessList, setSuccessList] = useState([0,0])

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
    return (
        // <RecoilRoot>
            <div className="menu2-container">
                <Navbar/>
            {
                page === 1 &&
                <TrainingReady setPage={setPage} setSpeedNum={setSpeedNum}
                    setIsStarted={setIsStarted} setNameList={setNameList} setCountList={setCountList} 
                    exercises = { Exercises } csrftoken={csrftoken} setImageList={setImageList}/>}
            {
                page===2 &&
            <div className="videos">
                {/* <img src={LeftBtn} className="left-button"/>
                <NextPose exercises = { Exercises }/>
                <img src={RightBtn} className="right-button"/> */}
                {/*<div className="export-video">
                    <ReactPlayer className="export"
                                url={myVideo} loop muted playing controls />
                </div>*/}
                    <div className="training-note-container">
                {
                    (Index < CountList.length -1) &&
                    <div className="next-video">
                        <div className="next-video-label">
                            <span id="next-label">Next<MdReplay/></span>
                            <span id="next-name">
                                {NameList[Index+1]}       
                            </span>
                        </div>
                        <div className="next-video-pose">
                            <img src={ImageList[Index+1]}/>
                        </div>
                    </div>
                }
                    <RealtimeInfo  Index={Index} setIndex={setIndex} FailList={FailList} setFailList={setFailList} SuccessList={SuccessList} setSuccessList={setSuccessList} page={page} setPage={setPage} Exercises={Exercises} setId = { SET_ID } IsStarted = { IsStarted } NameList={NameList} CountList={CountList} ImageList={ImageList}/>
                </div>
                <div className="realtime-video">
                        <div className="user-video">
                         <ProgressBar variant="info" now={20} className="w-100 mb-2"/>
                        <img src={ poseURL }></img>
                            {/* <img src=""></img> */}
                            {/* <div className="count-icon">
                            <FaCircleNotch/>
                            </div> */}
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
        // </RecoilRoot>
    );

};

export default Training;