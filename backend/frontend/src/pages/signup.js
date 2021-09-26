import React, { useState, useEffect } from 'react';
import "../css/Signup.css"
import "../css/login.css"


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://127.0.0.1:8000/makeyourset');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email: email,
      password1: password1,
      password2: password2
    };

    fetch('http://127.0.0.1:8000/api/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key);
          window.location.replace('http://127.0.0.1:8000/makeyourset');
        } else {
          setEmail('');
          setPassword1('');
          setPassword2('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };
    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                <div className="signup-left">
                        
                        <div className="signup-welcome">
                            <label>Welcome</label>
                            <div className="check-account">
                            <label>Have an Account?</label>
                            <div className="button-wrapper">
                                <a href="/login">Login</a>
                            </div>
                            </div>
                        </div>
                    </div>

                <div className="signup-right">
                    <div className="signup-title-box">
                        <label className="signup-title-login">SignUp</label>
                        <label className="signup-title-div">/</label>
                        <label className="signup-title-signup">Login</label>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="signup-right-content">
                            {/* <div><label>ID</label></div>
                            <div><input/></div>
                            <div><label>Nickname</label></div>
                            <div><input/></div> */}
                            <div><label htmlFor='email'>Email</label></div>
                            <div><input
                                    name='email'
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    />{' '}</div>
                            <div><label htmlFor='password1'>Password</label> </div>
                            <div><input
                                    name='password1'
                                    type='password'
                                    value={password1}
                                    onChange={e => setPassword1(e.target.value)}
                                    required
                                    />{' '}</div>
                            <div><label htmlFor='password2'>Confirm password:</label></div>
                            <div><input
                                    name='password2'
                                    type='password'
                                    value={password2}
                                    onChange={e => setPassword2(e.target.value)}
                                    required
                                    />{' '}</div>
                        </div>
                        <div className="signup-btn-wrapper">
                            <div className="signup-btn">
                                <input type="submit" value="Signup" className="signup-btn-txt"></input>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;