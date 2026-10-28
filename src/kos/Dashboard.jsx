import { Building2, Users, Wallet, MessageSquare, ArrowUpRight, ArrowDownLeft, ArrowRight, DoorOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useKos } from '../context/kosContext';
const rupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

export default function Dashboard() {
  const { kamar, penghuni, transaksi, keluhan, currentUser } = useKos();
  const terisi = kamar.filter(k => k.status === 'Terisi').length;
  const kosong = kamar.length - terisi;
  const okupansi = kamar.length ? Math.round(terisi / kamar.length * 100) : 0;
  const aktif = penghuni.filter(p => p.statusAktif).length;
  const pemasukan = transaksi.filter(t => t.tipe === 'Pemasukan').reduce((s, t) => s + t.jumlah, 0);
  const pengeluaran = transaksi.filter(t => t.tipe === 'Pengeluaran').reduce((s, t) => s + t.jumlah, 0);
  const pending = keluhan.filter(k => k.status !== 'Selesai').length;
  const stats = [
    { label: 'Okupansi kamar', value: `${okupansi}%`, detail: `${terisi} dari ${kamar.length} kamar terisi`, icon: Building2, tone: 'blue' },
    { label: 'Penghuni aktif', value: aktif, detail: 'Penghuni yang sedang tinggal', icon: Users, tone: 'violet' },
    { label: 'Saldo bersih', value: rupiah(pemasukan - pengeluaran), detail: 'Total pemasukan − pengeluaran', icon: Wallet, tone: 'green' },
    { label: 'Perlu tindakan', value: pending, detail: 'Keluhan pending dan diproses', icon: MessageSquare, tone: 'orange' },
  ];
  return <div className="dashboard space-y-6">
    <div className="page-heading"><div><p className="eyebrow">RINGKASAN OPERASIONAL</p><h2>Dashboard</h2><p>Selamat datang, {currentUser?.username}. Berikut kondisi kos Anda hari ini.</p></div><Link to="/kamar" className="primary-link"><DoorOpen size={17} /> Kelola kamar <ArrowUpRight size={16} /></Link></div>
    <section className="stats-grid" aria-label="Statistik kos">{stats.map(({label, value, detail, icon: Icon, tone}) => <article key={label} className="stat-card"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={19} /></span></div><p className="stat-value">{value}</p><p className="stat-detail">{detail}</p>{label === 'Okupansi kamar' && <div className="occupancy-track"><div style={{width: `${okupansi}%`}} /></div>}</article>)}</section>
    <div className="dashboard-panels">
      <section className="panel"><div className="panel-heading"><div><h3>Ketersediaan kamar</h3><p>Gambaran kapasitas kos saat ini</p></div><Link to="/kamar" aria-label="Lihat manajemen kamar"><ArrowUpRight size={20} /></Link></div><div className="room-overview"><div className="occupancy-ring" style={{'--occupancy': `${okupansi}%`}}><div><strong>{okupansi}%</strong><span>terisi</span></div></div><div className="room-legend"><div><span className="legend-dot blue" />Terisi<strong>{terisi}<small> kamar</small></strong></div><div><span className="legend-dot" />Tersedia<strong>{kosong}<small> kamar</small></strong></div><p>Total {kamar.length} kamar terdaftar</p></div></div><Link to="/penghuni" className="panel-footer">Lihat data penghuni <ArrowRight size={16} /></Link></section>
      <section className="panel"><div className="panel-heading"><div><h3>Arus kas</h3><p>Akumulasi seluruh transaksi kos</p></div><Wallet size={20} className="text-slate-400" /></div><div className="cash-row"><span className="stat-icon green"><ArrowDownLeft size={20} /></span><div><strong>Pemasukan</strong><small>Total dana masuk</small></div><b className="text-emerald-700">{rupiah(pemasukan)}</b></div><div className="cash-row"><span className="stat-icon orange"><ArrowUpRight size={20} /></span><div><strong>Pengeluaran</strong><small>Total biaya operasional</small></div><b className="text-rose-600">{rupiah(pengeluaran)}</b></div><Link to="/keuangan" className="panel-footer">Lihat rincian keuangan <ArrowRight size={16} /></Link></section>
    </div>
    <section className="panel"><div className="panel-heading"><div><h3>Transaksi terbaru</h3><p>Aktivitas keuangan yang terakhir dicatat</p></div><Link to="/keuangan" className="text-link">Lihat semua <ArrowRight size={15} /></Link></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr><th>Tanggal</th><th>Keterangan</th><th>Tipe</th><th className="text-right">Jumlah</th></tr></thead><tbody>{transaksi.length ? [...transaksi].sort((a,b) => b.tanggal.localeCompare(a.tanggal)).slice(0,4).map(t => <tr key={t.id}><td>{t.tanggal}</td><td className="font-medium text-slate-800">{t.keterangan}</td><td><span className={`transaction-badge ${t.tipe === 'Pemasukan' ? 'income' : 'expense'}`}>{t.tipe}</span></td><td className="text-right font-semibold whitespace-nowrap">{rupiah(t.jumlah)}</td></tr>) : <tr><td colSpan={4} className="text-center text-slate-500">Belum ada transaksi. Catat transaksi pertama di halaman Keuangan.</td></tr>}</tbody></table></div></section>
  </div>;
}
