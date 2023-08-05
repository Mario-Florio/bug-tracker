import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SideMenu from './components/SideMenu/SideMenu';
import Dashboard from './pages/Dashboard/Dashboard';
import Bugs from './pages/Bugs/Bugs';
import Projects from './pages/Projects/Projects';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar/>
        <SideMenu/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/bugs" element={<Bugs/>}/>
          <Route path='/projects' element={<Projects/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
