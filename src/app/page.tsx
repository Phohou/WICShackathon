'use client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./_components/Header";
import Loading from "./loading"; // Import the new page
import VoiceAIPage from './_components/VoiceAIPage';

export default function Home() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<VoiceAIPage />} />
          <Route path="/loading.tsx" element={<Loading />} />
        </Routes>
      </div>
    </Router>
  );
}
