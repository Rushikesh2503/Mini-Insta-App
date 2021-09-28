import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css';
import '../../App.css';

const Signup = () => {
    return (
             <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input
            type="text"
            placeholder="Name"
            // value={name}
            // onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="Email"
            // value={email}
            // onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            // value={password}
            // onChange={(e)=>setPasword(e.target.value)}
            />
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" 
                // onChange={(e)=>setImage(e.target.files[0])}
                 />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            // onClick={()=>PostData()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>
        </div>
      </div>
    )
}


export default Signup
