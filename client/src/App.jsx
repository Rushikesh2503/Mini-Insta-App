import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom"
import Navbar from './Components/Navbar';
import Home from './Components/Screens/Home';
import Login from './Components/Screens/Login';
import Signup from './Components/Screens/Signup';
import Profile from './Components/Screens/Profile';
import CreatePost from './Components/Screens/CreatePost';
import {reducer,initialState} from './Store/userReducer'
import UserProfile from './Components/Screens/UserProfile';
import FollowingPosts from './Components/Screens/FollowingPosts';
import LoginPage from './Components/Screens/LoginPage';
export const UserContext = createContext()


const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
    } else {
      if (!history.location.pathname.startsWith('/reset'))
        history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/" >
      <Home/>
      </Route>
      <Route exact path="/signin">
        <LoginPage />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile/>
      </Route>
       <Route path="/myfollowingpost">
        <FollowingPosts />
      </Route>
    </Switch>
  )
}
function App() {
     const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
