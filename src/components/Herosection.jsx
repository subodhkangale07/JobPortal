import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const Herosection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse')
    }
    
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002]'>No.1 Job Finding Website</span>
                <h1 className='text-5xl font-bold'>Seach, Apply & <br />Get your <span className='text-[#6A38C2]'>Dream Job</span></h1>

                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, accusantium! Deleniti provident accusamus corrupti.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                    onChange={(e) => setQuery(e.target.value)}
                        type='text'
                        placeholder='Find your Job/Internships'
                        className='outline-none border-none w-full '
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]' >
                        <Search className='h-5 w-5 ' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Herosection