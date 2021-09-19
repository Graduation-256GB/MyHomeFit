import React, { useState, useEffect,useRef } from 'react';
import '../css/MakeYourSetForm/MakeYourSetForm.css';
import IconSet from '../images/icon_makeyourset.png';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import SetListBlock from '../components/MakeYourSetForm/SetListBlock';
import ExerciseList from '../components/MakeYourSetForm/ExerciseList';
import SetForm from '../components/MakeYourSetForm/SetForm';
import jQuery from 'jquery'

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
    const [newNum,setNewNum] = useState('0');
    // const [countList, setCount] = useState([
    //     // {
    //     //     id: 0,
    //     //     count:1
    //     // },
    //     // {
    //     //     id: 1,
    //     //     count:2
    //     // }
    // ]);
    const [formArr, setFormarr] = useState([
        // {
        // setId:newNum,
        // id:'1',
        // name:'Squat',
        // img: '/static/media/squat.a09ebb93.png',
        // count: count
        // }
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
                window.location.replace('http://127.0.0.1:8000/new/makeyourset');
            }
        });
    }
    const addList = e => {
        const exerciseId = e.target.dataset.id   //exercise id
        const exerciseName = e.target.dataset.name
        const exerciseImg = e.target.dataset.img
        const exerciseRemove = e.target.dataset.remove
        //const countNum=count.find(item=>item.id===parseInt(exerciseId)? true:false)

        console.log(exerciseId)
        if (exerciseId != null) {
            // const count = {
            // id: nextId.current,
            // count:10
            // }
            const exercise = {
                id:nextId.current,
                setId:newNum,
                exerciseId: exerciseId,
                name: exerciseName,
                img: exerciseImg,
                count: 10,
                remove:exerciseRemove
            }
            // setCount(countList.concat(count));
            setFormarr(formArr.concat(exercise));
        }
        nextId.current += 1;
        console.log(formArr)
    }
    const removeList = (id) => {
        // console.log(e.target.dataset.remove)
        // e.target.dataset.remove='true'
        // console.log(e.target.dataset.remove)
        setFormarr(formArr.filter(exercise => exercise.id !== id));
    }
    const clickCount = (id,count) => {
        // setCount(count - 1);
        console.log(count)
        // setCount(countList.map(element =>
        //     element.id === id ? {...element,count:element.count+=1} : element))
        // // const countNum=count.find(item=>item.id===parseInt(exerciseId)? true:false)
        if (count === "up") {
            setFormarr(formArr.map(element =>
                element.id === id ? { ...element, count: parseInt(element.count) + 1 } : element))
        }else{
            setFormarr(formArr.map(element =>
                element.id === id ? { ...element, count: parseInt(element.count) - 1 } : element))
        }
        // console.log(countList)
    }
    const changeCount = (id,countValue) => {
        console.log(countValue)
        setFormarr(formArr.map(element =>
        element.id === id ? { ...element, count: element.count =countValue } : element))
        // console.log(countList)
    }
    // if (isLoading) return "Loading..."
    // if (error) return `Something went wrong: ${error.message}`
    if (data) {
        
        Object.keys(data).forEach(function (key) {
            exerciseArr.push(data[key]);
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
                <SetForm setNewNum={setNewNum } csrftoken={csrftoken} />
            </div>
            <div className="content-list">
                <h2>Second Step : Choose Exercises.</h2>
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
                <button className="form-submit" onClick={ formSubmit}>Make Set</button>
            </div>
        </div>
    );

};

export default MakeYourSetForm;