import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SideMenu from './components/SideMenu/SideMenu';
import Dashboard from './pages/Dashboard/Dashboard';
import Bugs from './pages/Bugs/Bugs';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar/>
        <SideMenu/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/bugs" element={<Bugs/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
