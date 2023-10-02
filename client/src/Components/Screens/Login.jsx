import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../../App';
import M from 'materialize-css';
import '../../App.css';

const Login = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate(); // Use useNavigate to replace useHistory
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const PostData = () => {
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            M.toast({ html: 'Please add a valid email address', classes: '#c62828 red darken-1' });
            return;
    
        }

        fetch('/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password,
                email,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    M.toast({ html: data.error, classes: '#c62828 red darken-3' });
                } else {
                    localStorage.setItem('jwt', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    dispatch({ type: 'USER', payload: data.user });
                    M.toast({ html: 'Logged In successfully', classes: '#43a047 green darken-1' });
                    navigate('/'); // Use navigate to navigate to another route
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}
                >
                    Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account ?</Link>
                </h5>
            </div>
        </div>
    );
};

export default Login;
