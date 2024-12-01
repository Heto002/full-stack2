/*Import CSS file for Styling*/
import './App.css';
/*Used for routing multiple pages*/
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
/*Import Pages*/
import { Home } from './Pages/home';
import { UserCreate } from './Pages/userCreate';
import { UserList } from './Pages/userList';
/*Import the Layou.jsx file*/
import { Layout } from './Layout';

function App() {
 return(
  <Router>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/userCreate" element={<UserCreate/>}/>
        <Route path="/userList" element={<UserList/>}/>
      </Route>
    </Routes>
  </Router>
 )

}

export default App;
