import React, { useState, useEffect,useRef } from 'react';
import '../css/MakeYourSetForm/MakeYourSetForm.css';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { FcOpenedFolder } from 'react-icons/fc';
import SetListBlock from '../components/MakeYourSetForm/SetListBlock';
import ExerciseList from '../components/MakeYourSetForm/ExerciseList';
import SetForm from '../components/MakeYourSetForm/SetForm';
import jQuery from 'jquery'
import Navbar from '../components/Navbar';


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

const MakeYourSetForm = () => {
    const csrftoken = getCookie('csrftoken');
    const { data, error, isLoading } = useAsync({ promiseFn: loadExerciseList })
    const exerciseArr = [];
    const [newNum, setNewNum] = useState('0');
    const userImg=localStorage.getItem('userImg')
    const userName=localStorage.getItem('userName')

    const [formArr, setFormarr] = useState([
    ]);
    const ref = useRef();
    const nextId = useRef(0);

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    const formSubmit = e => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/exercise/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(formArr)
        })
        .then(res => res.json())
        .then(data => {
            if (data.key) {
                // localStorage.clear();
                // localStorage.setItem('token', data.key);
            } else {
                // setNewNum(data.set_id);
                window.location.replace('http://127.0.0.1:8000/makeyourset');
            }
        });
    }
    const addList = e => {
        const exerciseId = e.target.dataset.id
        const exerciseName = e.target.dataset.name
        const exerciseImg = e.target.dataset.img
        const exerciseRemove = e.target.dataset.remove

        if (exerciseId != null) {
            const exercise = {
                id:nextId.current,
                setId:newNum,
                exerciseId: exerciseId,
                name: exerciseName,
                img: exerciseImg,
                count: 10,
                remove:exerciseRemove
            }
            setFormarr(formArr.concat(exercise));
        }
        nextId.current += 1;
    }
    const removeList = (id) => {
        setFormarr(formArr.filter(exercise => exercise.id !== id));
    }
    const clickCount = (id,count) => {
        if (count === "up") {
            setFormarr(formArr.map(element =>
                element.id === id ? { ...element, count: parseInt(element.count) + 1 } : element))
        }else{
            setFormarr(formArr.map(element =>
                element.id === id ? { ...element, count: parseInt(element.count) - 1 } : element))
        }
    }
    const changeCount = (id,countValue) => {
        setFormarr(formArr.map(element =>
        element.id === id ? { ...element, count: element.count =countValue } : element))
    }
    if (data) {
        
        Object.keys(data).forEach(function (key) {
            exerciseArr.push(data[key]);
        });
    }
    return (
        <div className="content">
            <div className='page-wrapper'>
                <Navbar />
                    <div className='page-title'>
                        <div className="page-label">
                            <label>Only for you, { userName }</label>
                            <div className="menu-icon">
                            <FcOpenedFolder/>
                            </div>
                        </div>
                    </div>
                    <div className='page-small-title'>
                        <label>Make Your Fitness Set.</label>
                    </div> 
            </div>
            <div className="form-list-wrapper">
                <div className="content-form">
                    <h2>1. 세트 이름과 카테고리를 선택해주세요.</h2>
                    <SetForm setNewNum={setNewNum } csrftoken={csrftoken} />
                </div>
                <div className="content-list" id="list">
                    <h2>2. 운동을 선택해주세요.</h2>
                    <div className="list-wrapper">
                        <div className="left-arrow" onClick={()=>scroll(-80)}>
                        <FiChevronLeft/>
                        </div>
                        <div className="exercise-set-list" ref={ref}>
                            {
                                formArr.map(item => (
                                    <SetListBlock picture={item.img} name={item.name}
                                        count={item.count} removeList={removeList} id={item.id}
                                        clickCount={clickCount} changeCount={ changeCount}/>
                                ))
                            }
                        </div>
                        <div className="right-arrow" onClick={()=>scroll(80)}>
                        <FiChevronRight />
                        </div>
                    </div>
                    <ExerciseList exerciseArr={ exerciseArr } addList={addList} />
                    <button className="form-submit" onClick={ formSubmit}>세트 생성</button>
                </div>
            </div>
        </div>
    );

};

export default MakeYourSetForm;