import { useState } from "react"
import React from 'react'

function Note({ darkmode }) {
    const [shown, setshown] = useState(true)
    return (
        <div className={`transition-all ease-in-out duration-300 ${darkmode ? 'bg-gray-700' : 'bg-white'} ${shown ? 'fixed' : 'hidden'} bottom-0 left-0 right-0 drop-shadow-2xl hover:bg-orange-400`} onClick={() => setshown(false)}>
            <marquee behavior="scroll" direction="">
                <p className='text-xl'>
                    Note: Prediction's may not be always <b className='text-blue-500'>Correct</b>
                </p>
            </marquee>
        </div>
    )
}

export default Note
