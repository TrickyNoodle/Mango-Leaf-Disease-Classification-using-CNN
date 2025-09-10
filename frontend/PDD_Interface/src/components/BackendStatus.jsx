import { useEffect, useState } from "react";


function BackendStatus({ darkmode, backend }) {
  const [status, setStatus] = useState("Unknown");

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    try {
      const res = await fetch(backend);
      const data = await res.json();
      setStatus(data.Status);
    } catch (err) {
      setStatus("Server Down");
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-lg shadow-md mb-10 fixed bottom-4 left-1/2 transform -translate-x-1/2 
      ${darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
    >
      <span className="text-sm text-center">
        Backend Status:{" "}
        <span
          className={`font-semibold ${status.includes("Down") ? "text-red-600" : "text-green-600"
            }`}
        >
          {status}
        </span>
      </span>
      <button
        onClick={checkBackend}
        className="px-4 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Check Server
      </button>
    </div>
  );
}

export default BackendStatus;
