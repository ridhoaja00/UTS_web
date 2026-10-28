import React from "react";
import { useKos } from "../context/kosContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { currentUser, logout } = useKos();

  return (
    <aside className="w-62.5 min-w-62.5 shrink-0 bg-slate-900 px-4 py-6 text-white flex flex-col justify-between h-screen sticky top-0">
      <div>
        <div className="mb-5 flex items-center gap-2 text-xl font-bold text-sky-400 md:mb-8">
          🏠 KosManager
        </div>

        {/* Info Akun & Tombol Logout */}
        <div className="mb-6 p-3 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400 mb-1">
            Halo,{" "}
            <span className="font-bold text-white capitalize">
              {currentUser?.username}
            </span>
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
              Admin
            </span>
            <button
              onClick={logout}
              className="text-xs bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav aria-label="Navigasi utama">
          <ul className="flex flex-wrap gap-2 md:flex-col p-4">
            {[
              ["/dashboard", "Dashboard"],
              ["/kamar", "Manajemen Kamar"],
              ["/penghuni", "Data Penghuni"],
              ["/keuangan", "Keuangan"],
              ["/keluhan", "Keluhan"],
            ].map(([path, label]) => (
              <li key={path}>
                <NavLink to={path} className={linkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="hidden md:block text-xs text-slate-500 pt-4 border-t border-slate-800">
        &copy; 2026 SmartKos App
      </div>
    </aside>
  );
};

const linkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2.5 text-sm transition-colors ${
    isActive
      ? "bg-slate-800 font-semibold text-white"
      : "text-slate-400 hover:bg-slate-800 hover:text-white"
  }`;

export default Sidebar;
