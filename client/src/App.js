import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Elections from './components/Elections';

function App() {
  return (
    <Router>
      <div className="App" style={{backgroundColor: '#ddd6fe', minHeight: '100vh'}}>
        <header>
          <h1>Online Voting System</h1>
        </header>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/elections" element={<Elections />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Online Voting System</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;