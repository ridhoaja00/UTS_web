import { Building2, LayoutDashboard, DoorOpen, Users, Wallet, MessageSquare, LogOut, ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useKos } from '../context/kosContext';

const menus = [
  ['/dashboard', 'Dashboard', LayoutDashboard],
  ['/kamar', 'Manajemen Kamar', DoorOpen],
  ['/penghuni', 'Data Penghuni', Users],
  ['/keuangan', 'Keuangan', Wallet],
  ['/keluhan', 'Keluhan', MessageSquare],
];

export default function Sidebar() {
  const { currentUser, logout } = useKos();
  return <aside className="sidebar">
    <NavLink to="/dashboard" className="brand"><span className="brand-icon"><Building2 size={23} /></span><span>SmartKos<small>PROPERTY MANAGEMENT</small></span></NavLink>
    <div className="nav-label">WORKSPACE</div>
    <nav aria-label="Navigasi utama" className="sidebar-nav">
      {menus.map(([path, label, Icon]) => <NavLink key={path} to={path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><Icon size={19} aria-hidden="true" /><span>{label}</span></NavLink>)}
    </nav>
    <div className="sidebar-tip"><span className="tip-icon"><Building2 size={20} /></span><strong>Kos terkelola, lebih tenang.</strong><p>Semua operasional kos dalam satu tempat.</p><NavLink to="/kamar">Kelola kamar <ArrowUpRight size={15} /></NavLink></div>
    <div className="sidebar-account"><span className="avatar">{currentUser?.username?.slice(0, 1).toUpperCase()}</span><div><strong>{currentUser?.username}</strong><small>Administrator</small></div><button type="button" onClick={logout} aria-label="Keluar dari akun" title="Keluar dari akun"><LogOut size={18} /></button></div>
  </aside>;
}
