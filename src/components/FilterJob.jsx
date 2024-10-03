import React, { useEffect, useState } from 'react'
import { RadioGroup } from './ui/radio-group'
import { RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';


const filterData = [
  {
    filterType: "Location",
    array: ["Mumbai", "Delhi NCR", "Hyderabad", "Bangalore", "Pune", "Gurgaon", "Nagpur", "Chennai"]
  },
  {
    filterType: "Industry",
    array: ["Technology", "Finance", "Healthcare"]
  },
  {
    filterType: "Salary Range",
    array: ["₹5k - ₹10k pm", "₹10k - ₹20k pm", "₹20k - ₹40k pm", "₹40k - ₹100k pm"]
  }

]

const FilterJob = () => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showMoreItems, setShowMoreItems] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const handlerChange = (value) => {
    setSelectedValue(value);
  }

  const toggleShowMoreFilters = () => {
    setShowMoreFilters(prev => !prev);
  };

  const toggleShowMoreItems = (filterType) => {
    setShowMoreItems(prevState => ({
      ...prevState,
      [filterType]: !prevState[filterType]
    }));
  };

  const initialLimit = 3; // Number of filters to display initially
  const itemLimit = 3; // Number of items to display initially per filter type

 useEffect( () => {
  dispatch(setSearchedQuery(selectedValue));
 },[selectedValue])

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      {
        filterData
          .slice(0, showMoreFilters ? filterData.length : initialLimit) // Show limited or all filters
          .map((data, index) => (
            <div key={index} className='mb-4'>
              <h2 className='font-bold text-lg'>{data.filterType}</h2>
              <RadioGroup value={selectedValue} onValueChange={handlerChange}>
                {
                  data.array
                    .slice(0, showMoreItems[data.filterType] ? data.array.length : itemLimit) // Show limited or full items
                    .map((item, idx) => (
                      <div key={idx} className='flex items-center space-x-2 '>
                        <RadioGroupItem value={item} id={`${data.filterType}-${idx}`} />
                        <Label htmlFor={`${data.filterType}-${idx}`}>{item}</Label>
                      </div>
                    ))
                }
              </RadioGroup>

              {/* Show more items button */}
              {
                data.array.length > itemLimit && (
                    
                  <button
                    onClick={() => toggleShowMoreItems(data.filterType)}
                    className='text-blue-500 hover:underline mt-2'
                  >
                    {showMoreItems[data.filterType] ? 'Show Less' : 'Show More'}
                  </button> 
                  
                )
              }
            </div>
            
          ))
      }

      {/* Show more filters button */}
      {
        filterData.length > initialLimit && (
          <div className='flex items-center gap-1'>
            <button
            onClick={toggleShowMoreFilters}
            className='text-blue-500 hover:underline mt-2'
          >
            {showMoreFilters ? 'Show Less Filters' : 'Show More Filters'}
          </button>
          <RiArrowDropDownLine className='mt-2 text-blue-500 hover:underline  '/>
            </div>
          
        )
      }
    </div>
  )
}

export default FilterJob;