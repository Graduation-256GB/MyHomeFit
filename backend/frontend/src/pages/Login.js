import React, { useState, useEffect } from 'react';
import "../css/login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('/makeyourset');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    };

    fetch('http://127.0.0.1:8000/api/auth/login/', {
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
          window.location.replace('/makeyourset');
        } else {
          setEmail('');
          setPassword('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

    return (
        <div className="signup-container">
            {loading === false && (
                <div className="signup-wrapper">
                    <div className="signup-left">
                        <div className="signup-welcome">
                            <label>Welcome</label>
                            <div className="check-account">
                                <label>Create Account</label>
                                <div className="button-wrapper">
                                    <a href="/signup">Signup</a>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className="signup-right">
                        <div className="signup-title-box">
                            <label className="signup-title-signup">SignUp</label>
                            <label className="signup-title-div">/</label>
                            <label className="signup-title-login">Login</label>
                        </div>

                        <form onSubmit={onSubmit}>
                            <div className="signup-right-content">
                                <div><label htmlFor='email'>Email</label> </div>
                                <div>
                                    <input
                                        name='email'
                                        type='email'
                                        value={email}
                                        required
                                        onChange={e => setEmail(e.target.value)}
                                    />{' '}</div>
                                <div><label htmlFor='password'>Password</label></div>
                                <div><input
                                        name='password'
                                        type='password'
                                        value={password}
                                        required
                                        onChange={e => setPassword(e.target.value)}
                                    />{' '}</div>
                            </div>
                            <div className="signup-btn-wrapper">
                                <div className="signup-btn">
                                    <input type="submit" value="Login" className="signup-btn-txt" />
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;