import React from 'react';
import "../css/login.css"
import IconFitnotes from "../images/icon_fitnotes.png"
import IconSignup from "../images/icon_signup.png"


const Login = () => {
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
                        <div><label>Password</label></div>
                        <div><input type="password"/></div>
                    </div>
                    <div className="signup-btn-wrapper">
                        <div className="signup-btn">
                            <button className="signup-btn-txt">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;