import React from 'react';
import { MdAccountCircle,MdCheckCircle,MdInfo } from 'react-icons/md';
import '../../css/FitNotes/RankContent.css'

const SetContent = ({title,count,user,type}) => {
    return(
        <div id="set-rank-container">
            <label id="name">{title}</label>
            <div id="set-rank-info">
                <MdCheckCircle/>
                <span>{count}</span>
                <MdAccountCircle/>
                <span>{user}</span>
                <MdInfo/>
                <span>{ type }</span>
            </div>
        </div>
    )
}

export default SetContent;