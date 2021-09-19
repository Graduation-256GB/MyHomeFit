import React, { useState } from 'react';
import { useMediaQuery } from "react-responsive";
import {BiAddToQueue} from 'react-icons/bi'

import '../../css/gaok/MakeYourSet.css'
import MakeYourSetExerciseList from './MakeYourSetExerciseList';

function MakeYourSetBlocks ({setArr}) {
    const isDesktopOrLaptop = useMediaQuery( {minDeviceWidth: 1224} )
    const isBigScreen = useMediaQuery({minDeviceWidth: 1824})
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})
    const isTabletOrMobileDevice = useMediaQuery({maxDeviceWidth: 1224})
    const isPortrait = useMediaQuery({orientation: 'portrait'})
    const isRetina = useMediaQuery({minResolution: '2dppx'})

    const [setid, setSetId]=useState(1)   // 선택한 블럭의 set_id 저장 
    const [setTitle, setSetTitle]=useState('') // 선택한 블럭의 set 이름 저장

    const addSet = e => {
        window.location.replace('http://127.0.0.1:8000/makeyoursetform');
    }

    const startSet = e => {
        window.location.replace('http://127.0.0.1:8000/training');
    }

    const setTitleClicked = (id, title) => {
        console.log("start")
        {setSetId(id)}
        console.log("aaaaa")
        setSetTitle(title)
    }
   
    return(
        <div className='page-center-container'>
            <div className='page-block-wrapper'>
                <div className='block-container'>
                    <div id="trapezoid"></div>
                    <div id="block-wrapper">
                        <div className='page-block-selected' onClick={ addSet }>
                            <label>세트 추가하기</label>
                            <BiAddToQueue className='page-block-icon'/>
                        </div>
                    
                        {setArr.map(item => (
                            <div className='page-block-selected' onClick={ () => setTitleClicked(item.id, item.title) }>
                                {/* {item.id} */}
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
                    <label>세트 태그</label>
                </div>
                <div className='page-contents-set-time'>
                    <label>예상 소요 시간 : </label>
                    <label>00:00:00</label>
                </div>

                <div className='set-scroll'>

                    <MakeYourSetExerciseList setid={setid}/>

                </div>
                <div className='page-contents-btn-start' onClick={ startSet }>
                    <label>START</label>
                </div>

            </div>
        </div>
    )
}

export default MakeYourSetBlocks;