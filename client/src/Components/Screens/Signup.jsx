import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import '../../App.css';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState(undefined);

    useEffect(() => {
        if (url) {
            uploadFields();
        }
    }, [url]);

    const uploadPic = () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'miniinsta');
        data.append('cloud_name', 'rsbrsb');
        fetch('https://api.cloudinary.com/v1_1/rsbrsb/image/upload', {
            method: 'post',
            body: data,
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url);
        })
        .catch(err => {
            console.log('err:', err);
        });
    };

    const uploadFields = () => {
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            M.toast({ html: 'Please add a valid email address', classes: '#c62828 red darken-1' });
            return;
        }

        fetch('/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                password,
                email,
                pic: url,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                M.toast({ html: data.error, classes: '#c62828 red darken-3' });
            } else {
                M.toast({ html: data.message, classes: '#43a047 green darken-1' });
                navigate('/signin'); // Use navigate to navigate to another route
            }
        })
        .catch(err => {
            console.log(err);
        });
    };

    const PostData = () => {
        if (image) {
            uploadPic();
        } else {
            uploadFields();
        }
    };

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 style={{ fontFamily: 'sans-serif' }}>Instagram</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
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
                <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-1">
                        <span>Upload Profile</span>
                        <input type="file" onChange={e => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={PostData}
                >
                    Sign Up
                </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    );
};

export default Signup;
