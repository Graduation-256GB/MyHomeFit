import React from 'react';
import "../css/Calender/Calender.css"
import IconCalender from "../images/icon_calender.png"
import FitCards from "../images/fitCards.JPG"
import calorieimg from "../images/calories.png"
import calendarimg from "../images/calendar.png"
import { FcCalendar } from "react-icons/fc";
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import Memo from '../components/Calendar/Memo';

const Calender = () => {
    const userImg=localStorage.getItem('userImg')
    const userName=localStorage.getItem('userName')
    return (
        <div className="menu4-container">
            <Navbar/>
            <div className="menu4-title">
                <div>
                    <h5>{userName}'s Fit Card</h5>
                    <div className="menu-icon">
                    <FcCalendar/>
                    </div>
                </div>
                <div>
                </div>
                <div className="user-img">
                            <img src={userImg}></img>
                </div>
            </div>
            <div className="menu4-small-title">
                <label>Hi { userName }, Check your Calender.</label>
            </div>

            <div className="calendar-container">
                <div className="calendar-content">
                    <Calendar activeMonth={new Date()} calendarType="US" />
                </div>
                <div className="calendar-box">
                    <div className="calendar-first-section">
                        <Memo/>
                    </div>
                    <div className="calendar-second-section">
                        
                        <div className="calorie-box">
                            <div className="calorie-user">
                            <div className="user-img">
                            <img src={userImg}></img>
                            </div>
                            <div>
                                {userName?userName:'user name'}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calender;