import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Shield, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SetupData {
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

interface ChildSetupContinueProps {
  childData: any;
  onComplete: (setupData: SetupData) => void;
}

export default function ChildSetupContinue({ childData, onComplete }: ChildSetupContinueProps) {
  const userAge = childData?.age || 0;
  const requiresParentalControls = userAge <= 21;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SetupData>({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    spendingLimit: '',
    allowanceAmount: '',
    allowanceFrequency: ''
  });

  const steps = requiresParentalControls ? [
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
  ] : [
    {
      title: "Bank Account",
      description: "Link your bank account securely",
      icon: CreditCard
    }
  ];

  const handleInputChange = (field: keyof SetupData, value: string) => {
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
    if (currentStep === 0) {
      // Bank account step
      return formData.bankName && formData.accountNumber && formData.ifscCode && formData.accountType;
    } else if (currentStep === 1 && requiresParentalControls) {
      // Parental controls step (only if required)
      return formData.parentName && formData.parentPhone && formData.spendingLimit && formData.allowanceAmount;
    }
    return false;
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
            <h1 className="text-xl font-semibold">Complete Your Setup</h1>
          </div>
          
          {/* Age-based notification */}
          {!requiresParentalControls && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-800">
                ✓ You're {userAge} years old - Full account access granted! No parental controls needed.
              </p>
            </div>
          )}
          {requiresParentalControls && userAge >= 18 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                🛡️ Parental controls enabled for users aged 18-21. This helps ensure financial safety.
              </p>
            </div>
          )}
          
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

            {currentStep === 1 && (
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
