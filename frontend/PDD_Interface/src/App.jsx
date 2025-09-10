import { useState } from "react";
import BackendStatus from "./components/BackendStatus";
import ImageUpload from "./components/ImageUpload";
import ResultCard from "./components/ResultCard";
import Navbar from "./components/Navbar";
let backend = import.meta.env.VITE_BACKEND_ADDRESS
function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const handleDarkModeChange = (e) => {
    setDarkmode(e.target.checked);
  };
  const handleImageSelected = async (base64Image) => {
    setPrediction(null); // clear previous
    setLoading(true);

    try {
      const res = await fetch(backend + "/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error("Prediction failed:", err);
      setPrediction({ class: "Error", confidence: 0 });
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

      <BackendStatus darkmode={darkmode} backend={backend} />

      <div className="mt-6 w-full max-w-md">
        <ImageUpload darkmode={darkmode} onImageSelected={handleImageSelected} />

        {loading && (
          <div className="mt-6 flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        <ResultCard prediction={prediction} darkmode={darkmode} />
      </div>
    </div>
  );
}

export default App;
