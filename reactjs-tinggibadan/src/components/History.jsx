import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { database } from "./firebase";
import { Link } from "react-router-dom";

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const hcHistoryRef = ref(database, 'HC/history');
      const hyHistoryRef = ref(database, 'HY/history');
  
      // Ambil data HC
      onValue(hcHistoryRef, (hcSnapshot) => {
        const hcData = hcSnapshot.val() || {};
        const hcHistoryArray = Object.entries(hcData).map(([id, entry]) => ({
          id,
          sensorType: 'HC',
          ...entry
        }));
  
        // Ambil data HY
        onValue(hyHistoryRef, (hySnapshot) => {
          const hyData = hySnapshot.val() || {};
          const hyHistoryArray = Object.entries(hyData).map(([id, entry]) => ({
            id,
            sensorType: 'HY',
            ...entry
          }));
  
          // Gabungkan dan urutkan berdasarkan timestamp dari yang terlama
          const combinedData = [...hcHistoryArray, ...hyHistoryArray].sort(
            (a, b) => a.timestamp_server - b.timestamp_server // Diubah ke ascending
          );
          
          setHistoryData(combinedData);
        });
      });
    };
  
    fetchData();
  }, []);

  const handleDelete = (sensorType, id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (confirmDelete) {
      const path = `${sensorType}/history/${id}`;
      remove(ref(database, path))
        .then(() => {
          // Update state setelah hapus
          setHistoryData(prev => 
            prev.filter(item => !(item.sensorType === sensorType && item.id === id)));
        })
        .catch(error => {
          console.error('Gagal menghapus data:', error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-6xl border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black uppercase border-b-4 border-black pb-2">
          History
          </h1>
          <Link
            to="/"
            className="border-4 border-black px-4 py-2 bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            ← Kembali
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="p-3 bg-white text-left">Tanggal</th>
                
                {/* HC-SR04 Header */}
                <th className="p-3 bg-blue-200 border-l-4 border-black" colSpan="5">
                  HC-SR04
                </th>
                
                {/* HY-SRF05 Header */}
                <th className="p-3 bg-yellow-200 border-l-4 border-black" colSpan="5">
                  HY-SRF05
                </th>
              </tr>
              <tr className="border-b-2 border-black">
                <th className="p-3 bg-white"></th>
                
                {/* HC Sub Header */}
                <th className="p-3 bg-blue-100 border-l-2 border-black">No</th>
                <th className="p-3 bg-blue-100">Tinggi</th>
                <th className="p-3 bg-blue-100">Latensi</th>
                <th className="p-3 bg-blue-100">Akurasi</th>
                <th className="p-3 bg-blue-100">Error</th>
                
                {/* HY Sub Header */}
                <th className="p-3 bg-yellow-100 border-l-2 border-black">No</th>
                <th className="p-3 bg-yellow-100">Tinggi</th>
                <th className="p-3 bg-yellow-100">Latensi</th>
                <th className="p-3 bg-yellow-100">Akurasi</th>
                <th className="p-3 bg-yellow-100">Error</th>
                
                <th className="p-3 bg-white border-l-4 border-black">Aksi</th>
              </tr>
            </thead>

            <tbody>
  {historyData
    .sort((a, b) => a.timestamp_server - b.timestamp_server) // Pastikan sorting
    .map((entry, index) => {
      // Hitung nomor urut berdasarkan sensor type
      const hcNumber = historyData
        .filter(e => e.sensorType === 'HC')
        .findIndex(e => e.id === entry.id) + 1;
      
      const hyNumber = historyData
        .filter(e => e.sensorType === 'HY')
        .findIndex(e => e.id === entry.id) + 1;

      return (
        <tr key={`${entry.sensorType}-${entry.id}`} className="border-b-2 border-black">
          <td className="p-3 bg-white">
            {new Date(entry.timestamp_server).toLocaleString()}
          </td>
          
          {/* HC Data */}
          {entry.sensorType === 'HC' ? (
            <>
              <td className="p-3 bg-blue-50 border-l-2 border-black">{hcNumber}</td>
              <td className="p-3 bg-blue-50">{entry.height?.toFixed(2)} cm</td>
              <td className="p-3 bg-blue-50">{entry.latency?.toFixed(2)} ms</td>
              <td className="p-3 bg-blue-50">{entry.accuracy?.toFixed(2)}%</td>
              <td className="p-3 bg-blue-50">{entry.error?.toFixed(2)}%</td>
              
              {/* Kosongkan kolom HY */}
              <td className="p-3 bg-yellow-50 border-l-2 border-black">-</td>
              <td className="p-3 bg-yellow-50">-</td>
              <td className="p-3 bg-yellow-50">-</td>
              <td className="p-3 bg-yellow-50">-</td>
              <td className="p-3 bg-yellow-50">-</td>
            </>
          ) : (
            <>
              {/* Kosongkan kolom HC */}
              <td className="p-3 bg-blue-50 border-l-2 border-black">-</td>
              <td className="p-3 bg-blue-50">-</td>
              <td className="p-3 bg-blue-50">-</td>
              <td className="p-3 bg-blue-50">-</td>
              <td className="p-3 bg-blue-50">-</td>
              
              {/* HY Data */}
              <td className="p-3 bg-yellow-50 border-l-2 border-black">{hyNumber}</td>
              <td className="p-3 bg-yellow-50">{entry.height?.toFixed(2)} cm</td>
              <td className="p-3 bg-yellow-50">{entry.latency?.toFixed(2)} ms</td>
              <td className="p-3 bg-yellow-50">{entry.accuracy?.toFixed(2)}%</td>
              <td className="p-3 bg-yellow-50">{entry.error?.toFixed(2)}%</td>
            </>
          )}
          
          <td className="p-3 bg-white border-l-4 border-black">
            <DeleteButton 
              onClick={() => handleDelete(entry.sensorType, entry.id)}
            />
          </td>
        </tr>
      );
    })}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DeleteButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="border-2 border-black p-1 bg-red-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  </button>
);

export default History;