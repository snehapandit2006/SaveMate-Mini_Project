import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ParentLoginProps {
  onBack: () => void;
}

export default function ParentLogin({ onBack }: ParentLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    childCode: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    if (isSignup) {
      return formData.name && formData.email && formData.phone && formData.password;
    }
    return formData.email && formData.password;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      alert(isSignup ? 'Parent account created! (Demo)' : 'Parent logged in! (Demo)');
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
            <h1 className="text-xl font-semibold">Parent / Guardian Portal</h1>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Parental Account</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Monitor and manage your child's financial activities
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold">
              {isSignup ? 'Create Parent Account' : 'Sign In'}
            </h2>
            <p className="text-sm text-gray-600">
              {isSignup ? 'Set up parental controls' : 'Access your dashboard'}
            </p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Name (Signup only) */}
              {isSignup && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
              )}

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

              {/* Phone (Signup only) */}
              {isSignup && (
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
              )}
              
              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder={isSignup ? 'Create a password' : 'Enter your password'}
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

              {/* Child Code (Signup only) */}
              {isSignup && (
                <div>
                  <Label htmlFor="childCode">Child Account Code (Optional)</Label>
                  <Input
                    id="childCode"
                    value={formData.childCode}
                    onChange={(e) => handleInputChange('childCode', e.target.value)}
                    placeholder="Link to existing child account"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the code from your child's account to link
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                onClick={handleSubmit} 
                disabled={!isFormValid()}
                className="w-full"
              >
                {isSignup ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Toggle Signup/Login */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
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
      </div>
    </div>
  );
}
