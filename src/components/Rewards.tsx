import React, { useState } from 'react';
import { Trophy, Medal, Flame, Shield, CheckCircle, AlertCircle, Users, TrendingUp, Gift, Lock } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function Rewards() {
  const [selectedTab, setSelectedTab] = useState('challenges');

  const userStats = {
    level: 'Bronze Saver',
    points: 2340,
    streak: 7,
    badges: 5,
    nextLevelPoints: 3000
  };

  const challenges = [
    {
      id: 1,
      title: 'Week Without Impulse Buys',
      description: 'Go 7 days without any non-essential purchases',
      progress: 5,
      total: 7,
      reward: 500,
      type: 'daily',
      icon: Shield,
      color: '#16a34a'
    },
    {
      id: 2,
      title: 'Save ₹1000 This Week',
      description: 'Reach your weekly savings target',
      progress: 750,
      total: 1000,
      reward: 300,
      type: 'weekly',
      icon: Trophy,
      color: '#eab308'
    },
    {
      id: 3,
      title: 'Budget Master',
      description: 'Stay under budget for 2 weeks straight',
      progress: 1,
      total: 2,
      reward: 1000,
      type: 'achievement',
      icon: Medal,
      color: '#7c3aed'
    },
    {
      id: 4,
      title: 'Family Saver',
      description: 'Complete group savings challenge with family',
      progress: 3,
      total: 5,
      reward: 800,
      type: 'group',
      icon: Users,
      color: '#dc2626'
    }
  ];

  const badges = [
    { id: 1, name: 'First Save', icon: Medal, earned: true, color: '#eab308' },
    { id: 2, name: 'Budget Keeper', icon: Shield, earned: true, color: '#16a34a' },
    { id: 3, name: 'Streak Master', icon: Flame, earned: true, color: '#dc2626' },
    { id: 4, name: 'Goal Crusher', icon: Trophy, earned: true, color: '#7c3aed' },
    { id: 5, name: 'Smart Spender', icon: CheckCircle, earned: true, color: '#2563eb' },
    { id: 6, name: 'Emergency Ready', icon: AlertCircle, earned: false, color: '#6b7280' },
    { id: 7, name: 'Investment Pro', icon: TrendingUp, earned: false, color: '#6b7280' },
    { id: 8, name: 'Debt Free', icon: CheckCircle, earned: false, color: '#6b7280' },
  ];

  const rewards = [
    { id: 1, name: 'Free Coffee', points: 500, category: 'Food', available: true },
    { id: 2, name: 'Movie Ticket', points: 800, category: 'Entertainment', available: true },
    { id: 3, name: '₹100 Cashback', points: 1000, category: 'Money', available: true },
    { id: 4, name: 'Book Voucher', points: 600, category: 'Education', available: true },
    { id: 5, name: 'Gaming Credits', points: 1200, category: 'Gaming', available: false },
    { id: 6, name: 'Shopping Discount', points: 1500, category: 'Shopping', available: false },
  ];

  const progressPercentage = (userStats.points / userStats.nextLevelPoints) * 100;

  return (
    <div className="p-4 space-y-6 max-h-full overflow-y-auto">
      {/* Header Stats */}
      <Card className="p-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
        <div className="flex justify-around mb-5">
          <div className="text-center">
            <p className="text-2xl font-bold">{userStats.points}</p>
            <p className="text-xs opacity-80">Points</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{userStats.streak}</p>
            <p className="text-xs opacity-80">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{userStats.badges}</p>
            <p className="text-xs opacity-80">Badges</p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">{userStats.level}</p>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div className="bg-white h-2 rounded-full transition-all" style={{width: `${progressPercentage}%`}} />
          </div>
          <p className="text-xs opacity-80">
            {userStats.nextLevelPoints - userStats.points} points to Silver Saver
          </p>
        </div>
      </Card>

      {/* Tab Navigation */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-2">
            <Medal className="w-4 h-4" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Rewards
          </TabsTrigger>
        </TabsList>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-4">
          <h2 className="text-xl font-semibold">Active Challenges</h2>
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            const progress = (challenge.progress / challenge.total) * 100;
            
            return (
              <Card key={challenge.id} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${challenge.color}20` }}
                  >
                    <Icon size={24} color={challenge.color} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{challenge.title}</h3>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">+{challenge.reward}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {typeof challenge.progress === 'number' && typeof challenge.total === 'number' ? 
                        `${challenge.progress}/${challenge.total}` : 
                        `₹${challenge.progress}/₹${challenge.total}`
                      }
                    </span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all" 
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: challenge.color
                      }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges" className="space-y-4">
          <h2 className="text-xl font-semibold">Badge Collection</h2>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <Card key={badge.id} className={`p-4 text-center relative ${!badge.earned ? 'opacity-60' : ''}`}>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ backgroundColor: badge.earned ? `${badge.color}20` : '#f3f4f6' }}
                  >
                    <Icon size={24} color={badge.earned ? badge.color : '#9ca3af'} />
                  </div>
                  <p className={`text-sm font-medium ${badge.earned ? 'text-gray-900' : 'text-gray-400'}`}>
                    {badge.name}
                  </p>
                  {!badge.earned && (
                    <div className="absolute top-2 right-2">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4">
          <h2 className="text-xl font-semibold">Redeem Points</h2>
          <div className="space-y-3">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`p-4 relative ${!reward.available ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className={`font-semibold ${reward.available ? 'text-gray-900' : 'text-gray-400'}`}>
                      {reward.name}
                    </h3>
                    <p className="text-xs text-gray-500">{reward.category}</p>
                  </div>
                  <Badge variant={reward.available ? 'default' : 'secondary'}>
                    {reward.points} pts
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${reward.available ? 'text-blue-600' : 'text-gray-400'}`}>
                    {reward.points} points
                  </span>
                  <Button 
                    size="sm" 
                    disabled={!reward.available}
                    variant={reward.available ? 'default' : 'secondary'}
                  >
                    {reward.available ? 'Redeem' : 'Locked'}
                  </Button>
                </div>
                {!reward.available && (
                  <div className="absolute top-2 right-2">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Tip */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Pro Tip</h3>
        <p className="text-sm text-blue-700">
          Complete daily challenges to earn bonus points and maintain your streak for bigger rewards!
        </p>
      </Card>
    </div>
  );
}
