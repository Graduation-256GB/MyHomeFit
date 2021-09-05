import React, { useState, useEffect } from 'react';
import '../css/MakeYourSet/MakeYourSetForm.css';
import IconSet from '../images/icon_makeyourset.png';
import SendIcon from '../images/url_send.png';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import {BiAddToQueue} from 'react-icons/bi'
import ListBlock from '../components/MakeYourSet/ListBlock';
import jQuery from 'jquery'
import SquatImg from '../images/squat.png';

import { useAsync } from "react-async"

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

const loadExerciseList = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/exercise/')
    if (!res.ok) throw new Error(res)
    return res.json()
}

const MakeYourSetForm = () => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadExerciseList })
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    var csrftoken = getCookie('csrftoken');
    const arr = [];

    const onSubmit = e => {
            e.preventDefault();

            const set = {
                title: title,
                type: type
            };

            fetch('http://127.0.0.1:8000/api/set/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(set)
            })
            .then(res => res.json())
            .then(data => {
                if (data.key) {
                    // localStorage.clear();
                    // localStorage.setItem('token', data.key);
                    window.location.replace('http://127.0.0.1:8000/makeyourset');
                } else {
                    setTitle('');
                    setType('');
                    // localStorage.clear();
                }
            });
    };
    const leftArrowClick = e => {
    }
    const rightArrowClick = e => {
    }

    // if (isLoading) return "Loading..."
    // if (error) return `Something went wrong: ${error.message}`
    if (data) {
        
        Object.keys(data).forEach(function (key) {
            arr.push(data[key]);
        });
    }
    return (
        <div className="content">
            <div className="menu1-wrapper">
                <div className="form-menu-container">
                    <div className="menu1-title">
                        <div>
                            <h5>Only for you, Gaok</h5>
                            <img src={IconSet} />
                        </div>

                        <svg width="100" height="100">
                            <circle cx="50" cy="50" r="50" fill="white"></circle>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="content-form">
                <h2>First Step : Make Your Fitness Set.</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-box">
                        <div className="label-box">
                            <label htmlfor="set-title">Title</label>
                            <label htmlfor="set-type">Category</label>  
                        </div>
                        <div className="input-box">
                            <input type="text"
                                name="set-title"
                                value={title}
                                required
                                onChange={e => setTitle(e.target.value)} />
                            <select name="set-type"
                            value={type}
                            required
                            onChange={e => setType(e.target.value)}>
                                <option value="" selected>선택</option>
                                <option value="upperbody">상체 운동</option>
                                <option value="lowerbody">하체 운동</option>
                                <option value="other">기타</option>
                            </select>
                        </div>
                    </div>
                    <input type="submit" value="Next Step" className="set-submit" />
                </form>
            </div>
            <div className="content-list">
                <h2>Second Step : Choose Exercises.</h2>
                <div className="list-wrapper">
                    <div className="left-arrow" name="left-arrow" onClick={ leftArrowClick }>
                    <FiChevronLeft/>
                    </div>
                    <div className="exercise-set-list">
                        <ListBlock name="Squat" />
                        <ListBlock name="Squat" />
                        <ListBlock name="Squat" />
                        <ListBlock name="Squat" />
                        <ListBlock name="Squat" />
                        <ListBlock name="Squat" />
                        <ListBlock name="Squat" />
                        <ListBlock name="Squat" />
                        <ListBlock name="Squat" />
                    </div>
                    <div className="right-arrow" name="right-arrow" onClick={ rightArrowClick }>
                    <FiChevronRight />
                    </div>
                </div>
                <div className="exercise-list">
                    {
                        arr.map(item => (
                        <div className="exercise-box">
                            <div className="exercise-hover">
                                <BiAddToQueue/>
                            </div>
                            <div className="exercise-img">
                                <img src={item.img}></img>
                            </div>
                        <div className="exercise-title">{item.name}</div>
                    </div>
                        ))}
                    <div className="exercise-box">
                        <div className="exercise-hover">
                            <BiAddToQueue/>
                        </div>
                        <div className="exercise-img">
                            <img src={SquatImg}></img>
                        </div>
                        <div className="exercise-title">Squat</div>
                    </div>
                    
                </div>
                <button className="form-submit">Make Set</button>
            </div>
        </div>
    );

};

export default MakeYourSetForm;