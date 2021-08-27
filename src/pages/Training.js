import React from 'react';
import "../css/Training/Training.css"
import IconTraining from "../images/icon_training.png"
import IconNextVideo from "../images/icon_next_video.png"
import PoseShoulder from "../images/pose_shoulder.png"
import MenuUp from "../images/menu_up.png"
import NextPose from "../components/Training/NextPose";

import myVideo from '../images/squatvideo.mp4'
import ReactPlayer from 'react-player'

const Training = () => {
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
                <img src={MenuUp}/>
                <div className="next-video">
                    <div className="next-video-label">
                        Next<img src={IconNextVideo}/>
                    </div>
                    <div className="next-video-pose">
                        <img src={PoseShoulder}/>
                    </div>
                </div>
                <div className="realtime-video">
                    <div className="user-video">

                    </div>
                    <div className="export-video">
                        <ReactPlayer className="export"
                                     width="100%"
                                     height="100%"
                                     url={myVideo} loop muted playing controls />
                    </div>
                </div>
                <div className="next-pose">
                    <NextPose background_color="rgba(240, 237, 237, 0.4)"/>
                    <NextPose background_color="#b6f4ea"/>
                    <NextPose background_color="#b6f4ea"/>
                    <NextPose background_color="#b6f4ea"/>
                </div>
            </div>
        </div>
    );
};

export default Training;