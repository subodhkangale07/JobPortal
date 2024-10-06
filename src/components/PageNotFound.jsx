import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center justify-center min-h-screen gap-5'>
            <h2 className='text-4xl font-bold text-center'>404 Page Not Found</h2>
            <p className='text-lg text-gray-500'>Oops! The page you are looking for doesn't exist.</p>
            <Button onClick={() => navigate('/login')} className='mt-4'>Go to Login</Button>
        </div>
    );
};

export default PageNotFound;
