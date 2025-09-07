function ResultCard({ prediction }) {
  if (!prediction) return null;

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-lg font-semibold text-gray-800">Prediction Result</h2>
      <p className="text-green-600 mt-2">
        Disease: {prediction.class}
      </p>
      <p className="text-gray-600">
        Confidence: {(prediction.confidence * 100).toFixed(2)}%
      </p>
    </div>
  );
}

export default ResultCard;
