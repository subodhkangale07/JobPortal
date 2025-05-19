import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  ChevronsUpDown, 
  DollarSign, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  RefreshCw 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from './shared/navbar';

const industryData = {
  "Software Development": {
    baseRange: { min: 65000, max: 180000 },
    experienceMultiplier: 1.15,
    educationBonus: {
      "High School": 0,
      "Associate's": 0.05,
      "Bachelor's": 0.15,
      "Master's": 0.25,
      "PhD": 0.35
    },
    locationMultiplier: {
      "San Francisco": 1.5,
      "New York": 1.4,
      "Seattle": 1.3,
      "Austin": 1.1,
      "Chicago": 1.1,
      "Remote": 0.9,
      "India":0.8,
      "Other": 0.85
    }
  },
  "Data Science": {
    baseRange: { min: 70000, max: 190000 },
    experienceMultiplier: 1.12,
    educationBonus: {
      "High School": 0,
      "Associate's": 0.03,
      "Bachelor's": 0.12,
      "Master's": 0.28,
      "PhD": 0.4
    },
    locationMultiplier: {
      "San Francisco": 1.45,
      "New York": 1.4,
      "Seattle": 1.25,
      "Austin": 1.1,
      "Chicago": 1.05,
      "Remote": 0.9,
      "Other": 0.85
    }
  },
  "Marketing": {
    baseRange: { min: 55000, max: 150000 },
    experienceMultiplier: 1.1,
    educationBonus: {
      "High School": 0,
      "Associate's": 0.05,
      "Bachelor's": 0.15,
      "Master's": 0.2,
      "PhD": 0.25
    },
    locationMultiplier: {
      "San Francisco": 1.35,
      "New York": 1.4,
      "Seattle": 1.2,
      "Austin": 1.1,
      "Chicago": 1.1,
      "Remote": 0.95,
      "Other": 0.9
    }
  },
  "Design": {
    baseRange: { min: 60000, max: 160000 },
    experienceMultiplier: 1.1,
    educationBonus: {
      "High School": 0,
      "Associate's": 0.08,
      "Bachelor's": 0.15,
      "Master's": 0.2,
      "PhD": 0.22
    },
    locationMultiplier: {
      "San Francisco": 1.4,
      "New York": 1.4,
      "Seattle": 1.25,
      "Austin": 1.1,
      "Chicago": 1.05,
      "Remote": 0.95,
      "Other": 0.9
    }
  },
  "Finance": {
    baseRange: { min: 70000, max: 200000 },
    experienceMultiplier: 1.15,
    educationBonus: {
      "High School": 0,
      "Associate's": 0.03,
      "Bachelor's": 0.15,
      "Master's": 0.3,
      "PhD": 0.4
    },
    locationMultiplier: {
      "San Francisco": 1.3,
      "New York": 1.5,
      "Seattle": 1.15,
      "Austin": 1.05,
      "Chicago": 1.2,
      "Remote": 0.85,
      "Other": 0.8
    }
  },
  "Healthcare": {
    baseRange: { min: 65000, max: 210000 },
    experienceMultiplier: 1.12,
    educationBonus: {
      "High School": 0,
      "Associate's": 0.1,
      "Bachelor's": 0.2,
      "Master's": 0.35,
      "PhD": 0.5
    },
    locationMultiplier: {
      "San Francisco": 1.3,
      "New York": 1.35,
      "Seattle": 1.2,
      "Austin": 1.05,
      "Chicago": 1.1,
      "Remote": 0.8,
      "Other": 0.9
    }
  },
  "Sales": {
    baseRange: { min: 50000, max: 180000 },
    experienceMultiplier: 1.2,
    educationBonus: {
      "High School": 0,
      "Associate's": 0.03,
      "Bachelor's": 0.1,
      "Master's": 0.15,
      "PhD": 0.15
    },
    locationMultiplier: {
      "San Francisco": 1.35,
      "New York": 1.35,
      "Seattle": 1.2,
      "Austin": 1.15,
      "Chicago": 1.15,
      "Remote": 1,
      "Other": 0.9
    }
  }
};

