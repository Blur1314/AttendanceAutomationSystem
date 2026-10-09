import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login';
import FloorMap from './pages/FloorMap';
import Room from './pages/Room';
import Teacher from './pages/teacher';

export default function App() {
  return (
    <Routes>
      {/* Start the demo at the Login screen */}
      <Route path="/login" element={<Login />} />

      {/* Student Routes */}
      <Route path="/map" element={<FloorMap />} />
      <Route path="/room/:roomId" element={<Room />} />

      {/* Teacher Routes */}
      <Route path="/teacher" element={<Teacher />} />

      {/* Fallback to login if URL is wrong */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}