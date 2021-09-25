import React from 'react';
import "../css/Calender/Calender.css"
import IconCalender from "../images/icon_calender.png"
import FitCards from "../images/fitCards.JPG"
import { FcCalendar } from "react-icons/fc";

const Calender = () => {
    const userImg=localStorage.getItem('userImg')
    const userName=localStorage.getItem('userName')
    return (
        <div className="menu4-container">
            <div className="menu4-title">
                <div>
                    <h5>{userName}'s Fit Card</h5>
                    <div className="menu-icon">
                    <FcCalendar/>
                    </div>
                </div>
                <div className="user-img">
                            <img src={userImg}></img>
                        </div>
            </div>
            <div className="menu4-small-title">
                <label>Hi { userName }, Check your Calender.</label>
            </div>

            <div className="calendar-content">
                <img src={FitCards} width="1300"/>
            </div>
        </div>
    );
};

export default Calender;