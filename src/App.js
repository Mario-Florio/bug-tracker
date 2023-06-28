import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>}/>
        <Route path="/bugs" element={<div>Bugs</div>}/>
      </Routes>
    </div>
  );
}

export default App;
