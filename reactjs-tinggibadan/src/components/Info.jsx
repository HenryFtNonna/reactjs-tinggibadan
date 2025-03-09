
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

const SensorData = () => {
  const [hcData, setHcData] = useState({});
  const [hyData, setHyData] = useState({});

  useEffect(() => {
    // Referensi ke data HC-SR04
    const hcRef = ref(database, "HC");
    const hyRef = ref(database, "HY");

    // Listener realtime untuk HC-SR04
    onValue(hcRef, (snapshot) => {
      const data = snapshot.val();
      setHcData(data);
    });

    // Listener realtime untuk HY-SRF05
    onValue(hyRef, (snapshot) => {
      const data = snapshot.val();
      setHyData(data);
    });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Data Sensor</h2>
      <div style={{ marginBottom: "1rem" }}>
        <h3>HC-SR04</h3>
        <p>Tinggi      : {hcData.height ? hcData.height.toFixed(2) : "--"} cm</p>
        <p>Akurasi    : {hcData.accuracy ? hcData.accuracy.toFixed(2) : "--"} %</p>
        <p>Latensi    : {hcData.latency ? hcData.latency.toFixed(2) : "--"} ms</p>
        <p>Error    : {hcData.errorPercent ? hcData.errorPercent.toFixed(2) : "--"} %</p>
        <p>Deteksi    : {hcData.objectDetected ? "Manusia Terdeteksi" : "Tidak ada manusia"}</p>
      </div>
      <div>
        <h3>HY-SRF05</h3>
        <p>Tinggi      : {hyData.height ? hyData.height.toFixed(2) : "--"} cm</p>
        <p>Akurasi    : {hyData.accuracy ? hyData.accuracy.toFixed(2) : "--"} %</p>
        <p>Latensi    : {hyData.latency ? hyData.latency.toFixed(2) : "--"} ms</p>
        <p>Error    : {hyData.errorPercent ? hyData.errorPercent.toFixed(2) : "--"} %</p>
        <p>Deteksi    : {hyData.objectDetected ? "Manusia Terdeteksi" : "Tidak ada manusia"}</p>
      </div>
    </div>
  );
};

export default SensorData;
