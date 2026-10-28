import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { KosProvider, useKos } from './context/kosContext';

import Auth from './auth/Auth';
import Sidebar from './kos/Sidebar';
import Dashboard from './kos/Dashboard';
import DataPenghuni from './kos/DataPenghuni';
import Keluhan from './kos/keluhan';
import Keuangan from './kos/Keuangan';
import ManajemenKamar from './kos/ManajemenKamar';


  // Kunci halaman: Jika belum login, paksa tampilkan halaman Auth
const ProtectedLayout = () => {
  const { currentUser } = useKos();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="flex min-h-screen flex-row bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/penghuni" element={<DataPenghuni />} />
          <Route path="/keluhan" element={<Keluhan />} />
          <Route path="/keuangan" element={<Keuangan />} />
          <Route path="/kamar" element={<ManajemenKamar />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};


function App() {
  return (
    <KosProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/*' element={<ProtectedLayout/>}/>
        </Routes>
      </BrowserRouter>
    </KosProvider>
  );
}

export default App;