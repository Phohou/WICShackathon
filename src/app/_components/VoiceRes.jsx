'use client'

import React from 'react'
import { useNavigate } from 'react-router-dom';

function VoiceRes() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/loading.tsx'); 
    };

    return (
        <div 
            className='flex min-h-screen flex-col items-center justify-center p-24'>
            <h1>
            voice recognition will go here
            </h1>
            <button 
                onClick={handleClick}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Start
            </button>
        </div>
    )
}

export default VoiceRes