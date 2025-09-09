function ImageUpload({ onImageSelected, darkmode }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected(reader.result); // pass base64 to parent
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`flex flex-col items-center p-6 border-2 border-dashed rounded-lg shadow-sm ${darkmode ? 'bg-gray-700 text-white' : 'bg-purple-200'}`}>
      <input
        type="file"
        accept='image/*;capture="camera"'
        onChange={handleFileChange}
        className="mb-2"
      />
      <p className="text-xs text-gray-500">Upload a mango leaf image</p>
    </div>
  );
}

export default ImageUpload;
