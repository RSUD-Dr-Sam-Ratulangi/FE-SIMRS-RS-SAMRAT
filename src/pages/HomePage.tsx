import React from "react";
import { BoltIcon } from '@heroicons/react/24/solid'

const HomePage = () => {
    return (
        <div className="h-screen grid justify-center items-center">
                <p className="text text-4xl text-center">SISTEM INFORMASI RSUD DR. SAMRATULANGI TONDANO</p>
            <div className="flex justify-center">
                <BoltIcon className="h-10 w-10 text-center" />
            </div>
        </div>
    )
}

export default HomePage;