import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Badge } from './ui/badge';
import { Ghost } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  
  // Destructure job properties for cleaner access
  const { _id, company, title, description, position, jobType, salary } = job || {};

  return (
    <div
      onClick={() => navigate(`/description/${_id}`)}
      role="button" // Indicate this is a button-like element
      tabIndex={0} // Make it focusable via keyboard
      onKeyPress={(e) => { if (e.key === 'Enter') navigate(`/description/${_id}`); }} // Handle Enter key
      className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500'
      aria-label={`View details for ${title || 'Job Title'}`}
    >
      <div>
        <h2 className='font-medium text-lg'>{company?.name || 'Unknown Company'}</h2>
        <p className='text-sm text-gray-500'>India</p>
      </div>

      <div>
        <h3 className='font-bold text-lg my-2'>{title || 'Job Title'}</h3>
        <p className='text-sm text-gray-600'>{description || 'No description available.'}</p>
      </div>

      <div className='flex items-center mt-4 gap-2 flex-wrap'>
        {position && (
          <Badge className='text-blue-700 font-bold' variant={Ghost}>
            {position} Position
          </Badge>
        )}
        {jobType && (
          <Badge className='text-[#F83002] font-bold' variant={Ghost}>
            {jobType}
          </Badge>
        )}
        {salary && (
          <Badge className='text-[#7209b7] font-bold' variant={Ghost}>
            {salary} LPA
          </Badge>
        )}
      </div>
    </div>
  );
};

// PropTypes for validation
LatestJobCards.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.string,
    jobType: PropTypes.string,
    salary: PropTypes.string,
  }),
};

export default LatestJobCards;