const SalaryCalculator = () => {
  const [industry, setIndustry] = useState("Software Development");
  const [location, setLocation] = useState("San Francisco");
  const [yearsExperience, setYearsExperience] = useState(3);
  const [education, setEducation] = useState("Bachelor's");
  const [salaryEstimate, setSalaryEstimate] = useState({ low: 0, mid: 0, high: 0 });
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate salary when any input changes
  useEffect(() => {
    calculateSalary();
  }, [industry, location, yearsExperience, education]);

  const calculateSalary = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const industryInfo = industryData[industry];
      
      // Base calculation
      const baseMin = industryInfo.baseRange.min;
      const baseMax = industryInfo.baseRange.max;
      
      // Experience factor (diminishing returns after 15 years)
      const expFactor = Math.min(15, yearsExperience);
      const expMultiplier = 1 + ((expFactor * industryInfo.experienceMultiplier) / 100);
      
      // Education bonus
      const eduBonus = industryInfo.educationBonus[education];
      
      // Location multiplier
      const locMultiplier = industryInfo.locationMultiplier[location];
      
      // Calculate ranges
      const lowEstimate = Math.round((baseMin * expMultiplier * (1 + eduBonus) * locMultiplier) / 1000) * 1000;
      const highEstimate = Math.round((baseMax * expMultiplier * (1 + eduBonus) * locMultiplier) / 1000) * 1000;
      const midEstimate = Math.round((lowEstimate + highEstimate) / 2);
      
      setSalaryEstimate({
        low: lowEstimate,
        mid: midEstimate,
        high: highEstimate
      });
      
      setIsCalculating(false);
    }, 600);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleReset = () => {
    setIndustry("Software Development");
    setLocation("San Francisco");
    setYearsExperience(3);
    setEducation("Bachelor's");
  };

  return (
    <div> <Navbar/>
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Salary Calculator
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Estimate your market value based on industry, location, experience, and education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calculator Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  Input Details
                </CardTitle>
                <CardDescription>
                  Provide information about your job to calculate an estimated salary range.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Industry Selection */}
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(industryData).map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Selection */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    Location
                  </Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(industryData[industry].locationMultiplier).map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Level */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="experience" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      Years of Experience
                    </Label>
                    <span className="text-sm font-medium text-purple-600">{yearsExperience} years</span>
                  </div>
                  <Slider
                    id="experience"
                    value={[yearsExperience]}
                    min={0}
                    max={20}
                    step={1}
                    onValueChange={(value) => setYearsExperience(value[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Entry Level</span>
                    <span>Mid Level</span>
                    <span>Senior</span>
                  </div>
                </div>

                {/* Education Level */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    Education Level
                  </Label>
                  <RadioGroup 
                    value={education} 
                    onValueChange={setEducation}
                    className="grid grid-cols-2 gap-4 pt-2"
                  >
                    {Object.keys(industryData[industry].educationBonus).map((edu) => (
                      <div key={edu} className="flex items-center space-x-2">
                        <RadioGroupItem value={edu} id={edu} />
                        <Label htmlFor={edu} className="cursor-pointer">
                          {edu}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t p-4">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Results Card */}
          <div>
            <Card className="h-full flex flex-col">
              <CardHeader className="bg-purple-50 rounded-t-lg">
                <CardTitle className="text-purple-700">Salary Estimate</CardTitle>
                <CardDescription>Based on your profile</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center py-8">
                {isCalculating ? (
                  <div className="text-center py-8">
                    <RefreshCw className="h-8 w-8 text-purple-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-500">Calculating...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center space-y-1">
                      <p className="text-gray-500 text-sm">Estimated Annual Salary</p>
                      <div className="text-3xl font-bold text-purple-700">
                        {formatCurrency(salaryEstimate.mid)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600 pt-2">
                      <div className="text-center space-y-1">
                        <p>Low End</p>
                        <div className="font-semibold">{formatCurrency(salaryEstimate.low)}</div>
                      </div>
                      <div className="text-center space-y-1">
                        <p>High End</p>
                        <div className="font-semibold">{formatCurrency(salaryEstimate.high)}</div>
                      </div>
                    </div>
                    
                    <div className="pt-6 space-y-4">
                      <div className="text-center text-sm">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                          {industry}
                        </span>
                      </div>
                      <div className="flex justify-center gap-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {location}
                        </div>
                        <div>•</div>
                        <div className="flex items-center">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {yearsExperience} years
                        </div>
                        <div>•</div>
                        <div className="flex items-center">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          {education}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t p-4 text-xs text-gray-500 text-center">
                Based on industry averages and market data as of April 2025.
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">How We Calculate</h3>
          <p className="mt-2 text-gray-600">
            Our salary calculator uses real market data and considers multiple factors including industry standards, location cost of living, experience level, and educational background to provide realistic salary estimates. Remember that actual salaries may vary based on company size, specific skills, and other factors not captured in this calculator.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SalaryCalculator;