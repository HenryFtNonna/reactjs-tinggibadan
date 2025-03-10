import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

const SensorData = () => {
  const [hcData, setHcData] = useState({});
  const [hyData, setHyData] = useState({});

  useEffect(() => {
    const hcRef = ref(database, "HC");
    const hyRef = ref(database, "HY");

    onValue(hcRef, (snapshot) => setHcData(snapshot.val() || {}));
    onValue(hyRef, (snapshot) => setHyData(snapshot.val() || {}));
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 font-Poppins ">
      <div className="mx-auto max-w-2xl  border-4 border-black bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <SensorTitle>DATA SENSOR</SensorTitle>
        
        {/* Height Cards */}
        <div className="mb-2 grid gap-4 md:grid-cols-2">
          <SensorCard 
            title="HC-SR04" 
            value={hcData.height} 
            unit="cm" 
            color="blue"
          />
          <SensorCard
            title="HY-SRF05"
            value={hyData.height}
            unit="cm"
            color="yellow"
          />
        </div>

        {/* Detection Status Cards */}
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <DetectionCard 
            title="HC-SR04" 
            detected={hcData.objectDetected} 
          />
          <DetectionCard
            title="HY-SRF05"
            detected={hyData.objectDetected}
          />
        </div>

        {/* Comparison Table */}
        <div className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 text-left bg-white"></th>
                <th className="p-3 bg-[#04c4fe] border-l-2 border-black">HC-SR04</th>
                <th className="p-3 bg-[#fecb04] border-l-2 border-black">HY-SRF05</th>
              </tr>
            </thead>
            <tbody>
              <TableRow 
                label="Akurasi" 
                hcValue={hcData.accuracy} 
                hyValue={hyData.accuracy} 
                unit="%"
              />
              <TableRow 
                label="Error" 
                hcValue={hcData.errorPercent} 
                hyValue={hyData.errorPercent} 
                unit="%"
              />
              <TableRow 
                label="Latensi" 
                hcValue={hcData.latency} 
                hyValue={hyData.latency} 
                unit="ms"
              />
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 border-4 border-black bg-[#fecb04] p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
  <div className="animate-marquee-paused whitespace-nowrap">
    <span className="inline-block pr-8 font-bold text-lg">
      © 2024 By Mohan Henry Kusuma. All rights reserved.
    </span>
  </div>
</div>

      </div>
    </div>
  );
};

// Komponen Judul Sensor
const SensorTitle = ({ children }) => (
  <h2 className="mb-6 text-3xl font-black uppercase text-black border-b-4 border-black pb-2">
    {children}
  </h2>
);

// Komponen Kartu Tinggi
const SensorCard = ({ title, value, unit, color }) => {
  const colorClasses = {
    blue: 'bg-blue-200 border-blue-400',
    yellow: 'bg-yellow-200 border-yellow-400'
  };

  return (
    <div className={`border-4 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${colorClasses[color]}`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="text-4xl font-black">
        {value ? value.toFixed(0) : "--"} 
        <span className="text-2xl ml-2">{unit}</span>
      </div>
    </div>
  );
};

// Komponen Baris Tabel
const TableRow = ({ label, hcValue, hyValue, unit }) => (
  <tr className="border-b-2 border-black last:border-b-0">
    <td className="p-3 font-medium bg-white">{label}</td>
    <td className="p-3 bg-blue-100 border-l-2 border-black">
      <TableData value={hcValue} unit={unit} />
    </td>
    <td className="p-3 bg-yellow-100 border-l-2 border-black">
      <TableData value={hyValue} unit={unit} />
    </td>
  </tr>
);

// Komponen Data Tabel
const TableData = ({ value, unit }) => (
  <div className="flex justify-between items-center">
    <span>{value ? value.toFixed(2) : "--"}</span>
    <span className="text-sm opacity-75">{unit}</span>
  </div>
);

// Komponen Kartu Deteksi (Tambahkan ini di bawah komponen SensorCard)
const DetectionCard = ({ title, detected }) => {
  const statusColor = detected ? 'bg-green-400 border-green-600' : 'bg-red-400 border-red-600';
  const statusText = detected ? "Objek Terdeteksi " : "Tidak Ada Objek ";

  return (
    <div className={`border-4 p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${statusColor}`}>
      <h3 className="text-black font-bold mb-2">{title}</h3>
      <div className="text-gray-700 font-semibold flex items-center justify-between">
        <span>{statusText}</span>
        <span className="text-s">{detected ? "🔴" : "🟢"}</span>
      </div>
    </div>
  );
};
export default SensorData;