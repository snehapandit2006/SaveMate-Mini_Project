import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Eye, EyeOff, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChildData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
  age?: number;
}

interface ChildSignupProps {
  onComplete: (childData: ChildData) => void;
  onBack: () => void;
}

export default function ChildSignup({ onComplete, onBack }: ChildSignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);
  const [formData, setFormData] = useState<ChildData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: ''
  });

  const handleInputChange = (field: keyof ChildData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Calculate age when DOB changes
    if (field === 'dateOfBirth' && value) {
      const age = calculateAge(value);
      setCalculatedAge(age);
    }
  };

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const isFormValid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.phone && 
           formData.dateOfBirth && 
           formData.password;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      const age = calculateAge(formData.dateOfBirth);
      onComplete({ ...formData, age });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <ImageWithFallback 
              src={saveMateLogoImage} 
              alt="SaveMate Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl font-semibold">Create Your Account</h1>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Student Account</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Start your journey to financial responsibility
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <p className="text-sm text-gray-600">Tell us about yourself</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              
              {/* Phone Number */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>
              
              {/* Date of Birth */}
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
                {calculatedAge !== null && (
                  <p className="text-xs text-gray-600 mt-1">
                    Age: {calculatedAge} years
                    {calculatedAge >= 18 && calculatedAge <= 21 && (
                      <span className="text-blue-600 ml-2">• Parental controls will be enabled</span>
                    )}
                    {calculatedAge > 21 && (
                      <span className="text-green-600 ml-2">• Full account access</span>
                    )}
                    {calculatedAge < 18 && (
                      <span className="text-orange-600 ml-2">• Parental controls required</span>
                    )}
                  </p>
                )}
              </div>
              
              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters long
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid()}
            className="flex-1"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {calculatedAge !== null && calculatedAge > 21
              ? "Next, you'll link your bank account"
              : "Next, you'll link your bank account and set up parental controls"}
          </p>
        </div>
      </div>
    </div>
  );
}
