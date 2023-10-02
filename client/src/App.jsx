import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter and Routes
import Navbar from './Components/Navbar';
import Home from './Components/Screens/Home';
import Login from './Components/Screens/Login';
import Signup from './Components/Screens/Signup';
import Profile from './Components/Screens/Profile';
import CreatePost from './Components/Screens/CreatePost';
import { reducer, initialState } from './Store/userReducer';
import UserProfile from './Components/Screens/UserProfile';
import FollowingPosts from './Components/Screens/FollowingPosts';
import LoginPage from './Components/Screens/LoginPage';

export const UserContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      // Handle the logic for unauthenticated users, e.g., redirect to the login page.
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowingpost" element={<FollowingPosts />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
