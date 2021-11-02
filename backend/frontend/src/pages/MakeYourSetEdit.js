import React, { useState, useEffect,useRef } from 'react';
import '../css/MakeYourSetForm/MakeYourSetForm.css';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { FcOpenedFolder } from 'react-icons/fc';
import SetListBlock from '../components/MakeYourSetForm/SetListBlock';
import ExerciseList from '../components/MakeYourSetForm/ExerciseList';
import SetEdit from '../components/MakeYourSetEdit/SetEdit';
import jQuery from 'jquery'
import Navbar from '../components/Navbar';
import axios from 'axios';

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

const MakeYourSetEdit = ({match}) => {
    const csrftoken = getCookie('csrftoken');
    const exerciseArr = [];
    const [exerciseList, SetexerciseList] = useState({ data: null });
    const userImg=localStorage.getItem('userImg')
    const userName=localStorage.getItem('userName')
    const [formArr, setFormarr] = useState([]);
    const ref = useRef();
    const nextId = useRef(0);

    const setid = match.params.setid
    const exercisesetArr = [];
    const [exercisesetList, SetexercisesetList] = useState({ data: null });
    const [userSetTitle, setuserSetTitle] = useState({ title: null })
    const [Title, setTitle] = useState('')

    const Token = localStorage.getItem('token')
    useEffect(() => {
        const fetchData = async () => {
            const exerciselist = await axios.get(
                'http://127.0.0.1:8000/api/exercise/', {
                    headers: {
                        Authorization: `Token ${Token}`
                    }
            });
            const exercisesetlist = await axios.get(
                `http://127.0.0.1:8000/api/exerciseset/${setid}/`, {
                    headers: {
                        Authorization: `Token ${Token}`
                    }
            });
            SetexerciseList({ data: exerciselist.data });
            SetexercisesetList({ data: exercisesetlist.data });
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (exercisesetList.data) {
            Object.keys(exercisesetList.data).forEach(function (key) {
                exercisesetArr.push(exercisesetList.data[key]);
            });
        }
    }, [exercisesetList.data]);
    
    useEffect(() => {
        if (0 < exercisesetArr.length) {
            exercisesetArr.map(item => {
                setFormarr(Formarr => [...Formarr, item]);
            })
        }
    }, [exercisesetArr]);

    useEffect(() => {
        if (0 < formArr.length) {
            formArr.map(item => {
                setuserSetTitle({ title: item.set_title })
            })
        }
    }, [formArr]);

    useEffect(() => {
        if (userSetTitle) {
            setTitle(userSetTitle.title)
        }
    }, [userSetTitle]);

    if (exerciseList.data) {
        Object.keys(exerciseList.data).forEach(function (key) {
            exerciseArr.push(exerciseList.data[key]);
        });
    }

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    const formSubmit = e => {
        e.preventDefault();

        fetch(`http://127.0.0.1:8000/api/exercise/${setid}/update/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(formArr)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.key) {
                window.location.replace('http://127.0.0.1:8000/makeyourset');
            }
        });
    }
    const addList = e => {
        const exerciseId = e.target.dataset.id
        const exerciseName = e.target.dataset.name
        const exerciseImg = e.target.dataset.img
        const exerciseRemove = e.target.dataset.remove

        console.log(exerciseId)
        if (exerciseId != null) {
            const exerciseset = {
                id: nextId.current,
                exercise: exerciseId,
                name: exerciseName,
                img: exerciseImg,
                set_count: 10,
                remove:exerciseRemove
            }
            setFormarr(formArr.concat(exerciseset));
        }
        nextId.current += 1;
    }
    const removeList = (id) => {
        setFormarr(formArr.filter(exercise => exercise.id !== id));
    }
    const clickCount = (id,set_count) => {
        if (set_count === "up") {
            setFormarr(formArr.map(element =>
                element.id === id ? { ...element, set_count: parseInt(element.set_count) + 1 } : element))
        }else{
            setFormarr(formArr.map(element =>
                element.id === id ? { ...element, set_count: parseInt(element.set_count) - 1 } : element))
        }
    }
    const changeCount = (id,countValue) => {
        setFormarr(formArr.map(element =>
        element.id === id ? { ...element, set_count: element.set_count =countValue } : element))
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
                        <label>Edit Your Fitness Set.</label>
                    </div> 
            </div>
            <div className="form-list-wrapper">
                <div className="content-form">
                    <h2>1. 세트 이름과 카테고리를 선택해주세요.</h2>
                    <SetEdit setid={ setid } Title={ Title } csrftoken={ csrftoken } />
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
                                        count={item.set_count} removeList={removeList} id={item.id}
                                        clickCount={clickCount} changeCount={ changeCount}/>
                                ))
                            }
                        </div>
                        <div className="right-arrow" onClick={()=>scroll(80)}>
                        <FiChevronRight />
                        </div>
                    </div>
                    <ExerciseList exerciseArr={ exerciseArr } addList={addList} />
                    <button className="form-submit" onClick={ formSubmit}>목록 수정</button>
                </div>
            </div>
        </div>
    );

};

export default MakeYourSetEdit;