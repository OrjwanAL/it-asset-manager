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
            element={<AssetManager title="Computers Dashboard" initialData={[]} assetTypes={['Laptop', 'Desktop PC', 'Workstation', 'Server']} storageKey="assets_computers" />} 
          />
          <Route 
            path="/hardware" 
            element={<AssetManager title="Hardware Components" initialData={[]} assetTypes={['SSD', 'HDD', 'Motherboard', 'RAM', 'GPU', 'Power Supply']} storageKey="assets_hardware" />} 
          />
          <Route 
            path="/accessories" 
            element={<AssetManager title="Accessories Dashboard" initialData={[]} assetTypes={['Keyboard', 'Mouse', 'Speakers', 'Monitor', 'Headset', 'Webcam']} storageKey="assets_accessories" />} 
          />
          <Route 
            path="/network" 
            element={<AssetManager title="Network Equipment" initialData={[]} assetTypes={['Router', 'Switch', 'Access Point', 'Modem', 'Patch Panel']} storageKey="assets_network" />} 
          />
          
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;