import React from 'react';
import '../../css/MakeYourSet/SetBox.css'
import RightIcon from '../../images/menu_right_clicked.png';
import SquatImg from '../../images/squat.png';

const SetBox =({name}) => {
    return(
        <div className="box-wrapper">
            <div className="block"><img src={RightIcon} className="send-icon"></img></div>
            <div className="arrow-box" ><img src={SquatImg} ></img></div>
        </div>
    )
}
export default SetBox;