import React from 'react';
import { Shield, Users, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface LoginTypeSelectionProps {
  onSelectType: (type: 'parent' | 'staff' | 'child') => void;
}

export default function LoginTypeSelection({ onSelectType }: LoginTypeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="mb-6 text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ImageWithFallback 
                src={saveMateLogoImage} 
                alt="SaveMate Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to SaveMate</h1>
            <p className="text-gray-600">Select your account type to continue</p>
          </div>

          {/* Account Type Options */}
          <div className="space-y-4">
            {/* Parent Account */}
            <button
              onClick={() => onSelectType('parent')}
              className="w-full p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Shield className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Parent / Guardian</h3>
                  <p className="text-sm text-gray-600">Monitor and manage your child's finances</p>
                </div>
              </div>
            </button>

            {/* Staff Account */}
            <button
              onClick={() => onSelectType('staff')}
              className="w-full p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Users className="w-7 h-7 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Staff / Administrator</h3>
                  <p className="text-sm text-gray-600">Manage SaveMate platform and users</p>
                </div>
              </div>
            </button>

            {/* Child/Student Account */}
            <button
              onClick={() => onSelectType('child')}
              className="w-full p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <User className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Child / Student</h3>
                  <p className="text-sm text-gray-600">Start your financial journey</p>
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
