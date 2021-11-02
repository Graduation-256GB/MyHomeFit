import React, { useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import { setidGetter, setidState } from '../../pages/state';

import {BiAddToQueue} from 'react-icons/bi'
import '../../css/gaok/MakeYourSet.css'
import MakeYourSetExerciseList from './MakeYourSetExerciseList';
import IconStart from '../../images/icon_start.png'
import { Modal } from 'antd';
import ModalTest from './ModalTest'

import { FcEmptyTrash } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";

function MakeYourSetBlocks ({setArr}) {

    // 전역변수 사용
    const [globalSetid, setGlobalSetid] = useRecoilState(setidState);
    
    //console.log("recoilvalue", useRecoilState(setidState))
    

    const [setid, setSetId]=useState(-1)   // 선택한 블럭의 set_id 저장 
    const [setTitle, setSetTitle]=useState('') // 선택한 블럭의 set 이름 저장
    const [type, setType]=useState('') // 선택한 블럭의 set 타입 저장
    const [isSelected, setSelected]=useState('') // 블럭 선택 유무 상태 저장 

    const Token = localStorage.getItem('token')

    const setTitleClicked = (id, title, type) => {
        //console.log("start")
        {setSetId(id)}
        setSetTitle(title)
        setType(type)
        // setGlobalSetid(id)
        // console.log("전역변수 확인",{globalSetid})
        const setObj = { setid: id };
        window.localStorage.setItem("setid", id);
        //console.log("test", window.localStorage.getItem("setid"))
    }

    // 속도 선택 모달 만들기
    const [isSpeedMadalOn, setSpeedModalOn] = useState(false)
    const speedOnClicked = () => {
        setSpeedModalOn(!{isSpeedMadalOn})
    }

    // 세트 삭제
    const onDeleteSet = () => {
        const Token = localStorage.getItem('token')
        fetch(`http://127.0.0.1:8000/api/set/${setid}/delete/`, {
            headers: {'Authorization': `Token ${Token}`}
        })
        setSetId(-1)
        setSetTitle('')
        setType('')
    }

    // 세트 수정 페이지 이동
    const onEditeSet = () => {
        window.location.replace(`http://127.0.0.1:8000/makeyoursetedit/${setid}`);
    }

    return(
        <div className='page-center-container'>
            <div className='page-block-wrapper'>
                <div className='block-container'>
                    <div id="trapezoid"></div>
                    <div id="block-wrapper">
                        <a className='page-block-selected' href="/makeyoursetform">
                            <label>세트 추가하기</label>
                            <BiAddToQueue className='page-block-icon'/>
                        </a>
                        {setArr.map(item => (
                            <div className={isSelected == item.id ? 'page-block-selected' : 'page-block-unselected'}
                                onClick={() => { setTitleClicked(item.id, item.title, item.type); setSelected(item.id) }}>
                                <label>{item.title}</label>
                            </div> 
                        ))}
                    </div>
                </div>
            </div>
            <div className='page-contents-wrapper'>
                
                <div className='page-contents-set-title'>
                    <label>{setTitle}</label>
                </div>
                <div className='page-contents-set-tag'>
                    <label># {type}</label>
                </div>
                <div className='page-contents-set-time'>
                </div>

                <div className='set-scroll'>

                    <MakeYourSetExerciseList setid={setid}/>

                </div>
                
                {
                    // (setid !== -1) &&
                        <div className='set-management-container'>
                            <div className='set-management-update-icon' onClick={onEditeSet}>
                                <FaEdit/>
                            </div>
                            <div className='set-management-delete-icon' onClick={onDeleteSet}>
                                <FcEmptyTrash/>
                            </div>
                        </div>
                }

                <a className='page-contents-btn-start' href="/training">
                    <img src={IconStart}/>
                    <label>START</label>
                </a>
                {/* <a className='page-contents-btn-start'>
                    <img src={IconStart}/>
                    <label>START</label>
                </a> */}
                {/* <button onClick={speedOnClicked}>Modal</button>
                {isSpeedMadalOn && (
                    <ModalTest speedOnClicked={speedOnClicked} />
                )} */}
            </div>
        </div>
    )
}

export default MakeYourSetBlocks;