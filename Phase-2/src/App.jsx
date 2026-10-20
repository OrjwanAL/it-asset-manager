import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AssetManager from './pages/AssetManager';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-content">
        <Routes>
  <Route 
    path="/" 
    element={<AssetManager title="Computers Dashboard" category="computers" assetTypes={['Laptop', 'Desktop PC', 'Workstation']} />} 
  />
  <Route 
    path="/hardware" 
    element={<AssetManager title="Hardware Components" category="hardware" assetTypes={['SSD', 'HDD', 'Motherboard', 'RAM']} />} 
  />
  <Route 
    path="/accessories" 
    element={<AssetManager title="Accessories Dashboard" category="accessories" assetTypes={['Keyboard', 'Mouse', 'Monitor']} />} 
  />
  <Route 
    path="/network" 
    element={<AssetManager title="Network Equipment" category="network" assetTypes={['Router', 'Switch', 'Modem']} />} 
  />
  <Route path="/about" element={<About />} />
</Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;