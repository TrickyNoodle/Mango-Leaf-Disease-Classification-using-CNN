function ResultCard({ prediction, darkmode, url }) {
  if (!prediction) return null;
  if (prediction.error) {
    return (
      <div
        className={`mt-6 p-6 rounded-lg text-center border-2 border-red-600 ${darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
      >
        <h2 className="text-xl font-semibold mb-2">An Unexpected Error Has Occured!</h2>
      </div>
    )
  }
  else
    if (url) {
      return (
        <div
          className={`mt-6 p-6 rounded-lg shadow-md text-center ${darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
        >
          <h2 className="text-xl font-semibold mb-2">Prediction Result</h2>
          {/* <img src={prediction} alt="" /> */}
          <div className="flex gap-2 overflow-x-scroll">

            {prediction['predictions'].map((element, idx) => {
              return (
                <div className="p-2 border rounded-md">
                  {idx + 1}
                  <p
                    className={`mt-2 font-medium ${element.label.toLowerCase().includes('healthy')
                      ? "text-green-600"
                      : "text-red-600"
                      }`}
                  >
                    Disease: {element.label}
                  </p>
                  <p className="mt-1 text-sm">
                    Confidence: {(element.confidence * 100).toFixed(2)}%
                  </p>
                </div>
              )
            })
            }
          </div>
        </div>
      )
    }
    else {
      return (
        <div
          className={`mt-6 p-6 rounded-lg shadow-md text-center ${darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
        >
          <h2 className="text-xl font-semibold mb-2">Prediction Result</h2>
          <div className="flex gap-2 overflow-x-scroll">
            {prediction['predictions'].map((element, idx) => {
              return (
                <div className="p-2 border rounded-md">
                  {idx + 1}
                  <p
                    className={`mt-2 font-medium ${element.label.toLowerCase().includes('healthy')
                      ? "text-green-600"
                      : "text-red-600"
                      }`}
                  >
                    Disease: {element.label}
                  </p>
                  <p className="mt-1 text-sm">
                    Confidence: {(element.confidence * 100).toFixed(2)}%
                  </p>
                </div>
              )
            })
            }
          </div>
        </div>
      );
    }
}

export default ResultCard;
