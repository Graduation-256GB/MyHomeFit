import React from 'react';
import "../css/signup.css"
import IconFitnotes from "../images/icon_fitnotes.png"
import IconSignup from "../images/icon_signup.png"


const signup = () => {
    return (
        <div className="signup-container">

            <div className="signup-wrapper">
                <div className="signup-left">
                    <div><label className="signup-welcome">Welcome</label></div>

                </div>

                <div className="signup-right">
                    <div className="signup-title-box">
                        <label className="signup-title-signup">SignUp</label>
                        <label className="signup-title-div">/</label>
                        <label className="signup-title-login">Login</label>
                    </div>
                    <div className="signup-right-content">
                        <div><label>ID</label></div>
                        <div><input/></div>
                        <div><label>Nickname</label></div>
                        <div><input/></div>
                        <div><label>E-mail</label></div>
                        <div><input type="email"/></div>
                        <div><label>Password</label></div>
                        <div><input type="password"/></div>
                        <div><label>Confirm password.</label></div>
                        <div><input/></div>
                    </div>
                    <div className="signup-btn-wrapper">
                        <div className="signup-btn">
                            <button className="signup-btn-txt">SignUp</button>
                        </div>
                        </div>

                </div>
            </div>
        </div>
    );
};

export default signup;