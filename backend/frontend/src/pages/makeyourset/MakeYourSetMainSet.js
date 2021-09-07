import React from 'react';
import { useMediaQuery } from "react-responsive";

import '../../css/MakeYourSet.css'
import IconSet from '../../images/icon_makeyourset.png';
import IconAddSet from '../../images/icon_add_set.png'
import IconStart from '../../images/icon_start.png'
import IconSquat from '../../images/icon_set_squat.png'
const MakeYourSetMainSet = (props) => {
    const isDesktopOrLaptop = useMediaQuery( {minDeviceWidth: 1224} )
    const isBigScreen = useMediaQuery({minDeviceWidth: 1824})
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})
    const isTabletOrMobileDevice = useMediaQuery({maxDeviceWidth: 1224})
    const isPortrait = useMediaQuery({orientation: 'portrait'})
    const isRetina = useMediaQuery({minResolution: '2dppx'})

    const exerciselist=["10회 반복", "5회 반복", "4회 반복", "2회 반복", "1회 반복"];

    return(
        <>
            <div className='set-scroll'>
                <div className='set-exercise-list'>
                    {exerciselist.map((exercise, index)=> (
                        <div>
                            <div className='set-exercise'>
                                <img src={IconSquat}></img>
                            </div>
                            <div><label>{exercise}</label></div>
                        </div>
                    ))}
            </div>
        </div>
    </>
    )

}

export default MakeYourSetMainSet;