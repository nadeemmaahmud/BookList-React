import React from 'react';
import Navbar from './Navbar';

const NotFound = () => {
    return (
        <div>
            <Navbar/>
            <div className='bg-emerald-500 min-h-screen text-center py-100'>
                <h1 className='text-4xl font-bold text-white'>Page Not Found!</h1>
                <p className='text-white'>Please, try with correct url!</p>
            </div>
        </div>
    );
};

export default NotFound;