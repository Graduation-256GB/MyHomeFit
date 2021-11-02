import React from 'react';
import jQuery from 'jquery'
import "../css/FitNotes/FitNotes.css"
import {FcCloseUpMode} from "react-icons/fc"
import FitnessRank from "../components/FitNotes/FitnessRank";
import UserRank from "../components/FitNotes/UserRank";
import SetRank from "../components/FitNotes/SetRank";
import Navbar from '../components/Navbar';

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
const loadNew3List = async () => {
    const Token = localStorage.getItem('token')
    const res = await fetch('http://127.0.0.1:8000/api/exercise/', {
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
    const userName=localStorage.getItem('userName')
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
                
            </div>
            <div className="menu3-small-title">
                <label>Hi { userName }, This is your FitNotes.</label>
            </div>

            <div className="fitnotes-fitness-container">
                <div className="rank-container">
                    <FitnessRank name="Top" loadRank={ loadTop3List}/>
                    <FitnessRank name="New" loadRank={ loadNew3List}/>
                </div>
                <div className="recommend-container">
                    <UserRank name="Monthly Ranking"/>
                </div>
                <div className="recommend-container">
                    <SetRank name="Set Ranking"/>
                </div>
            </div>
        </div>
    );
};

export default FitNotes;