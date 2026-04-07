import { useState } from "react";

function ImageUpload({ onImageSelected, darkmode }) {
  const [preview, setPreview] = useState(null);
  const [companionmode, setcompanionmode] = useState(false);
  const [companionurl, setcompanionurl] = useState("");
  const [sensorError, setSensorError] = useState("");
  const isValidIP = (ip) => {
    const regex =
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    return regex.test(ip);
  };

  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    let sensors = null;
    if (!file) return;
    if (companionmode) {
      if (!isValidIP(companionurl)) {
        setSensorError("❌ Invalid IP Address");
      } else {
        try {
          const response = await fetch("http://" + companionurl + "/data");
          sensors = await response.json();
          setSensorError("");
        } catch (err) {
          console.log(err);
          setSensorError("⚠️ Could not connect to Companion");
        }
      }
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);

      onImageSelected({
        image: reader.result,
        ...(sensors
          ? {
              temperature: sensors.temperature,
              humidity: sensors.humidity,
            }
          : {}),
      });
    };

    reader.readAsDataURL(file);
  };
  return (
    <div
      className={`flex flex-col items-center p-6 border-2 border-dashed rounded-lg shadow-sm mt-10 ${
        darkmode
          ? "bg-gray-700 text-white border-gray-500"
          : "bg-white text-gray-900 border-gray-300"
      }`}
    >
      <div
        className={`gap-8 flex flex-col m-8 justify-center items-center ${
          darkmode
            ? " text-white placeholder-white"
            : " text-black placeholder-black"
        }`}
      >
        <label className="flex items-center cursor-pointer group relative">
          <input
            className="peer sr-only"
            type="checkbox"
            onChange={(e) => setcompanionmode(e.currentTarget.checked)}
          />
          <div
            className="w-8 h-8 rounded-lg border-2 border-purple-500 transition-all duration-300 ease-in-out
            peer-checked:bg-gradient-to-br from-purple-500 to-pink-500
            peer-checked:border-0 peer-checked:rotate-12
            after:content-[''] after:absolute after:top-1/2 after:left-1/2
            after:-translate-x-1/2 after:-translate-y-1/2 after:w-5 after:h-5
            after:opacity-0
            after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')]
            after:bg-contain after:bg-no-repeat
            peer-checked:after:opacity-100
            after:transition-opacity after:duration-300
            hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          ></div>
          <span className="ml-3 text-xl font-medium">
            Companion Mode
          </span>
        </label>

        {companionmode && (
          <input
            onChange={(e) => setcompanionurl(e.currentTarget.value)}
            className={`p-4 text-xl border-4 outline-none rounded-xl w-fit border-purple-500 duration-500 text-center ${
              darkmode
                ? " text-white placeholder-white"
                : " text-black placeholder-black"
            }`}
            type="text"
            placeholder="IP Address of the Companion Device"
          />
        )}

        {/* ⚠️ Error */}
        {sensorError && (
          <p className="text-red-500 text-sm">{sensorError}</p>
        )}
      </div>
      <label
        htmlFor="fileUpload"
        className={`px-4 py-2 rounded cursor-pointer transition ${
          darkmode
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        Upload An Image
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md border border-gray-300"
        />
      )}

      <p className="mt-4 text-s text-gray-500">
        Upload a mango leaf image to detect disease
      </p>
    </div>
  );
}

export default ImageUpload; 