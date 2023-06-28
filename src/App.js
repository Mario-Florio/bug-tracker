import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<h1>Dashboard</h1>}/>
          <Route path="/bugs" element={<h1>Bugs</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
