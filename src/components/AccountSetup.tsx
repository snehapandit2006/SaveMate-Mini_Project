import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Shield, CreditCard, User, Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  spendingLimit: string;
  allowanceAmount: string;
  allowanceFrequency: string;
}

interface AccountSetupProps {
  onComplete: (userData: UserData) => void;
  onGetStarted?: () => void;
  skipWelcome?: boolean;
  initialData?: Partial<UserData>;
}

export default function AccountSetup({ onComplete, onGetStarted, skipWelcome = false, initialData }: AccountSetupProps) {
  const [currentStep, setCurrentStep] = useState(skipWelcome ? 0 : 0);
  const [showWelcome, setShowWelcome] = useState(!skipWelcome);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    password: initialData?.password || '',
    
    // Bank Details
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    
    // Parental Controls
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    spendingLimit: '',
    allowanceAmount: '',
    allowanceFrequency: ''
  });

  const steps = [
    {
      title: "Personal Information",
      description: "Let's start with your basic details",
      icon: User
    },
    {
      title: "Bank Account",
      description: "Link your bank account securely",
      icon: CreditCard
    },
    {
      title: "Parental Controls",
      description: "Setup oversight and safety features",
      icon: Shield
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.dateOfBirth && formData.password;
      case 1:
        return formData.bankName && formData.accountNumber && formData.ifscCode && formData.accountType;
      case 2:
        return formData.parentName && formData.parentPhone && formData.spendingLimit && formData.allowanceAmount;
      default:
        return false;
    }
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ImageWithFallback 
                  src={saveMateLogoImage} 
                  alt="SaveMate Logo" 
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to SaveMate</h1>
              <p className="text-gray-600">Your smart financial companion for building better money habits</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-left">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">Secure & Safe</p>
                  <p className="text-sm text-gray-600">Bank-level security with parental oversight</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-left">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Smart Savings</p>
                  <p className="text-sm text-gray-600">AI-powered budgeting and goal tracking</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-left">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">Learn & Grow</p>
                  <p className="text-sm text-gray-600">Gamified financial education</p>
                </div>
              </div>
            </div>
            
            <Button onClick={() => onGetStarted ? onGetStarted() : setShowWelcome(false)} className="w-full" size="lg">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <h1 className="text-xl font-semibold">Account Setup</h1>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
            <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {currentStep === 0 && (
              <div className="space-y-4">
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
                
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                
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
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800">Secure Bank Linking</span>
                  </div>
                  <p className="text-xs text-blue-700">Your bank details are encrypted and secure. We use bank-level security protocols.</p>
                </div>
                
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Select onValueChange={(value) => handleInputChange('bankName', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                      <SelectItem value="pnb">Punjab National Bank</SelectItem>
                      <SelectItem value="canara">Canara Bank</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
                    placeholder="ABCD0123456"
                  />
                </div>
                
                <div>
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select onValueChange={(value) => handleInputChange('accountType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Parental Oversight</span>
                  </div>
                  <p className="text-xs text-green-700">Your parent/guardian will receive alerts and can control spending limits for your safety.</p>
                </div>
                
                <div>
                  <Label htmlFor="parentName">Parent/Guardian Name</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => handleInputChange('parentName', e.target.value)}
                    placeholder="Enter parent/guardian name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>
                
                <div>
                  <Label htmlFor="parentEmail">Parent/Guardian Email (Optional)</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                    placeholder="parent@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="spendingLimit">Daily Spending Limit</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">₹</span>
                    <Input
                      id="spendingLimit"
                      type="number"
                      value={formData.spendingLimit}
                      onChange={(e) => handleInputChange('spendingLimit', e.target.value)}
                      placeholder="500"
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="allowanceAmount">Allowance Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">₹</span>
                      <Input
                        id="allowanceAmount"
                        type="number"
                        value={formData.allowanceAmount}
                        onChange={(e) => handleInputChange('allowanceAmount', e.target.value)}
                        placeholder="1000"
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="allowanceFrequency">Frequency</Label>
                    <Select onValueChange={(value) => handleInputChange('allowanceFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4 mt-6">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button 
            onClick={handleNext} 
            disabled={!isStepValid()}
            className="flex-1"
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
