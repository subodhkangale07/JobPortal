import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';

// Components
import Navbar from '../shared/navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Building, ArrowRight, X, Loader2 } from 'lucide-react';

// Utilities & API
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { setSingleCompany } from '@/redux/companySlice';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Load existing companies for potential duplicate checking
  useGetAllCompanies();

  const validateInput = () => {
    if (!companyName.trim()) {
      setError('Company name is required');
      return false;
    }
    if (companyName.length < 2) {
      setError('Company name must be at least 2 characters');
      return false;
    }
    setError('');
    return true;
  };

  const registerNewCompany = async () => {
    if (!validateInput()) return;

    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`, 
        { companyName: companyName.trim(), token }, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message || 'Company created successfully!');
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error?.response?.data?.message || "An error occurred while creating the company.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isSubmitting) {
      registerNewCompany();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto p-4 mt-16">
        <Card className="shadow-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Building className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create Company</CardTitle>
            <CardDescription className="text-center">
              What would you like to name your company? You can change this later.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-left">
                Company Name
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="JobHunt, Microsoft, etc."
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (error) setError('');
                }}
                onKeyDown={handleKeyDown}
                className={`transition-all ${error ? 'border-red-500 ring-red-100' : ''}`}
                disabled={isSubmitting}
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
              )}
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-sm text-blue-700">
              <p className="flex items-start">
                <svg className="h-5 w-5 mr-2 mt-0.5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Choose a name as it appears on your official documents. You'll be able to add a trading name later.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin/companies")}
              disabled={isSubmitting}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
            <Button 
              onClick={registerNewCompany} 
              disabled={isSubmitting || !companyName.trim()}
              className="flex items-center gap-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          Need help? <a href="/support" className="text-primary hover:underline">Contact support</a>
        </p>
      </div>
    </div>
  );
};

export default CompanyCreate;