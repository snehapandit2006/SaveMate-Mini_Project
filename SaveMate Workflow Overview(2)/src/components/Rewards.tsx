import React, { useState } from 'react';
import { Trophy, Medal, Flame, Shield, CheckCircle, AlertCircle, Users, TrendingUp, Gift, Lock, Star, Zap, Crown, Target, Award, Sparkles, ChevronRight, X } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

export default function Rewards() {
  const [selectedTab, setSelectedTab] = useState('challenges');
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [points, setPoints] = useState(2340);

  const userStats = {
    level: 'Bronze Saver',
    levelNumber: 3,
    points: points,
    streak: 7,
    longestStreak: 12,
    badges: 5,
    totalBadges: 15,
    nextLevelPoints: 3000,
    rank: 8,
    totalUsers: 24,
    completedChallenges: 12
  };

  const streakMilestones = [
    { days: 7, reward: 100, reached: true },
    { days: 14, reward: 250, reached: false },
    { days: 30, reward: 500, reached: false },
    { days: 60, reward: 1000, reached: false },
    { days: 100, reward: 2500, reached: false }
  ];

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
      color: '#16a34a',
      difficulty: 'Medium',
      expiresIn: '2 days',
      participants: 156
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
      color: '#eab308',
      difficulty: 'Easy',
      expiresIn: '5 days',
      participants: 234
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
      color: '#7c3aed',
      difficulty: 'Hard',
      expiresIn: 'Ongoing',
      participants: 89
    },
    {
      id: 4,
      title: 'Family Saver Challenge',
      description: 'Complete group savings challenge with family',
      progress: 3,
      total: 5,
      reward: 800,
      type: 'group',
      icon: Users,
      color: '#dc2626',
      difficulty: 'Medium',
      expiresIn: '10 days',
      participants: 45
    },
    {
      id: 5,
      title: 'Early Bird Saver',
      description: 'Make a savings deposit before 10 AM for 5 days',
      progress: 2,
      total: 5,
      reward: 400,
      type: 'daily',
      icon: Zap,
      color: '#f59e0b',
      difficulty: 'Easy',
      expiresIn: '3 days',
      participants: 178
    }
  ];

  const badges = [
    { id: 1, name: 'First Save', description: 'Made your first savings deposit', icon: Medal, earned: true, earnedDate: '2 weeks ago', color: '#eab308', tier: 'bronze' },
    { id: 2, name: 'Budget Keeper', description: 'Stayed within budget for a month', icon: Shield, earned: true, earnedDate: '1 week ago', color: '#16a34a', tier: 'silver' },
    { id: 3, name: 'Streak Master', description: 'Maintained a 7-day streak', icon: Flame, earned: true, earnedDate: 'Today', color: '#dc2626', tier: 'bronze' },
    { id: 4, name: 'Goal Crusher', description: 'Completed your first savings goal', icon: Trophy, earned: true, earnedDate: '3 days ago', color: '#7c3aed', tier: 'gold' },
    { id: 5, name: 'Smart Spender', description: 'Reduced spending by 20% in a month', icon: CheckCircle, earned: true, earnedDate: '5 days ago', color: '#2563eb', tier: 'silver' },
    { id: 6, name: 'Emergency Ready', description: 'Build an emergency fund of ₹10,000', icon: AlertCircle, earned: false, color: '#6b7280', tier: 'gold', requirement: 'Save ₹10,000' },
    { id: 7, name: 'Investment Pro', description: 'Complete investment basics course', icon: TrendingUp, earned: false, color: '#6b7280', tier: 'platinum', requirement: 'Finish course' },
    { id: 8, name: 'Debt Destroyer', description: 'Pay off all outstanding debts', icon: CheckCircle, earned: false, color: '#6b7280', tier: 'platinum', requirement: 'Clear all debts' },
    { id: 9, name: 'Century Club', description: 'Save for 100 days straight', icon: Flame, earned: false, color: '#6b7280', tier: 'platinum', requirement: '100-day streak' },
    { id: 10, name: 'Team Player', description: 'Complete 5 group challenges', icon: Users, earned: false, color: '#6b7280', tier: 'silver', requirement: '5 group challenges' },
    { id: 11, name: 'Savings Champion', description: 'Accumulate ₹50,000 in savings', icon: Crown, earned: false, color: '#6b7280', tier: 'gold', requirement: 'Save ₹50,000' },
    { id: 12, name: 'Wisdom Seeker', description: 'Read 10 financial articles', icon: Sparkles, earned: false, color: '#6b7280', tier: 'bronze', requirement: 'Read 10 articles' },
  ];

  const rewards = [
    { id: 1, name: 'Free Coffee Voucher', points: 500, category: 'Food & Drink', available: true, icon: '☕', stock: 15, popularity: 'High' },
    { id: 2, name: 'Movie Ticket', points: 800, category: 'Entertainment', available: true, icon: '🎬', stock: 8, popularity: 'High' },
    { id: 3, name: '₹100 Cashback', points: 1000, category: 'Money', available: true, icon: '💰', stock: 20, popularity: 'Very High' },
    { id: 4, name: 'Book Voucher', points: 600, category: 'Education', available: true, icon: '📚', stock: 12, popularity: 'Medium' },
    { id: 5, name: 'Gaming Credits (₹200)', points: 1200, category: 'Gaming', available: true, icon: '🎮', stock: 10, popularity: 'Medium' },
    { id: 6, name: '15% Shopping Discount', points: 1500, category: 'Shopping', available: true, icon: '🛍️', stock: 5, popularity: 'High' },
    { id: 7, name: 'Spotify Premium (1 month)', points: 2000, category: 'Entertainment', available: false, icon: '🎵', stock: 0, popularity: 'Very High' },
    { id: 8, name: 'Restaurant Voucher (₹500)', points: 2500, category: 'Food & Drink', available: false, icon: '🍽️', stock: 0, popularity: 'High' },
    { id: 9, name: '₹500 Cashback', points: 3000, category: 'Money', available: false, icon: '💸', stock: 0, popularity: 'Very High' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', points: 4520, level: 'Gold Saver', avatar: '👩', streak: 23, isYou: false },
    { rank: 2, name: 'Rahul Verma', points: 4230, level: 'Gold Saver', avatar: '👨', streak: 19, isYou: false },
    { rank: 3, name: 'Sneha Patel', points: 3890, level: 'Silver Saver', avatar: '👩', streak: 15, isYou: false },
    { rank: 4, name: 'Amit Kumar', points: 3650, level: 'Silver Saver', avatar: '👨', streak: 12, isYou: false },
    { rank: 5, name: 'Ananya Singh', points: 3420, level: 'Silver Saver', avatar: '👩', streak: 18, isYou: false },
    { rank: 6, name: 'Vikram Reddy', points: 3180, level: 'Silver Saver', avatar: '👨', streak: 14, isYou: false },
    { rank: 7, name: 'Neha Gupta', points: 2890, level: 'Bronze Saver', avatar: '👩', streak: 10, isYou: false },
    { rank: 8, name: 'You', points: userStats.points, level: userStats.level, avatar: '😊', streak: userStats.streak, isYou: true },
  ];

  const progressPercentage = (userStats.points / userStats.nextLevelPoints) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return '#cd7f32';
      case 'silver': return '#c0c0c0';
      case 'gold': return '#ffd700';
      case 'platinum': return '#e5e4e2';
      default: return '#6b7280';
    }
  };

  const handleRedeemReward = (reward: any) => {
    setSelectedReward(reward);
    setShowRedeemDialog(true);
  };

  const confirmRedeem = () => {
    if (selectedReward && userStats.points >= selectedReward.points) {
      setPoints(points - selectedReward.points);
      setShowRedeemDialog(false);
      toast.success(`${selectedReward.name} Redeemed! 🎉`, {
        description: `You've spent ${selectedReward.points} points. Check your email for the voucher.`
      });
    }
  };

  const claimChallenge = (challenge: any) => {
    if (challenge.progress >= challenge.total) {
      setPoints(points + challenge.reward);
      toast.success(`Challenge Completed! 🏆`, {
        description: `You earned ${challenge.reward} points for "${challenge.title}"`
      });
    }
  };

  return (
    <div className="p-4 space-y-6 max-h-full overflow-y-auto pb-20">
      {/* Enhanced Header Stats */}
      <Card className="p-5 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white border-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Trophy className="w-32 h-32" />
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold">{userStats.level}</h2>
              <p className="text-xs opacity-80">Level {userStats.levelNumber}</p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <Crown className="w-4 h-4" />
              <span className="text-sm">Rank #{userStats.rank}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center bg-white/10 rounded-lg p-2">
              <p className="text-2xl font-bold">{userStats.points}</p>
              <p className="text-xs opacity-80">Points</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-2">
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-orange-300" />
                <p className="text-2xl font-bold">{userStats.streak}</p>
              </div>
              <p className="text-xs opacity-80">Day Streak</p>
            </div>
            <div className="text-center bg-white/10 rounded-lg p-2">
              <p className="text-2xl font-bold">{userStats.badges}/{userStats.totalBadges}</p>
              <p className="text-xs opacity-80">Badges</p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Silver Saver</span>
              <span className="font-semibold">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 mb-1">
              <div className="bg-white h-2.5 rounded-full transition-all shadow-lg" style={{width: `${progressPercentage}%`}} />
            </div>
            <p className="text-xs opacity-80 text-center">
              {userStats.nextLevelPoints - userStats.points} more points needed
            </p>
          </div>
        </div>
      </Card>

      {/* Streak Milestones */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold">Streak Milestones</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            Longest: {userStats.longestStreak} days
          </Badge>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {streakMilestones.map((milestone, idx) => (
            <div 
              key={idx} 
              className={`min-w-[100px] p-3 rounded-lg border-2 text-center ${
                milestone.reached 
                  ? 'bg-green-50 border-green-500' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <p className={`text-2xl font-bold ${milestone.reached ? 'text-green-600' : 'text-gray-400'}`}>
                {milestone.days}
              </p>
              <p className="text-xs text-gray-600">days</p>
              <div className="mt-1">
                <Badge variant={milestone.reached ? 'default' : 'secondary'} className="text-xs">
                  +{milestone.reward}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tab Navigation */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="challenges" className="flex flex-col items-center gap-1 px-2">
            <Trophy className="w-4 h-4" />
            <span className="text-xs">Challenges</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex flex-col items-center gap-1 px-2">
            <Medal className="w-4 h-4" />
            <span className="text-xs">Badges</span>
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex flex-col items-center gap-1 px-2">
            <Gift className="w-4 h-4" />
            <span className="text-xs">Rewards</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex flex-col items-center gap-1 px-2">
            <Star className="w-4 h-4" />
            <span className="text-xs">Leaderboard</span>
          </TabsTrigger>
        </TabsList>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Challenges</h2>
            <Badge variant="outline">
              {challenges.filter(c => (c.progress / c.total) >= 1).length}/{challenges.length} Completed
            </Badge>
          </div>
          
          {challenges.map((challenge) => {
            const Icon = challenge.icon;
            const progress = (challenge.progress / challenge.total) * 100;
            const isComplete = progress >= 100;
            
            return (
              <Card key={challenge.id} className={`p-4 ${isComplete ? 'border-2 border-green-500' : ''}`}>
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${challenge.color}20` }}
                  >
                    <Icon size={24} color={challenge.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold">{challenge.title}</h3>
                      {isComplete && (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge className={getDifficultyColor(challenge.difficulty)} variant="outline">
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        ⏱️ {challenge.expiresIn}
                      </Badge>
                      <Badge variant="outline">
                        👥 {challenge.participants} joined
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-600">
                      {typeof challenge.progress === 'number' && typeof challenge.total === 'number' && challenge.progress < 1000 ? 
                        `${challenge.progress}/${challenge.total}` : 
                        `₹${challenge.progress.toLocaleString('en-IN')}/₹${challenge.total.toLocaleString('en-IN')}`
                      }
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-green-600">+{challenge.reward} pts</span>
                    </div>
                  </div>
                  <Progress value={Math.min(progress, 100)} className="h-2" />
                  
                  {isComplete && (
                    <Button 
                      className="w-full mt-2" 
                      size="sm"
                      onClick={() => claimChallenge(challenge)}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Claim Reward
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Badge Collection</h2>
            <Badge variant="outline">
              {badges.filter(b => b.earned).length}/{badges.length} Earned
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <Card 
                  key={badge.id} 
                  className={`p-4 text-center relative transition-all hover:scale-105 ${
                    !badge.earned ? 'opacity-60' : 'shadow-md'
                  }`}
                >
                  {badge.earned && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-green-500 rounded-full p-1">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 relative"
                    style={{ 
                      backgroundColor: badge.earned ? `${badge.color}20` : '#f3f4f6',
                      border: `3px solid ${badge.earned ? getTierColor(badge.tier) : '#e5e7eb'}`
                    }}
                  >
                    <Icon size={28} color={badge.earned ? badge.color : '#9ca3af'} />
                  </div>
                  
                  <p className={`font-semibold mb-1 ${badge.earned ? 'text-gray-900' : 'text-gray-400'}`}>
                    {badge.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-2 min-h-[32px]">
                    {badge.description}
                  </p>
                  
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{ 
                      borderColor: getTierColor(badge.tier),
                      color: badge.earned ? getTierColor(badge.tier) : '#9ca3af'
                    }}
                  >
                    {badge.tier.toUpperCase()}
                  </Badge>
                  
                  {badge.earned ? (
                    <p className="text-xs text-gray-400 mt-2">{badge.earnedDate}</p>
                  ) : (
                    <div className="mt-2">
                      <Lock size={16} className="text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-400">{badge.requirement}</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Redeem Points</h2>
            <div className="text-sm text-gray-600">
              You have <span className="font-bold text-blue-600">{userStats.points} points</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {rewards.map((reward) => {
              const canAfford = userStats.points >= reward.points;
              const isAvailable = reward.available && canAfford;
              
              return (
                <Card 
                  key={reward.id} 
                  className={`p-4 relative transition-all ${
                    isAvailable ? 'hover:shadow-md border-2 border-transparent hover:border-blue-500' : 'opacity-60'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="text-4xl flex-shrink-0">{reward.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className={`font-semibold ${isAvailable ? 'text-gray-900' : 'text-gray-400'}`}>
                            {reward.name}
                          </h3>
                          <p className="text-xs text-gray-500">{reward.category}</p>
                        </div>
                        <Badge variant={isAvailable ? 'default' : 'secondary'} className="flex-shrink-0">
                          {reward.points} pts
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                        {reward.available ? (
                          <>
                            <span className="flex items-center gap-1">
                              📦 {reward.stock} left
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="flex items-center gap-1">
                              🔥 {reward.popularity}
                            </span>
                          </>
                        ) : (
                          <span className="text-red-500">Out of Stock</span>
                        )}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full"
                        disabled={!isAvailable}
                        variant={isAvailable ? 'default' : 'secondary'}
                        onClick={() => handleRedeemReward(reward)}
                      >
                        {!reward.available ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Out of Stock
                          </>
                        ) : !canAfford ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Need {reward.points - userStats.points} more points
                          </>
                        ) : (
                          <>
                            <Gift className="w-4 h-4 mr-2" />
                            Redeem Now
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Top Savers</h2>
            <Badge variant="outline">
              Your Rank: #{userStats.rank}
            </Badge>
          </div>
          
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <Card 
                key={user.rank} 
                className={`p-4 ${
                  user.isYou ? 'border-2 border-blue-500 bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {user.rank <= 3 ? (
                      <div className="relative">
                        <div className="text-3xl">{user.avatar}</div>
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                          user.rank === 2 ? 'bg-gray-300 text-gray-700' :
                          'bg-orange-400 text-orange-900'
                        }`}>
                          {user.rank}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-400 w-8 text-center">
                          #{user.rank}
                        </span>
                        <div className="text-2xl">{user.avatar}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">
                        {user.name}
                        {user.isYou && <span className="text-blue-600 ml-1">✨</span>}
                      </h3>
                      <Badge variant={user.rank <= 3 ? 'default' : 'secondary'} className="flex-shrink-0">
                        {user.points} pts
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>{user.level}</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        {user.streak} days
                      </span>
                    </div>
                  </div>
                  
                  {user.rank <= 3 && (
                    <Crown className={`w-6 h-6 flex-shrink-0 ${
                      user.rank === 1 ? 'text-yellow-500' :
                      user.rank === 2 ? 'text-gray-400' :
                      'text-orange-500'
                    }`} />
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <p className="text-sm text-center text-gray-700">
              💪 Keep saving to climb the ranks! Top 3 savers get special badges each month.
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Redeem Confirmation Dialog */}
      <Dialog open={showRedeemDialog} onOpenChange={setShowRedeemDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Redemption</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem this reward?
            </DialogDescription>
          </DialogHeader>
          
          {selectedReward && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl">{selectedReward.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedReward.name}</h3>
                  <p className="text-sm text-gray-600">{selectedReward.category}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-semibold">{selectedReward.points} points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Balance:</span>
                  <span className="font-semibold">{userStats.points} points</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Remaining Balance:</span>
                  <span className="font-semibold text-blue-600">
                    {userStats.points - selectedReward.points} points
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowRedeemDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={confirmRedeem}
                >
                  Confirm Redeem
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Achievement Tips */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-800 mb-1">💡 Pro Tips</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Complete daily challenges to earn bonus points and maintain streaks</li>
              <li>• Earn badges to unlock exclusive rewards</li>
              <li>• Join group challenges for bigger point rewards</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
