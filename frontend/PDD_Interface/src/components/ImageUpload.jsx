import { useState } from "react";

function ImageUpload({ onImageSelected, darkmode }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // show preview
      onImageSelected(reader.result); // pass base64 up
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`flex flex-col items-center p-6 border-2 border-dashed rounded-lg shadow-sm mt-20 ${darkmode ? "bg-gray-700 text-white border-gray-500" : "bg-white text-gray-900 border-gray-300"
        }`}
    >
      <label
        htmlFor="fileUpload"
        className={`px-4 py-2 rounded cursor-pointer transition ${darkmode
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
      >
        Upload An Image
      </label>
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

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
