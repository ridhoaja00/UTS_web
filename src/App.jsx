import React from 'react';
import { CalendarDays, ChevronRight } from 'lucide-react';
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
    <div className="app-shell">
      <Sidebar />
      <div className="app-workspace"><header className="topbar"><span>Workspace <ChevronRight size={14} /><strong>Manajemen Kos</strong></span><span className="topbar-date"><CalendarDays size={16} />{new Intl.DateTimeFormat('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date())}</span></header><main className="app-main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/penghuni" element={<DataPenghuni />} />
          <Route path="/keluhan" element={<Keluhan />} />
          <Route path="/keuangan" element={<Keuangan />} />
          <Route path="/kamar" element={<ManajemenKamar />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main></div>
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
