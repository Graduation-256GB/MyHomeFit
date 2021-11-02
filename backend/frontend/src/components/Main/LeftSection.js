import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Main/Section.css'

const LeftSection = ({ img, color, title, text, width, height,link}) => {
    return (    
            <div id="page">
                <div id="content">
                    <div id="text">
                        <span id="title" style={{color: color}}>{title}
                        </span >
                    <span id="message">{text}</span>
                     {
                    link==2&&
                    <div id="section-start">
                        <Link to="/training">시작하기</Link>
                    </div>
                }
                {
                    link==4&&
                    <div id="section-start">
                    <Link to="/calendar">시작하기</Link>
                    </div>
                }
                    </div>
                <div id="img" style={{ width: width, height:height}}>
                        <img src={img}></img>
                    </div>
                </div>
            </div>
    )
}
export default LeftSection;