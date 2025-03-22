import React from 'react'
import {ModeToggle} from "./ModeToggle"

function Header() {
    return (
        <div className='p-5 flex items-center justify-between shadow-md'>
            <h1 className='text-2xl font-bold'>NestCents</h1>
            <ModeToggle />
        </div>
    )
}

export default Header