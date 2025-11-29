import React, { useState } from 'react';
import {
  AlertTriangle,
  Shield,
  ArrowRight,
  Lock,
  Check,
  Phone,
  MessageCircle,
  ChevronRight,
  X,
  Gamepad2,
  ShoppingBag,
  Utensils,
  RotateCcw,
  ShoppingBasket,
  Car,
  Heart,
  GraduationCap
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';

interface EmergencyModeProps {
  onExitEmergency: () => void;
}

export default function EmergencyMode({ onExitEmergency }: EmergencyModeProps) {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [otp, setOtp] = useState('');

  const emergencyFunds = {
    available: 2500,
    total: 5000,
  };

  const blockedCategories = [
    { id: 1, name: 'Entertainment', icon: Gamepad2, blocked: true },
    { id: 2, name: 'Shopping', icon: ShoppingBag, blocked: true },
    { id: 3, name: 'Dining Out', icon: Utensils, blocked: true },
    { id: 4, name: 'Subscriptions', icon: RotateCcw, blocked: true },
  ];

  const allowedCategories = [
    { id: 1, name: 'Food & Groceries', icon: ShoppingBasket, essential: true },
    { id: 2, name: 'Transportation', icon: Car, essential: true },
    { id: 3, name: 'Medical', icon: Heart, essential: true },
    { id: 4, name: 'Education', icon: GraduationCap, essential: true },
  ];

  const recentEmergencyTransactions = [
    { id: 1, name: 'Medical Emergency', amount: 800, time: '2 hours ago', approved: true },
    { id: 2, name: 'Emergency Transport', amount: 150, time: '1 day ago', approved: true },
  ];

  const handleUnblockCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setShowOtpModal(true);
  };

  const handleOtpSubmit = () => {
    if (otp === '123456') { // Mock OTP verification
      alert(`${selectedCategory} has been temporarily unblocked. Your parent will be notified.`);
      setShowOtpModal(false);
      setOtp('');
    } else {
      alert('Invalid OTP. Please check the OTP sent to your parent\'s phone.');
    }
  };

  const handleExitEmergency = () => {
    if (confirm('Are you sure you want to exit emergency mode? Normal spending controls will be restored.')) {
      onExitEmergency();
    }
  };

  return (
    <div className="p-4 space-y-6 max-h-full overflow-y-auto bg-red-50">
      {/* Emergency Header */}
      <Card className="bg-red-600 border-red-600 text-white p-5 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-xl font-bold mb-2">Emergency Mode Active</h1>
        <p className="text-white/90 text-sm">
          Only essential spending is allowed. Non-essential categories are blocked.
        </p>
      </Card>

      {/* Emergency Funds */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-green-600" />
          <h2 className="text-lg font-semibold">Emergency Funds</h2>
        </div>
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-green-600 mb-1">
            ₹{emergencyFunds.available.toLocaleString('en-IN')}
          </p>
          <p className="text-sm text-gray-600 mb-4">Available for emergencies</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all" 
              style={{ width: `${(emergencyFunds.available / emergencyFunds.total) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">
            ₹{emergencyFunds.total.toLocaleString('en-IN')} total emergency fund
          </p>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Quick Access Funds
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>

      {/* Blocked Categories */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-1">🚫 Blocked Categories</h2>
        <p className="text-sm text-gray-600 mb-4">
          These spending categories are currently blocked
        </p>
        
        <div className="space-y-3">
          {blockedCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-red-600">{category.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => handleUnblockCategory(category.name)}
                >
                  Request Unblock
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Allowed Categories */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-1">✅ Essential Categories</h2>
        <p className="text-sm text-gray-600 mb-4">
          These categories remain available for essential needs
        </p>
        
        <div className="space-y-3">
          {allowedCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium text-green-600">{category.name}</span>
                </div>
                <div className="bg-green-50 px-2 py-1 rounded text-xs font-medium text-green-600">
                  Available
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Transactions */}
      {recentEmergencyTransactions.length > 0 && (
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Emergency Transactions</h2>
          <div className="space-y-3">
            {recentEmergencyTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.name}</p>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-red-600">₹{transaction.amount}</p>
                  <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-xs">
                    <Check className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">Approved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Emergency Contacts */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Emergency Contacts</h2>
        <div className="space-y-3">
          <button className="flex items-center justify-between w-full py-3 border-b border-gray-100 text-left hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Parent/Guardian</p>
                <p className="text-sm text-gray-600">+91 98765 43210</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="flex items-center justify-between w-full py-3 text-left hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">SaveMate Support</p>
                <p className="text-sm text-gray-600">24/7 Emergency Help</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </Card>

      {/* Exit Emergency Mode */}
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700" 
        onClick={handleExitEmergency}
      >
        Exit Emergency Mode
      </Button>

      {/* OTP Modal */}
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Parent Verification Required</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowOtpModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <DialogDescription>
              A 6-digit code has been sent to your parent's phone to unblock {selectedCategory}
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Verification Code Sent</h3>
              <p className="text-sm text-gray-600 mb-4">
                A 6-digit code has been sent to your parent's phone to unblock {selectedCategory}
              </p>
            </div>
            
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              className="text-center text-lg font-semibold tracking-widest"
              maxLength={6}
            />
            
            <Button onClick={handleOtpSubmit} className="w-full">
              Verify & Unblock
            </Button>
            
            <Button variant="ghost" className="w-full text-sm">
              Resend Code
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
