import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Eye, EyeOff, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import saveMateLogoImage from '../assets/4d7c14c68e3799f5818cedf8d6f63b89d97eb538.png';

interface StaffLoginProps {
  onBack: () => void;
}

export default function StaffLogin({ onBack }: StaffLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.employeeId && formData.email && formData.password;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      alert('Staff logged in! (Demo)');
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
            <h1 className="text-xl font-semibold">Staff Portal</h1>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Staff Account</span>
            </div>
            <p className="text-xs text-purple-700 mt-1">
              Manage SaveMate platform and user accounts
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold">Staff Sign In</h2>
            <p className="text-sm text-gray-600">Access administrative dashboard</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Employee ID */}
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  placeholder="Enter your employee ID"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="staff@savemate.com"
                />
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
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit} 
                disabled={!isFormValid()}
                className="w-full"
              >
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Forgot Password */}
              <div className="text-center pt-2">
                <button
                  className="text-sm text-purple-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-6">
          <Button variant="outline" onClick={onBack} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Account Selection
          </Button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800 text-center">
            🔒 Staff access is restricted. Unauthorized access attempts will be logged.
          </p>
        </div>
      </div>
    </div>
  );
}
