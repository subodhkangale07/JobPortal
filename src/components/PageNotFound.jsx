import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center mt-[280px] gap-5'>
     <h2 className='text-xl '>404 Page Not Found </h2>
     <Button onClick={ () => navigate('/login')}>Login</Button>
    
    </div>
  )
}

export default PageNotFound