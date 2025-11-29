import React, { useState } from 'react';
import { 
  User, Phone, CreditCard, Shield, Wallet, RotateCcw, BarChart3, 
  Bell, Target, FileText, Users, Lock, Fingerprint, Share, 
  HelpCircle, MessageCircle, Star, FileCheck, Info, RefreshCw, LogOut, ChevronRight 
} from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

interface SettingsPanelProps {
  userData: any;
  onSignOut: () => void;
}

export default function SettingsPanel({ userData, onSignOut }: SettingsPanelProps) {
  const [notifications, setNotifications] = useState({
    budgetAlerts: true,
    goalReminders: true,
    weeklyReports: false,
    parentalUpdates: true,
  });

  const [privacy, setPrivacy] = useState({
    shareWithFamily: true,
    analyticsData: false,
  });

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out? You\'ll need to complete the setup process again.')) {
      onSignOut();
    }
  };

  const SettingItem = ({ icon: IconComponent, title, subtitle, onClick, rightElement }: {
    icon: any;
    title: string;
    subtitle?: string;
    onClick?: () => void;
    rightElement?: React.ReactNode;
  }) => {
    const content = (
      <>
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <IconComponent size={20} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>
        {rightElement || <ChevronRight size={20} className="text-gray-400" />}
      </>
    );

    // If there's a rightElement (like a Switch), use a div to avoid nested buttons
    if (rightElement) {
      return (
        <div className="flex items-center justify-between w-full p-4 border-b border-gray-100 last:border-b-0">
          {content}
        </div>
      );
    }

    // Otherwise, use a button for clickable items
    return (
      <button 
        className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
        onClick={onClick}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="p-4 space-y-2 max-h-full overflow-y-auto">
      {/* Profile Section */}
      {userData && (
        <Card className="p-5 mb-2">
          <div className="flex items-center">
            <div className="w-15 h-15 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl font-semibold">
                {userData.firstName?.[0]}{userData.lastName?.[0]}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Account Information */}
      <Card className="mb-2">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Account Information</h2>
        </div>
        
        {userData && (
          <>
            <SettingItem
              icon={User}
              title="Personal Details"
              subtitle={`${userData.firstName} ${userData.lastName}`}
            />
            <SettingItem
              icon={Phone}
              title="Phone Number"
              subtitle={userData.phone}
            />
            <SettingItem
              icon={CreditCard}
              title="Bank Account"
              subtitle={`${userData.bankName} • ****${userData.accountNumber?.slice(-4)}`}
            />
            <SettingItem
              icon={Shield}
              title="Parent/Guardian"
              subtitle={userData.parentName}
            />
          </>
        )}
      </Card>

      {/* Spending Controls */}
      <Card className="mb-2">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Spending Controls</h2>
        </div>
        
        {userData && (
          <>
            <SettingItem
              icon={Wallet}
              title="Daily Spending Limit"
              subtitle={`₹${userData.spendingLimit}`}
            />
            <SettingItem
              icon={RotateCcw}
              title="Allowance"
              subtitle={`₹${userData.allowanceAmount} ${userData.allowanceFrequency}`}
            />
          </>
        )}
        
        <SettingItem
          icon={BarChart3}
          title="Budget Categories"
          subtitle="Manage spending categories"
        />
        <SettingItem
          icon={Target}
          title="Auto-Save Settings"
          subtitle="Configure automatic savings"
        />
      </Card>

      {/* Notifications */}
      <Card className="mb-2">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Notifications</h2>
        </div>
        
        <SettingItem
          icon={Bell}
          title="Budget Alerts"
          subtitle="Get notified when approaching limits"
          rightElement={
            <Switch
              checked={notifications.budgetAlerts}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, budgetAlerts: checked }))}
            />
          }
        />
        
        <SettingItem
          icon={Target}
          title="Goal Reminders"
          subtitle="Reminders about savings goals"
          rightElement={
            <Switch
              checked={notifications.goalReminders}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, goalReminders: checked }))}
            />
          }
        />
        
        <SettingItem
          icon={BarChart3}
          title="Weekly Reports"
          subtitle="Summary of spending and savings"
          rightElement={
            <Switch
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
            />
          }
        />
        
        <SettingItem
          icon={Users}
          title="Parental Updates"
          subtitle="Updates sent to parent/guardian"
          rightElement={
            <Switch
              checked={notifications.parentalUpdates}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, parentalUpdates: checked }))}
            />
          }
        />
      </Card>

      {/* Privacy & Security */}
      <Card className="mb-2">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Privacy & Security</h2>
        </div>
        
        <SettingItem
          icon={Lock}
          title="Change Password"
          subtitle="Update your account password"
        />
        
        <SettingItem
          icon={Fingerprint}
          title="Biometric Lock"
          subtitle="Use fingerprint or face ID"
        />
        
        <SettingItem
          icon={Share}
          title="Share with Family"
          subtitle="Allow family to see your progress"
          rightElement={
            <Switch
              checked={privacy.shareWithFamily}
              onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, shareWithFamily: checked }))}
            />
          }
        />
        
        <SettingItem
          icon={BarChart3}
          title="Analytics Data"
          subtitle="Help improve SaveMate"
          rightElement={
            <Switch
              checked={privacy.analyticsData}
              onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, analyticsData: checked }))}
            />
          }
        />
      </Card>

      {/* Support */}
      <Card className="mb-2">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Support</h2>
        </div>
        
        <SettingItem
          icon={HelpCircle}
          title="Help Center"
          subtitle="Get answers to common questions"
        />
        
        <SettingItem
          icon={MessageCircle}
          title="Contact Support"
          subtitle="Get help from our team"
        />
        
        <SettingItem
          icon={Star}
          title="Rate SaveMate"
          subtitle="Share your feedback"
        />
        
        <SettingItem
          icon={FileCheck}
          title="Terms & Privacy"
          subtitle="Read our policies"
        />
      </Card>

      {/* App Info */}
      <Card className="mb-2">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">App Information</h2>
        </div>
        
        <SettingItem
          icon={Info}
          title="App Version"
          subtitle="1.0.0"
          rightElement={<div />}
        />
        
        <SettingItem
          icon={RefreshCw}
          title="Check for Updates"
          subtitle="Keep SaveMate up to date"
        />
      </Card>

      {/* Sign Out */}
      <Card className="mb-2">
        <button 
          className="w-full p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
          onClick={handleSignOut}
        >
          <LogOut size={20} className="text-red-600" />
          <span className="font-medium text-red-600">Sign Out</span>
        </button>
      </Card>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-gray-600 mb-1">SaveMate v1.0.0</p>
        <p className="text-sm text-gray-500">Built with ❤️ for smart savers</p>
      </div>
    </div>
  );
}
