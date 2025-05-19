import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Software Developer",
  "Graphic Designer",
  "Data Scientist" // Fixed duplicate "Software Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  }

  return (
    <div>
      <Carousel className='w-full max-w-3xl mx-auto'>
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 p-2'>
              <Button 
                onClick={() => searchJobHandler(cat)} 
                variant='ghost' 
                className='rounded-full text-sm md:text-base py-3 px-6 hover:bg-purple-700 hover:text-white transition-colors duration-300'
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
