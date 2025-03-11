import React, { useEffect, useState } from "react";

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10; // Naikkan progress setiap 200ms
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        <div className="w-64 h-6 border-4 border-black relative">
          <div
            className="h-full bg-yellow-400 absolute top-0 left-0"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;