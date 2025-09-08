function ResultCard({ prediction, darkmode }) {
  if (!prediction) return null;

  return (
    <div className={`mt-6 p-4  rounded-lg shadow-md text-center ${darkmode ? 'bg-gray-700 text-white' : 'bg-purple-200'}`}>
      <h2 className="text-lg font-semibold">Prediction Result</h2>
      <p className="text-green-600 mt-2">
        Disease: {prediction.class}
      </p>
      <p>
        Confidence: {(prediction.confidence * 100).toFixed(2)}%
      </p>
    </div>
  );
}

export default ResultCard;
