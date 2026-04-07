import { useState } from "react";
import BackendStatus from "./components/BackendStatus";
import ImageUpload from "./components/ImageUpload";
import ResultCard from "./components/ResultCard";
import Navbar from "./components/Navbar";
import Note from "./components/Note";

let backend = import.meta.env.VITE_BACKEND_ADDRESS;

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkmode, setDarkmode] = useState(true);
  const [url, seturl] = useState(false);

  const handleDarkModeChange = (e) => {
    setDarkmode(e.target.checked);
  };

  const handleurlModeChange = (e) => {
    seturl(e.target.checked);
  };
  const handleImageSelected = async (dataFromUpload) => {
    setPrediction(null);
    setLoading(true);

    try {
      const res = await fetch(
        backend + (url ? "/alt-predict" : "/predict"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: dataFromUpload.image,
            temperature: dataFromUpload.temperature,
            humidity: dataFromUpload.humidity,
          }),
        }
      );

      const data = await res.json();
      setPrediction({
        ...data,
        temperature: dataFromUpload.temperature,
        humidity: dataFromUpload.humidity,
      });

    } catch (err) {
      console.error("Prediction failed:", err);
      setPrediction({ error: "Server not up" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center transition-colors duration-300
        ${darkmode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"}`}
    >
      <Navbar darkmode={darkmode} onDarkModeChange={handleDarkModeChange} />
      <label className="relative inline-flex items-center cursor-pointer mt-6">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handleurlModeChange}
        />
        <div
          className="
    w-28 h-14 bg-blue-300 rounded-full
    relative
    transition-all duration-300
    peer-focus:ring-4 peer-focus:ring-blue-500

    after:content-['No']
    after:absolute after:top-1 after:left-1
    after:h-12 after:w-12
    after:bg-white after:rounded-full
    after:flex after:items-center after:justify-center
    after:font-bold after:text-sky-800
    after:transition-all after:duration-500

    peer-checked:after:translate-x-14
    peer-checked:after:content-['Yes']
  "
        ></div>
      </label>
      <span className="ml-3 text-md font-bold mt-1">
        Use Advanced Mode
      </span>
      <div className="md:flex flex-col items-center w-full">
        <ImageUpload
          darkmode={darkmode}
          onImageSelected={handleImageSelected}
        />
        <ResultCard
          prediction={prediction}
          darkmode={darkmode}
          url={url}
        />
      </div>
      <BackendStatus
        darkmode={darkmode}
        backend={backend}
        prediction={prediction}
      />

      <Note darkmode={darkmode} />
      {loading && (
        <div className="flex w-full justify-center fixed items-center h-full backdrop-blur-xs animate-pulse">
          <div className="w-30 h-30 border-15 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default App;