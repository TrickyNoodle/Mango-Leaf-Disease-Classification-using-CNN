import { useEffect, useState } from "react";

function BackendStatus({ darkmode }) {
  const [status, setStatus] = useState("Unknown");

  useEffect(() => {
    checkBackend();
  }, []);

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
    <div className={`flex items-center gap-4 p-4 rounded-lg shadow-sm m-4 fixed bottom-0 right-0 ${darkmode ? 'bg-gray-700' : 'bg-purple-300'}`}>
      <span className="text-sm">
        Backend Status:{" "}
        <span
          className={`font-semibold text-gray-500 ${status.includes("unreachable") ? "text-red-600" : "text-green-600"
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
