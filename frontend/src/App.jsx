import { useState } from "react";
import BackendStatus from "./components/BackendStatus";
import ImageUpload from "./components/ImageUpload";
import ResultCard from "./components/ResultCard";
import Navbar from "./components/Navbar";
import Note from "./components/Note";
let backend = import.meta.env.VITE_BACKEND_ADDRESS
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
  const handleImageSelected = async (base64Image) => {
    setPrediction(null); // clear previous
    setLoading(true);

    try {
      const res = await fetch(backend + (url ? "/alt-predict" : "/predict"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error("Prediction failed:", err);
      setPrediction({ 'error': 'Server not up' });
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
      <div className="flex flex-col items-center mt-6">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" onChange={handleurlModeChange} />
          <div className="rounded-full peer outline-none duration-100 after:duration-300 w-28 h-14 bg-blue-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500  after:content-['No'] after:absolute after:outline-none after:h-12 after:w-12 after:bg-white after:top-1 after:left-1 after:flex after:justify-center after:items-center  after:text-sky-800 after:font-bold peer-checked:after:translate-x-14 peer-checked:after:content-['Yes'] peer-checked:after:border-white after:rounded-full">
          </div>
        </label>
        <span className="text-md font-bold">
          Use Advanced Mode
        </span>
      </div>


      <div className={`md:flex flex-col not-[md]:w-full items-center`}>
        <ImageUpload darkmode={darkmode} onImageSelected={handleImageSelected} />
        <ResultCard prediction={prediction} darkmode={darkmode} url={url} />
      </div>
      <BackendStatus darkmode={darkmode} backend={backend} prediction={prediction} />
      <Note darkmode={darkmode} />
      {loading && (
        <div className="flex w-full justify-center fixed items-center h-full backdrop-blur-xs animate-pulse">
          <div
            className="w-30 h-30 border-15 border-t-blue-500 border-gray-300 rounded-full animate-spin"
          ></div>
        </div>
      )}
    </div>
  );
}

export default App;
