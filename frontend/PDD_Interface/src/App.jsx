import { useState } from "react";
import BackendStatus from "./components/BackendStatus";
import ImageUpload from "./components/ImageUpload";
import ResultCard from "./components/ResultCard";
import Navbar from "./components/Navbar";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkmode, setDarkmode] = useState(false)

  const darkmodechange = (darkmodeswitch) => {
    if (darkmodeswitch.current.checked == true) {
      setDarkmode(true)
    }
    else {
      setDarkmode(false)
    }
    console.log(darkmode)
  }

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
    <div className={`min-h-screen bg-gray-50 flex flex-col items-center ${darkmode ? 'bg-gray-900 text-white' : 'bg-purple-500'}`}>
      <Navbar darkmode={darkmode} darkmodechange={darkmodechange} />

      <BackendStatus darkmode={darkmode} />

      <div className={`mt-6 w-full max-w-md`}>
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
