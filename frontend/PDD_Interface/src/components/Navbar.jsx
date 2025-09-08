import { React, useRef } from 'react'
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar({ darkmode, darkmodechange }) {

    const darkmodeswitch = useRef()
    return (
        <div className={`flex sticky top-0 backdrop-blur-2xl  w-full delius shadow-2xl justify-between align-middle pacifico-regular ${darkmode ? 'bg-gray-700 text-white' : 'bg-purple-300'}`}>
            <div>
                <h1 className='text-3xl py-3 p-2 hover:underline'>🍃 Mango Leaf Disease Detection</h1>
            </div>
            <div className='flex items-center px-2'>
                <label htmlFor='darkmodeswitch' className='flex h-full items-center text-3xl'>
                    {darkmode ? <MdLightMode className='fill-white' /> : <MdDarkMode />}
                </label>
                <input className="opacity-0 w-0 h-0" type="checkbox" ref={darkmodeswitch} onChange={() => darkmodechange(darkmodeswitch)} id='darkmodeswitch' />
            </div>
        </div>
    )
}

export default Navbar
