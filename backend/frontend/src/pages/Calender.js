import React, { useState, useEffect } from 'react';
import "../css/Calender/Calender.css"
import IconCalender from "../images/icon_calender.png"
import FitCards from "../images/fitCards.JPG"
import calorieimg from "../images/calories.png"
import calendarimg from "../images/calendar.png"
import { FcCalendar } from "react-icons/fc";
import Navbar from '../components/Navbar';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useAsync } from "react-async";

import TodoList from '../components/Calendar/TodoList/Todolist'
import moment from 'moment';
import { FcAlarmClock, FcLike } from "react-icons/fc";
import NumberFormat from 'react-number-format';


const Calender = () => {
    const userImg=localStorage.getItem('userImg')
    const userName=localStorage.getItem('userName')

    const SET_ID =  window.localStorage.getItem("setid")
    const ExerciseLogList = []
    const [TodayInfoList, setTodayInfoList] = useState([])
    const [MillisecondsList, setMillisecondsList] = useState([])

    useEffect(() => {
        const Token = localStorage.getItem('token')
        fetch(`http://127.0.0.1:8000/api/calendar/today/${SET_ID}/`, {
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
            Object.keys(data).forEach(function (key) {
                ExerciseLogList.push(data[key]);
                setTodayInfoList(TodayInfoList => [...TodayInfoList, (data[key].correct_count + data[key].fail_count) * data[key].calories]);
                const startDate = moment(data[key].time_started, "MM/DD/YYYY HH:mm:ss");
                const timeEnd = moment(data[key].time_finished, "MM/DD/YYYY HH:mm:ss");
                //console.log("startDate: ", startDate.format("MM/DD/YYYY HH:mm:ss"))
                //console.log("timeEnd: ", timeEnd.format("MM/DD/YYYY HH:mm:ss"))

                const diffMilliseconds = moment.duration(timeEnd.diff(startDate)).asMilliseconds();
                setMillisecondsList(MillisecondsList => [...MillisecondsList, diffMilliseconds])
            });
            console.log("ExerciseLogs: ", ExerciseLogList)
        });
    }, []);

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
                        {/* <Memo/> */}
                        <TodoList/>
                    </div>
                    <div className="calendar-second-section">
                        <div className="calorie-box">
                            <div className="calorie-user">
                                {/*<div className="user-img">
                                    <img src={userImg}></img>
                                </div>*/}
                                Calories Burned
                                <div className="calorie-info-icon"><FcLike/> &ensp;</div>
                            </div>
                            <div className="calorie-info">
                                    {/*{userName?userName:'user name'}*/}
                                    <NumberFormat value={TodayInfoList.reduce((a,v) =>  a = a + v , 0 )} displayType={'text'} thousandSeparator={true} suffix={' kcal'} />
                                </div>
                        </div>
                        <div className="calorie-box">
                            <div className="calorie-user">
                                Total Time <div className="calorie-info-icon"><FcAlarmClock/> &ensp;</div>
                            </div>
                            <div className="calorie-info">
                                { Math.floor((MillisecondsList.reduce((a,v) =>  a = a + v , 0 ) % (1000*60*60*24)) / (1000*60*60)) }
                                :{ ('00' + (Math.floor((MillisecondsList.reduce((a,v) =>  a = a + v , 0 ) % (1000*60*60)) / (1000*60))+"")).slice(-2) }
                                :{ ('00' + (Math.floor((MillisecondsList.reduce((a,v) =>  a = a + v , 0 ) % (1000*60)) / (1000))+"")).slice(-2) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calender;