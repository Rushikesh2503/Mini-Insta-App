import React, { useContext, useRef, useEffect, useState } from 'react';
import '../App.css';
import { Link, Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate and Outlet
import { UserContext } from '../App';
import M from 'materialize-css';

const Navbar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate(); // Use useNavigate for navigation
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: 'white', cursor: 'pointer' }}
          >
            search
          </i>
        </li>,
        <li key="2">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="3">
          <Link to="/create">Create Post</Link>
        </li>,
        <li key="4">
          <Link to="/myfollowingpost">All Feed</Link>
        </li>,
        <li key="5">
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: 'CLEAR' });
              navigate('/signin'); // Use navigate for navigation
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="6">
          <Link to="/signin">Login</Link>
        </li>,
        <li key="7">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch('/search-users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };

  return (
    <div className="mainDivNav">
      <nav className="centerNavb">
        <div className="nav-wrapper black">
          <Link to={state ? '/' : '/signin'} className="brand-logo left">
            <img
              src="https://res.cloudinary.com/rsbrsb/image/upload/v1633065005/download_1_b5pzie.png"
              alt="logo"
              className="brand_logo_img white"
            />
          </Link>
          <ul id="nav-mobile" className="right ulNavListM" style={{ marginRight: '10px' }}>
            {renderList()}
          </ul>
        </div>
        <div id="modal1" className="modal" ref={searchModal} style={{ color: 'black' }}>
          <div className="modal-content">
            <input
              type="text"
              placeholder="Search User"
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />
            <ul className="collection">
              {userDetails.map((item) => {
                return (
                  <Link
                    to={item._id !== state?._id ? '/profile/' + item?._id : '/profile'}
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      setSearch('');
                    }}
                  >
                    <li className="collection-item" style={{ color: 'black', width: '100%' }}>
                      {item.name}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>
              Close
            </button>
          </div>
        </div>
      </nav>
      <Outlet /> {/* Add Outlet here for nested routes */}
    </div>
  );
};

export default Navbar;
