import { useKos } from "../context/kosContext";

const DashBoard = () => {
  const {kamar, penghuni, transaksi, keluhan} = useKos();

  const totalKamar = kamar.length;
  const kamarTerisi = kamar.filter((k) => k.status === 'Terisi').length;
  const kamarKosong = totalKamar - kamarTerisi;
  const tingkatOkupansi = totalKamar > 0 ? Math.round((kamarTerisi / totalKamar) * 100) : 0;
  const penghuniAktif = penghuni.filter((p) => p.statusAktif).length;

  const totalPemasukan= transaksi.filter((t) => t.tipe === 'Pemasukan').reduce((sum, t) => sum + t.jumlah, 0)
  const totalPengeluaran= transaksi.filter((t) => t.tipe === 'Pengeluaran').reduce((sum, t) => sum + t.jumlah, 0)

  const saldoBersih = totalPemasukan - totalPengeluaran;

  const keluhanPending= keluhan.filter((k) => k.status !== 'Selesai').length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Utama</h2>
        <p className="text-slate-500">Ringkasan Operasional dan statistik kos terkini</p>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Okupansi Kamar
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-slate-800"> {tingkatOkupansi}%</p>
            <span className="text-xs font-medium text-slate-500">
              {kamarTerisi} / {totalKamar} Terisi
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{width: `${tingkatOkupansi}%`}}    
            ></div>
          </div>
        </div>
        {/* penghuni aktif */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Penghuni Aktif
          </p>
          <p className="text-3xl font-extrabold text-slate-800"> {penghuniAktif} </p>
          <p className="text-xs text-slate-500 mt-2">Orang Terdaftar</p>
        </div>
        {/* saldo bersih */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Saldo Bersih
          </p>
          <p
          className={`text-2xl font-extrabold ${
            saldoBersih >= 0 ? 'text-emerald-600' : 'text-rose-600'
          }`}
          >
            Rp {saldoBersih.toLocaleString('id-ID')}
          </p>
          <p className="text-xs text-slate-500 mt-2">Pemasukan Dikurangin Pengeluaran</p>
        </div>
        {/* keluhan belum selesai */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Keluhan Perlu Tindakan
          </p>
          <p className="text-3xl font-extrabold text-slate-800">{keluhanPending}</p>
          <p className="text-xs text-slate-500 mt-2">Status Pending / Proses</p>
        </div>
      </div>
        {/* detail status kamar dan keuangan cepat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* status ketersediaan kamar  */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Ringkasan Ketersediaan Kamar</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-center">
                <p className="text-xs text-emerald-600 font-medium">Kamar Kosong</p>
                <p className="text-2xl font-bold text-rose-700 mt-1">{kamarKosong}</p>
              </div>
              <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 text-center">
                <p className="text-xs text-rose-600 font-medium">Kamar Terisi</p>
                <p className="text-2xl font-bold text-rose-700 mt-1">{kamarTerisi}</p>
              </div>
            </div>
          </div>

          {/* Ringkasan arus kas */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Ringkasan Arus Kas</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm text-slate-600">Total Pemasukan</span>
                <span className="font-bold text-emerald-600">
                  + Rp {totalPemasukan.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm text-slate-600">Total Pengeluaran</span>
                <span className="font-bold text-red-600">
                  - Rp {totalPengeluaran.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default DashBoard;