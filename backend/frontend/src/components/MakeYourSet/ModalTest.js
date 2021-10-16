import React, { useState} from 'react';
import './ModalTest.css'

function ModalTest ({speedOnClicked}) {

    return(
        <div className='speedModal' onClick={speedOnClicked}>
            <div className='modalContainer' onClick={(e) => e.stopPropagation()}>
                <div className='wrapper'>Test</div>
            </div>
        </div>
    )
}

export default ModalTest;