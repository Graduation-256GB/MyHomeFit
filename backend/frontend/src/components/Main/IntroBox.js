import React from 'react';
import '../../css/Main/IntroBox.css'
import { MdPlayCircleOutline } from "react-icons/md"
import {FiFolderPlus} from "react-icons/fi"
import { BiNotepad, BiLineChart } from "react-icons/bi"

const IntroBox = ({name,icon,content }) => {
    return (
        <div id="menu-intro-box">
            <div id="menu-intro-icon">
                {
                    icon==1&&
                        <FiFolderPlus/>
                }
                {
                    icon==2&&
                        <MdPlayCircleOutline/>
                }
                {
                    icon==3&&
                        <BiLineChart/>
                }
                {
                    icon==4&&
                        <BiNotepad/>
                }
                    </div>
                    <span id="menu-intro-title">
                        {name}
                    </span>
                    <span id="menu-intro-text">
                        {content}
                    </span>
                </div>
    )
}
export default IntroBox;