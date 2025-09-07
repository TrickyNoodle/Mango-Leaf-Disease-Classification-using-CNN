import { useState } from "react";

function BackendStatus() {
  const [status, setStatus] = useState("Unknown");

  const checkBackend = async () => {
    try {
      const res = await fetch("http://localhost:5000/");
      const data = await res.json();
      setStatus(data.Status || "Running");
    } catch (err) {
      setStatus("Backend unreachable");
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
      <span className="text-sm text-gray-700">
        Backend Status:{" "}
        <span
          className={`font-semibold ${
            status.includes("unreachable") ? "text-red-600" : "text-green-600"
          }`}
        >
          {status}
        </span>
      </span>
      <button
        onClick={checkBackend}
        className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Check Server
      </button>
    </div>
  );
}

export default BackendStatus;
