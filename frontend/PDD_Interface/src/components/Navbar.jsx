import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar({ darkmode, onDarkModeChange }) {
  return (
    <div
      className={`sticky flex items-center top-0 backdrop-blur-2xl w-full shadow-2xl pacifico-regular font-ps py-6 px-6 ${darkmode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
    >

      <h1 className="sm:absolute left-0 right-0 mx-auto  text-2xl md:text-3xl font-semibold hover:underline text-center">
        🍃 Mango Leaf Disease Detection Dashboard
      </h1>

      <div className="z-10 ml-auto flex items-center space-x-2">
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
