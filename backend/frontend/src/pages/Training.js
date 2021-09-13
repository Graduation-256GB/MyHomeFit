import React, { useState } from 'react';
import "../css/Training/Training.css"
import IconTraining from "../images/icon_training.png"
import PoseShoulder from "../images/pose_shoulder.png"
import NextPose from "../components/Training/NextPose";
import { MdReplay } from 'react-icons/md'

import myVideo from '../images/squatvideo.mp4'
import ReactPlayer from 'react-player'
import LeftBtn from '../images/menu_left.png';
import RightBtn from '../images/menu_right.png';
import { useAsync } from "react-async"

{/* const GET_URL = 'http://127.0.0.1:8000/api/exercise/set/${setId}'
const GET_URL = 'http://127.0.0.1:8000/api/test/'*/}

{/* 추후 makeyourset 에서 값받아오도록 수정 */}
const SET_ID = 1

const loadExercises = async ({ set_id }) => {
    const res = await fetch(`http://127.0.0.1:8000/api/exercise/join/${set_id}/`)
    if (!res.ok) throw new Error(res)
    return res.json()
}

const Training = () => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadExercises, set_id: 1 })
    {/*if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`*/}
    if (data){
        JSON.stringify(data)
        console.log(data)
    }

    {/*
    fetch('http://127.0.0.1:8000/api/exercise/join/${SET_ID}/', {
        method: "GET",
        dataType: 'json',
        headers: {
            'accept': 'application/json',
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
                console.log(data)
            {/*Object.keys(data).forEach(function (key) {
                    if (data[key].set == SET_ID){
                        exerciseSetList.push(data[key]);
                        exerciseIdSet.add(data[key].exercise);
                        exerciseIdList.push(data[key].exercise);
                    }
                });
                exerciseSetList.sort((a, b) => a.set_num - b.set_num);
                console.log("exerciseSetList: ", exerciseSetList)
                console.log("exerciseIdSet: ", exerciseIdSet)
                console.log("exerciseIdList: ", exerciseIdList)
            }
        );*/}

    {/*const [Exercises, SetExercises] = useState([])*/}

    return (
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
            <div className="videos">
                <img src={LeftBtn} className="left-button"/>

                {/*<NextPose exercises = { data }/>*/}

                <img src={RightBtn} className="right-button"/>
                {/* <div className="set-name">
                    2 SET
                </div> */}
                <div className="next-video">
                    <div className="next-video-label">
                        Next
                        <MdReplay/>
                    </div>
                    <div className="next-video-pose">
                        <img src={PoseShoulder}/>
                    </div>
                </div>
                <div className="realtime-info">
                    Standing Knee Up 3/10 회
                </div>
                <div className="export-video">
                    <ReactPlayer className="export"
                                 url={myVideo} loop muted playing controls />
                </div>
                <div className="realtime-video">
                    <div className="user-video">
                        <img src="http://127.0.0.1:8000/api/pose_feed"></img>
                    </div>
                    {/* <div className="export-video">
                        <ReactPlayer className="export"
                                     url={myVideo} loop muted playing controls />
                    </div> */}
                </div>
            </div>
        </div>
    );

};

export default Training;