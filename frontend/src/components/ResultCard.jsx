const diseaseRules = {
  "Anthracnose": { temp: [25, 32], humidity: [80, 100] },
  "Bacterial Canker": { temp: [20, 30], humidity: [70, 90] },
  "Cutting Weevil": { temp: [25, 35], humidity: [40, 70] },
  "Die Back": { temp: [28, 35], humidity: [60, 80] },
  "Gall Midge": { temp: [20, 30], humidity: [60, 85] },
  "Powdery Mildew": { temp: [18, 28], humidity: [60, 80] },
  "Sooty Mould": { temp: [25, 35], humidity: [70, 95] },
  "Healthy": { temp: [20, 30], humidity: [40, 70] }
};
function getRisk(disease, temp, humidity, confidence) {
  const rule = diseaseRules[disease];
  if (!rule || temp == null || humidity == null) return null;

  const tempOk = temp >= rule.temp[0] && temp <= rule.temp[1];
  const humOk = humidity >= rule.humidity[0] && humidity <= rule.humidity[1];

  if (disease === "Healthy") return "Healthy 🌱";

  if (tempOk && humOk) {
    return confidence > 0.8 ? "VERY HIGH RISK ⚠️" : "HIGH RISK ⚠️";
  } else if (tempOk || humOk) {
    return "MODERATE RISK ⚠️";
  } else {
    return "LOW RISK ✅";
  }
}
function getRecommendation(disease) {
  const map = {
    "Anthracnose": "Apply fungicide, avoid overhead watering",
    "Bacterial Canker": "Prune infected parts, use copper spray",
    "Cutting Weevil": "Use insecticide, monitor leaves",
    "Die Back": "Cut affected branches, improve nutrition",
    "Gall Midge": "Use neem oil spray",
    "Powdery Mildew": "Apply sulfur spray, reduce humidity",
    "Sooty Mould": "Control insects, clean leaves",
    "Healthy": "Maintain current conditions"
  };
  return map[disease] || "No suggestion";
}
function getRiskColor(risk) {
  if (!risk) return "";
  if (risk.includes("VERY HIGH")) return "text-red-600";
  if (risk.includes("HIGH")) return "text-orange-500";
  if (risk.includes("MODERATE")) return "text-yellow-500";
  if (risk.includes("LOW")) return "text-green-600";
  return "";
}

function ResultCard({ prediction, darkmode, url }) {
  if (!prediction) return null;

  if (prediction.error) {
    return (
      <div
        className={`mt-6 p-6 rounded-lg text-center border-2 border-red-600 ${
          darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">{prediction.error}</h2>
      </div>
    );
  }

  const temp = prediction.temperature;
  const humidity = prediction.humidity;

  return (
    <div
      className={`mt-6 p-6 rounded-lg shadow-md text-center ${
        darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-xl font-semibold mb-2">Prediction Result</h2>
      {url && prediction.image && (
        <img
          className="w-full mx-auto rounded-md m-4"
          src={"data:image/jpeg;base64," + prediction.image}
          alt=""
        />
      )}
      <div className="flex gap-3 overflow-x-auto">
        {prediction.predictions.map((element, idx) => {
          const risk = getRisk(
            element.label,
            temp,
            humidity,
            element.confidence
          );
          const recommendation = getRecommendation(element.label);

          return (
            <div
              key={idx}
              className="min-w-[220px] p-3 border rounded-md shadow-sm"
            >
              <p className="text-sm font-bold">{idx + 1}</p>
              <p
                className={`mt-2 font-medium ${
                  element.label.toLowerCase().includes("healthy")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Disease: {element.label}
              </p>
              <p className="mt-1 text-sm">
                Confidence: {(element.confidence * 100).toFixed(2)}%
              </p>
              {temp != null && humidity != null ? (
                <>
                  <p className="text-sm mt-2">🌡 Temp: {temp}°C</p>
                  <p className="text-sm">💧 Humidity: {humidity}%</p>

                  {/* Risk */}
                  {risk && (
                    <p className={`mt-2 font-semibold ${getRiskColor(risk)}`}>
                      {risk}
                    </p>
                  )}

                  {/* Recommendation */}
                  <p className="text-xs mt-2">
                    💡 {recommendation}
                  </p>
                </>
              ) : (
                <p className="text-xs mt-2 text-gray-400">
                  ⚠️ No sensor data available
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResultCard;