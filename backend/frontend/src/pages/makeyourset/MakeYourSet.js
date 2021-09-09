import React, {useState} from 'react';
import { useMediaQuery } from "react-responsive";

import MakeYourSetMain from './MakeYourSetMain';
import '../../css/MakeYourSet.css'
import IconSet from '../../images/icon_makeyourset.png';
import IconAddSet from '../../images/icon_add_set.png'
import IconStart from '../..//images/icon_start.png'
import IconSquat from '../../images/icon_set_squat.png'
import { useAsync } from "react-async"


const loadSetList = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/set/list/')
    if (!res.ok) throw new Error(res)
    return res.json()
    
}

const MakeYourSet = () => {
    const isDesktopOrLaptop = useMediaQuery( {minDeviceWidth: 1224} )
    const isBigScreen = useMediaQuery({minDeviceWidth: 1824})
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})
    const isTabletOrMobileDevice = useMediaQuery({maxDeviceWidth: 1224})
    const isPortrait = useMediaQuery({orientation: 'portrait'})
    const isRetina = useMediaQuery({ minResolution: '2dppx' })
    const setArr = []

    const { data, error, isLoading } = useAsync({ promiseFn: loadSetList })

    const [isExistSet, setExistSet] = useState(true)

    
    if (data) {
        Object.keys(data).forEach(function (key) {
            setArr.push(data[key]);
            console.log(setArr)
        });
    }
    return(
        <div className='page-top-layer'>
            <div className='page-top-container'>
                

                <div className="page-wrapper">
                    <div className="page-title">
                        <div>
                            <label>Only for you, Gaok</label>
                            <img src={IconSet}/>
                        </div>

                        <svg width="100" height="100">
                            <circle cx="50" cy="50" r="50" fill="white"></circle>
                        </svg>
                    </div>
                    <div className='page-small-title'>
                        <label>Make Your Fitness Set.</label>
                    </div>
                    
                </div>
            </div>
            <div className='page-center-container'>
                <MakeYourSetMain name={isExistSet} setArr={setArr}/>
            </div>
        </div>
    )

}

export default MakeYourSet;