import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SideMenu from './components/SideMenu/SideMenu';
import Dashboard from './pages/Dashboard/Dashboard';
import Bugs from './pages/Bugs/Bugs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <SideMenu/>
        <Routes>
          <Route path="/bug-tracker" element={<Dashboard/>}/>
          <Route path="/bug-tracker/bugs" element={<Bugs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
