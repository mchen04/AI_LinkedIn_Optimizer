import React from 'react';
import { Outlet } from '@tanstack/react-router';

function App() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

export default App;
