import React from 'react';
import "../css/Training/Training.css"
import IconTraining from "../images/icon_training.png"
import IconNextVideo from "../images/icon_next_video.png"
import PoseShoulder from "../images/pose_shoulder.png"
import NextPose from "../components/Training/NextPose";
import {MdReplay} from 'react-icons/md'

import myVideo from '../images/squatvideo.mp4'
import ReactPlayer from 'react-player'
import LeftBtn from '../images/menu_left.png';
import RightBtn from '../images/menu_right.png';
import { useAsync } from "react-async"

{/* 추후 makeyourset 에서 값받아오도록 수정 */}
const SET_ID = 1
const poseURL=`http://127.0.0.1:8000/api/pose_feed/${SET_ID}/`

const loadExerciseSet = async ({ set_id }) => {
    const res = await fetch(`http://127.0.0.1:8000/api/exerciseset/${set_id}/`)
    if (!res.ok) throw new Error(res)
    return res.json()
}

const Training = () => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadExerciseSet, set_id: SET_ID })
    if (data) {
        JSON.stringify(data)
        console.log(data)
    }

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
                <div className="next-pose-container">
                    <NextPose/>
                    <NextPose/>
                    <NextPose/>
                    <NextPose/>
                    <NextPose/>
                    <NextPose/>
                    <NextPose/>
                    <NextPose/>
                </div>
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
                <div className="export-video">
                        <ReactPlayer className="export"
                                     url={myVideo} loop muted playing controls />
                    </div>
                <div className="realtime-video">
                    <div className="user-video">
                        {/*IE에서 지원되지 않는 속성 포함*/}
                        {/* <img src="http://127.0.0.1:8000/api/pose_feed"></img> */}
                        <img src={poseURL}></img>
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