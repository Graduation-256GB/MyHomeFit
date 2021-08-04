import React from 'react';
import '../css/MakeYourSet/MakeYourSet.css';
import IconSet from '../images/icon_makeyourset.png';
import SendIcon from '../images/url_send.png';
import PreviewImg from '../images/running2.png';
import StretchImg from '../images/stretch.png';
import SquatImg from '../images/squat.png';
import LeftBtn from '../images/menu_left.png';
import RightBtn from '../images/menu_right.png';

import SetBox from "../components/MakeYourSet/SetBox";
import ListBlock from '../components/MakeYourSet/ListBlock';
import axios from "axios";

import {useAsync} from "react-async"

const loadPost=async()=>{
    const res=await fetch('http://127.0.0.1:8000/api/users/')
    if(!res.ok) throw new Error(res)
    return res.json()
}
const state={
    exercises:[]
};

// const componentDidMount=()=>{
//     this.refreshList()
// }
// const refreshList=()=>{
//     axios
//     .get('http://127.0.0.1:8000/api/users/')
//     .then((res)=>console.log(res.data))
//     .catch((err)=>console.log(err))
// }
const MakeYourSet = () => {
    const { data, error, isLoading } = useAsync({promiseFn: loadPost})
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data)
    return (
        <div className="content">
            <div className="menu1-wrapper">
                <div className="menu1-container">
                    <div className="menu1-title">
                        <div>
                            <h5>Only for you, Gaok</h5>
                            <img src={IconSet}/>
                        </div>

                        <svg width="100" height="100">
                            <circle cx="50" cy="50" r="50" fill="white"></circle>
                        </svg>
                    </div>
                    <div className="menu1-small-title">
                        <label>Enter Fitness Youtube Video URL.</label>
                    </div>
                        <div className="url-container">
                            <label>URL</label>
                            <input className="url-input"></input>
                            <img src={SendIcon} className="url-button"
                            onClick={(e)=>{
                            }}></img>
                        </div>
                    </div>
                    <div id="trapezoid"></div>
                    <label>Make Your Fitness Set.</label>
            </div>
            <div className="block-box">
                <SetBox name="Squat"/>
                <SetBox name="Squat"/>
                <SetBox name="Squat"/>
                <SetBox name="Squat"/>
                <SetBox name="Squat"/>
    
            </div>
            <div className="list-wrapper">
                <div className="btn-left"><img src={LeftBtn}></img></div>
                <div className="exercise-list">    
                    <ListBlock name="Squat"/>
                    <ListBlock name="Squat"/>
                    <ListBlock name="Squat"/>
                    <ListBlock name="Squat"/>
                </div>
                <div className="btn-right"><img src={RightBtn}></img></div>
                </div>
            <div className="time-box">
                <div>총 6개의 동작 추출</div><br/>
                <div>예상 소요 시간: 00:20:00</div>
            </div>
            <div>
                {JSON.stringify(data)}
            </div>
        </div>
    );
};

export default MakeYourSet;