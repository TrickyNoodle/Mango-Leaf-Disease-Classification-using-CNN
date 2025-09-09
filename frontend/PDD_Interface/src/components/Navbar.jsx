import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar({ darkmode, onDarkModeChange }) {
  return (
    <div
      className={`relative flex items-center sticky top-0 backdrop-blur-2xl w-full delius shadow-2xl pacifico-regular py-6 px-6 ${
        darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Title perfectly centered */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-semibold hover:underline text-center">
        🍃 Mango Leaf Disease Detection Dashboard
      </h1>

      {/* Dark mode toggle on the right */}
      <div className="ml-auto flex items-center space-x-2">
        <label
          htmlFor="darkmodeswitch"
          className="flex items-center text-3xl cursor-pointer"
        >
          {darkmode ? <MdLightMode className="fill-white" /> : <MdDarkMode />}
        </label>
        <input
          id="darkmodeswitch"
          type="checkbox"
          checked={darkmode}
          onChange={onDarkModeChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default Navbar;
