import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../../App';
import M from 'materialize-css';
import styles from "./ModuleCss/LoginPage.module.css";

const LoginPage = () => {
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate(); // Use useNavigate to replace useHistory
    const [password, setPasword] = useState("");
    const [email, setEmail] = useState("");

    const PostData = (e) => {
        e.preventDefault();
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            M.toast({ html: 'Please add a valid email address', classes: '#c62828 red darken-1' });
            return;
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.error) {
                    M.toast({ html: data.error, classes: '#c62828 red darken-3' });
                }
                else {
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({ type: "USER", payload: data.user });
                    M.toast({ html: "Logged In successfully", classes: '#43a047 green darken-1' });
                    navigate('/'); // Use navigate to navigate to another route
                }
            }).catch(err => {
                console.log(err);
            });
    };
    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.phoneAppDemo}></div>
                    <div className={styles.form_data}>
                        <form action="">
                            <div className={styles.logo}>
                                <img src="https://res.cloudinary.com/rsbrsb/image/upload/v1633065005/download_1_b5pzie.png" alt="logo" />
                            </div>
                            <input
                                type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPasword(e.target.value)}
                            />
                            <button className={styles.form_btn} type="submit" onClick={(e) => PostData(e)}>
                                Log in
                            </button>
                            {/* <span className={styles.has_separator}>Or</span>
                            <a className="facebook_login" href="#" >
                                <i className="fab fa-facebook-square"></i> Log in with Facebook
                            </a>
                            <a className={styles.password_reset} href="#">
                                Forgot password?
                            </a> */}
                        </form>
                        <div className={styles.sign_up}>
                            Don't have an account?  <Link to="/signup">Sign up</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
