import React from 'react';
import { Outlet } from '@tanstack/react-router';

function App() {
  return (
    <main className="min-h-screen">
      <Outlet />
    </main>
  );
}

export default App;
