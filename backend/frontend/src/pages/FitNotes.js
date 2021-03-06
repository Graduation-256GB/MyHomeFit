import React, { useState, useEffect,useRef } from 'react';
import jQuery from 'jquery'
import { useAsync } from "react-async"
import "../css/FitNotes/FitNotes.css"
import {FcCloseUpMode} from "react-icons/fc"
import FitnessRank from "../components/FitNotes/FitnessRank";
import RecommendFitness from "../components/FitNotes/RecommendFitness";
import FitnessCalories from "../components/FitNotes/FitnessCalories";
import Navbar from '../components/Navbar';
import person1 from "../images/person1.PNG";
import person2 from "../images/person2.PNG";
import person3 from "../images/person3.PNG";
import person4 from "../images/person4.PNG";
import person5 from "../images/person5.PNG";
import person6 from "../images/person6.PNG";

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

const loadTop3List = async () => {
    const Token = localStorage.getItem('token')
    const res = await fetch('http://127.0.0.1:8000/api/exercise/top/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${Token}`
        }
    })
    if (!res.ok) throw new Error(res)
    return res.json()
}
const FitNotes = () => {
    const csrftoken = getCookie('csrftoken');
    const { data, error, isLoading } = useAsync({ promiseFn: loadTop3List })
    const top3ListArr = [];
    const userImg=localStorage.getItem('userImg')
    const userName=localStorage.getItem('userName')
    const nameList1 = ["k8jisoo", "Ga-ok", "sungeuni0208"]
    const nameList2 = ["Sungeun Choi", "Gaok Lee", "JiSu Kim"]
    const imgList1 = [person1, person2, person3]
    const imgList2 = [person4, person5, person6]
    if (data) {
        Object.keys(data).forEach(function (key) {
            top3ListArr.push(data[key]);
        });
        console.log(top3ListArr)
    }
    return (
        <div className="menu3-container">
            <Navbar/>
            <div className="menu3-title">
                <div className="page-label">
                    <h5>Welcome, { userName}</h5>
                    <div className="menu-icon">
                        <FcCloseUpMode/>
                    </div>
                </div>
                <div className="user-img">
                            <img src={userImg}></img>
                        </div>
            </div>
            <div className="menu3-small-title">
                <label>Hi { userName }, This is your FitNotes.</label>
            </div>

            <div className="fitnotes-fitness-container">
                <div>
                    <FitnessRank name="Top" array={ top3ListArr}/>
                    <FitnessCalories/>
                </div>
                <div className="recommend-container">
                    <RecommendFitness name="Monthly Ranking" nameList={nameList1} imgList={imgList1}/>
                </div>
{/* 
                <div className="recommend-container">
                    <RecommendFitness name="Weekly Ranking" nameList={nameList2} imgList={imgList2}/>
                </div> */}
            </div>
        </div>
    );
};

export default FitNotes;