import React, { useState } from 'react';
import { Home, Target, TrendingUp, Trophy, Settings, X, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';


import Dashboard from './components/Dashboard';
import Goals from './components/Goals';
import Budget from './components/Budget';
import Rewards from './components/Rewards';
import SettingsPanel from './components/SettingsPanel';
import EmergencyMode from './components/EmergencyMode';
import AccountSetup from './components/AccountSetup';
import LoginTypeSelection from './components/LoginTypeSelection';
import ChildSignup from './components/ChildSignup';
import ChildSetupContinue from './components/ChildSetupContinue';
import ParentLogin from './components/ParentLogin';
import StaffLogin from './components/StaffLogin';

type AppScreen = 'welcome' | 'loginTypeSelection' | 'childSignup' | 'childSetup' | 'parentLogin' | 'staffLogin' | 'mainApp';

export default function App() {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [userData, setUserData] = useState<any>(null);
  const [childData, setChildData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleSignOut = () => {
    setCurrentScreen('welcome');
    setUserData(null);
    setChildData(null);
    setIsEmergencyMode(false);
  };

  const handleLoginTypeSelect = (type: 'parent' | 'staff' | 'child') => {
    if (type === 'child') {
      setCurrentScreen('childSignup');
    } else if (type === 'parent') {
      setCurrentScreen('parentLogin');
    } else if (type === 'staff') {
      setCurrentScreen('staffLogin');
    }
  };

  const handleChildSignupComplete = (data: any) => {
    setChildData(data);
    setCurrentScreen('childSetup');
  };

  const EmergencyHeader = () => (
    <div className="bg-red-600 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <ImageWithFallback 
            src={saveMateLogoImage} 
            alt="SaveMate Logo" 
            className="h-10 w-auto object-contain brightness-0 invert"
          />
          <div>
            <p className="text-white/80 text-xs">Emergency Mode</p>
          </div>
        </div>
        <button
          className="p-2 bg-white/20 rounded-lg"
          onClick={() => setIsEmergencyMode(false)}
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );

  const MainHeader = () => (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <ImageWithFallback 
            src={saveMateLogoImage} 
            alt="SaveMate Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
        <button
          className="p-2 bg-red-50 rounded-lg"
          onClick={() => setIsEmergencyMode(true)}
        >
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  );

  const TabBar = () => {
    const tabs = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'goals', label: 'Goals', icon: Target },
      { id: 'budget', label: 'Budget', icon: TrendingUp },
      { id: 'rewards', label: 'Rewards', icon: Trophy },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
      <div className="bg-white border-t border-gray-200 px-2 py-2">
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                  isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-500'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onEmergencyMode={() => setIsEmergencyMode(true)} userData={userData} />;
      case 'goals':
        return <Goals />;
      case 'budget':
        return <Budget />;
      case 'rewards':
        return <Rewards />;
      case 'settings':
        return <SettingsPanel userData={userData} onSignOut={handleSignOut} />;
      default:
        return <Dashboard onEmergencyMode={() => setIsEmergencyMode(true)} userData={userData} />;
    }
  };

  // Handle different screens
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-gray-50">
        <AccountSetup
          onGetStarted={() => setCurrentScreen('loginTypeSelection')}
          onComplete={(data) => {
            setUserData(data);
            setCurrentScreen('mainApp');
          }}
        />
      </div>
    );
  }

  if (currentScreen === 'loginTypeSelection') {
    return <LoginTypeSelection onSelectType={handleLoginTypeSelect} />;
  }

  if (currentScreen === 'childSignup') {
    return (
      <ChildSignup 
        onComplete={handleChildSignupComplete}
        onBack={() => setCurrentScreen('loginTypeSelection')}
      />
    );
  }

  if (currentScreen === 'childSetup') {
    return (
      <ChildSetupContinue
        childData={childData}
        onComplete={(data) => {
          // Merge child signup data with setup data
          setUserData({ ...childData, ...data });
          setCurrentScreen('mainApp');
        }}
      />
    );
  }

  if (currentScreen === 'parentLogin') {
    return (
      <ParentLogin 
        onBack={() => setCurrentScreen('loginTypeSelection')}
      />
    );
  }

  if (currentScreen === 'staffLogin') {
    return (
      <StaffLogin 
        onBack={() => setCurrentScreen('loginTypeSelection')}
      />
    );
  }

  if (isEmergencyMode) {
    return (
      <div className="min-h-screen bg-red-50 flex flex-col">
        <EmergencyHeader />
        <div className="flex-1">
          <EmergencyMode onExitEmergency={() => setIsEmergencyMode(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      <MainHeader />
      <div className="flex-1 overflow-auto">
        {renderActiveTab()}
      </div>
      <TabBar />
    </div>
  );
}

