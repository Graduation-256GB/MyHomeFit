import React from 'react';
import "../css/Calender/Calender.css"
import IconCalender from "../images/icon_calender.png"
import FitCards from "../images/fitCards.JPG"

const Calender = () => {
    return (
        <div className="menu4-container">
            <div className="menu4-title">
                <div>
                    <h5>Gaok's Fit Card</h5>
                    <img src={IconCalender}/>
                </div>
                <svg width="100" height="100">
                    <circle cx="50" cy="50" r="50" fill="white"></circle>
                </svg>
            </div>
            <div className="menu4-small-title">
                <label>Hi Gaok, Check your Calender.</label>
            </div>

            <div className="calendar-content">
                <img src={FitCards} width="1300"/>
            </div>
        </div>
    );
};

export default Calender;