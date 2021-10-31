import React from 'react';
import '../../css/Main/Section.css'

const LeftSection = ({ img, color, title, text, width, height}) => {
    return (    
            <div id="page">
                <div id="content">
                    <div id="text">
                        <span id="title" style={{color: color}}>{title}
                        </span >
                        <span id="message">{ text}</span>
                    </div>
                <div id="img" style={{ width: width, height:height}}>
                        <img src={img}></img>
                    </div>
                </div>
            </div>
    )
}
export default LeftSection;