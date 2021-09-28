
import './App.css';
import {BrowserRouter,Route} from "react-router-dom"
import Navbar from './Components/Navbar';
import Home from './Components/Screens/Home';
import Login from './Components/Screens/Login';
import Signup from './Components/Screens/Signup';
import Profile from './Components/Screens/Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/signin">
        <Login/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
