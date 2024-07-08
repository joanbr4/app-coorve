import { useEffect, useState } from "react";

function Facturación() {
  const [status, setStatus] = useState("Cooming soon new features...");

  useEffect(() => {
    const statuses = [
      "Worker is processing...",
      "Still working...",
      "Almost there...",
      // "Just a moment more...",
    ];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      setStatus(statuses[currentIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin text-7xl">⚙️</div>
        <div className="mt-4 text-xl text-gray-700">{status}</div>
      </div>
    </>
  );
}
export { Facturación };
