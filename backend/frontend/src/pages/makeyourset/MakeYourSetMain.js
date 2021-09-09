import React, { useState } from 'react';
import { useMediaQuery } from "react-responsive";
import {BiAddToQueue} from 'react-icons/bi'

import MakeYourSetMainSet from '../makeyourset/MakeYourSetMainSet'
import '../../css/MakeYourSet.css'
import IconSet from '../../images/icon_makeyourset.png';
import IconAddSet from '../../images/icon_add_set.png'
import IconStart from '../../images/icon_start.png'
import IconSquat from '../../images/icon_set_squat.png'


    
const MakeYourSetMain = (props, setArr) => {
    const isDesktopOrLaptop = useMediaQuery( {minDeviceWidth: 1224} )
    const isBigScreen = useMediaQuery({minDeviceWidth: 1824})
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})
    const isTabletOrMobileDevice = useMediaQuery({maxDeviceWidth: 1224})
    const isPortrait = useMediaQuery({orientation: 'portrait'})
    const isRetina = useMediaQuery({minResolution: '2dppx'})

    const [blockname, setBlockname]=useState('여름 휴가 준비')
    const [isSelected, setSelected] = useState('여름 휴가 준비')

    return(
        <>
            <div id="trapezoid"></div>
            {props.name?<>
            <label className='center-set-name'>{blockname}</label>
            <div className='center-set-tag'>
                <label className='center-set-tag-name'>#상체 운동</label>
                <label className='center-set-tag-name'>#뱃살</label>
            </div>
            <div className='center-set-time-wrapper'>
                <label className='center-set-time-name'>예상 소요 시간 : </label>
                <label className='center-set-time-name'>00 : 00 : 00 </label>
            </div>
            
            <div className='page-center-wrapper'>
                <div className='page-block-container'>
                    {props.name? 
                    <>
                    <div className={isSelected=='가을 다이어트'? 'page-block-selected' : 'page-block-unselected'} onClick={()=>{setBlockname('가을 다이어트'); setSelected('가을 다이어트')}}>
                        <label>가을 다이어트</label>
                    </div>
                    <div className={isSelected=='개강 전 다이어트'? 'page-block-selected' : 'page-block-unselected'} onClick={()=>{setBlockname('개강 전 다이어트'); setSelected('개강 전 다이어트')}}>
                        <label>개강 전 다이어트</label>
                    </div>
                    <div className={isSelected=='여름 휴가 준비'? 'page-block-selected' : 'page-block-unselected'} onClick={()=>{setBlockname('여름 휴가 준비'); setSelected('여름 휴가 준비')}}>
                        <label>여름 휴가 준비</label>
                    </div>
                    </> : <></>}
                    
                    <a className='page-block' href="/makeyoursetform">
                        <label>세트 추가하기</label>
                        <BiAddToQueue/>
                    </a>
                </div>
                <MakeYourSetMainSet/>
    </div>
    <a className='start-btn' href="/training">
        <div><img src={IconStart}></img></div>
        <label>Start</label>
    </a> 
    
    </>: 
    
    <>
        {/* <label className='notExist-set-label'>Make Your First Fitness Set.</label> */}
        <div className='page-center-wrapper'>
                <div className='page-block-container'>
                    <a className='page-block' href="/makeyoursetform">
                        <label>세트 추가하기</label>
                        <img src={IconAddSet}/>
                    </a>
                </div>
        </div>
    </>}

    </>
    )

}

export default MakeYourSetMain;