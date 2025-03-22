'use client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./_components/Header";
import Dropdown from "./_components/Dropdown";
import VoiceRes from "./_components/VoiceRes";
import Loading from "./loading"; // Import the new page

export default function Home() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<VoiceRes />} />
          <Route path="/loading.tsx" element={<Loading />} />
        </Routes>
        <Dropdown />
      </div>
    </Router>
  );
}
