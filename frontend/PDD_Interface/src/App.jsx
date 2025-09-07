import { useState } from "react";
import BackendStatus from "./components/BackendStatus";
import ImageUpload from "./components/ImageUpload";
import ResultCard from "./components/ResultCard";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelected = async (base64Image) => {
    setPrediction(null); // clear previous
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/predict", {
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
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        🍃 Mango Leaf Disease Detection
      </h1>

      <BackendStatus />

      <div className="mt-6 w-full max-w-md">
        <ImageUpload onImageSelected={handleImageSelected} />

        {loading && (
          <div className="mt-6 flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        <ResultCard prediction={prediction} />
      </div>
    </div>
  );
}

export default App;
