import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Main/Section.css'


const RightSection = ({ img,color,title,text,width,height,link }) => {
    return (    
    <div id="page">
        <div id="content">
            <div id="img" style={{ width: width, height:height}}>
                <img src={ img}></img>
            </div>
            <div id="text">
                    <span id="title" style={{color: color}}>
                    {title}
                </span >
                    <span id="message">{ text}</span>
                {
                    link==1&&
                    <div id="section-start">
                    <Link to="/makeyourset">시작하기</Link>
                    </div>
                }
                {
                    link==3&&
                    <div id="section-start">
                    <Link to="/fitnotes">시작하기</Link>
                    </div>
                }
                </div>
        </div>
    </div>
    )
}
export default RightSection;