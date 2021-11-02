import React, { useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {  setidState } from '../../pages/state';

import {BiAddToQueue} from 'react-icons/bi'
import '../../css/MakeYourSet/MakeYourSet.css'
import MakeYourSetExerciseList from './MakeYourSetExerciseList';
import IconStart from '../../images/icon_start.png'
import { FiEdit,FiTrash2 } from "react-icons/fi";

function MakeYourSetBlocks ({setArr}) {


    const [setid, setSetId]=useState(-1)   
    const [setTitle, setSetTitle]=useState('') 
    const [type, setType]=useState('') 
    const [isSelected, setSelected]=useState('')

    const Token = localStorage.getItem('token')

    const setTitleClicked = (id, title, type) => {
        {setSetId(id)}
        setSetTitle(title)
        setType(type)
        const setObj = { setid: id };
        window.localStorage.setItem("setid", id);
    }

    const [isSpeedMadalOn, setSpeedModalOn] = useState(false)
    const speedOnClicked = () => {
        setSpeedModalOn(!{isSpeedMadalOn})
    }

    const onDeleteSet = () => {
        const Token = localStorage.getItem('token')
        fetch(`http://127.0.0.1:8000/api/set/${setid}/delete/`, {
            headers: {'Authorization': `Token ${Token}`}
        })
        setSetId(-1)
        setSetTitle('')
        setType('')
    }

    const onEditeSet = () => {
        window.location.replace(`/makeyoursetedit/${setid}`);
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
                    <div className='set-management-update-icon' onClick={onEditeSet}>
                        <FiEdit/>
                    </div>
                    <div className='set-management-delete-icon' onClick={onDeleteSet}>
                        <FiTrash2/>
                    </div>
                </div>
                <div className='page-contents-set-tag'>
                    <label># {type}</label>
                </div>

                <div className='set-scroll'>

                    <MakeYourSetExerciseList setid={setid}/>

                </div>

                <a className='page-contents-btn-start' href="/training">
                    <img src={IconStart}/>
                    <label>START</label>
                </a>
            </div>
        </div>
    )
}

export default MakeYourSetBlocks;