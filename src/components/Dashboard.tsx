import React from 'react';
import { TrendingDown, TrendingUp, Shield, Flame, Star, Lock } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface DashboardProps {
  onEmergencyMode: () => void;
  userData?: any;
}

export default function Dashboard({ onEmergencyMode, userData }: DashboardProps) {
  const weeklyBudget = 1500;
  const weeklySpent = 890;
  const weeklyRemaining = weeklyBudget - weeklySpent;
  const spentPercentage = (weeklySpent / weeklyBudget) * 100;

  const todayTransactions = [
    { id: 1, name: 'Coffee Shop', amount: 45, category: 'Food', time: '2 hours ago', essential: false },
    { id: 2, name: 'Bus Fare', amount: 25, category: 'Transport', time: '4 hours ago', essential: true },
    { id: 3, name: 'Lunch', amount: 120, category: 'Food', time: '6 hours ago', essential: true },
  ];

  const isOverBudget = spentPercentage > 80;

  return (
    <div className="p-4 space-y-6 max-h-full overflow-y-auto">
      {/* Daily Motivation */}
      <Card className="p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Flame className="w-5 h-5 text-orange-300" />
            <span className="font-semibold">7 Day Streak!</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-sm">Bronze Saver</span>
          </div>
        </div>
        <p className="mt-2 text-sm opacity-90">
          "Great job staying under budget! You're ₹610 ahead of your weekly goal. 🎉"
        </p>
      </Card>

      {/* Budget Overview */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Weekly Budget</h2>
          <Badge variant={isOverBudget ? 'destructive' : 'secondary'}>
            {isOverBudget ? 'Over Budget' : 'On Track'}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Spent: ₹{weeklySpent}</span>
            <span>Remaining: ₹{weeklyRemaining}</span>
          </div>
          
          <Progress value={spentPercentage} className="h-3" />
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <p className="text-sm font-medium">Today</p>
              <p className="text-lg font-semibold text-red-600">₹190</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <TrendingDown className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <p className="text-sm font-medium">Avg Daily</p>
              <p className="text-lg font-semibold text-green-600">₹127</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Parental Lock Status */}
      {isOverBudget && (
        <Card className="p-4 border-orange-200 bg-orange-50">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-orange-600" />
            <div>
              <h3 className="font-medium text-orange-800">Spending Locked</h3>
              <p className="text-sm text-orange-600">
                Non-essential purchases require parent approval
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Today's Transactions */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Today's Activity</h2>
        <div className="space-y-3">
          {todayTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{transaction.name}</p>
                  {!transaction.essential && isOverBudget && (
                    <Lock className="w-3 h-3 text-orange-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {transaction.category} • {transaction.time}
                </p>
              </div>
              <p className="font-semibold text-red-600">-₹{transaction.amount}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="p-4 h-auto flex flex-col gap-2"
          onClick={onEmergencyMode}
        >
          <Shield className="w-6 h-6 text-red-500" />
          <span>Emergency Mode</span>
        </Button>
        <Button
          variant="outline"
          className="p-4 h-auto flex flex-col gap-2"
        >
          <TrendingUp className="w-6 h-6 text-blue-500" />
          <span>Add Goal</span>
        </Button>
      </div>

      {/* AI Insight */}
      <Card className="p-4 bg-purple-50 border-purple-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-semibold text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-medium text-purple-800">Weekly Insight</h3>
            <p className="text-sm text-purple-700 mt-1">
              You spend 40% more on weekends. Try setting weekend-specific budgets to stay on track!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

