import React from 'react';
import { MdAccountCircle,MdCheckCircle,MdInfo } from 'react-icons/md';
import '../../css/FitNotes/RankContent.css'

const SetContent = ({title,count,username,type,index}) => {
    return(
        <div id="set-rank-container">
            <div className="rank-number">
                {index}
            </div>
            <div id="set-rank-content">
                <label id="name">{title}</label>
                <div id="set-rank-info">
                    <MdCheckCircle/>
                    <span>{count}</span>
                    <MdAccountCircle/>
                    <span>{username}</span>
                    <MdInfo/>
                    <span>{ type }</span>
                </div>
            </div>
        </div>
    )
}

export default SetContent;