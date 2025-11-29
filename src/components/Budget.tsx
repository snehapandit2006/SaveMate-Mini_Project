import React, { useState } from 'react';
import { TrendingDown, TrendingUp, PlusCircle, Settings, BarChart3, Bell } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function Budget() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const weeklyBudget = {
    total: 1500,
    spent: 890,
    categories: [
      { name: 'Food', budget: 600, spent: 420, icon: 'restaurant', color: '#ef4444', essential: true },
      { name: 'Transport', budget: 300, spent: 180, icon: 'car', color: '#3b82f6', essential: true },
      { name: 'Entertainment', budget: 400, spent: 240, icon: 'game-controller', color: '#8b5cf6', essential: false },
      { name: 'Shopping', budget: 200, spent: 50, icon: 'bag', color: '#f59e0b', essential: false },
    ]
  };



  const getPercentage = (spent: number, budget: number) => ((spent / budget) * 100).toFixed(1);
  const isOverBudget = (spent: number, budget: number) => spent > budget;

  return (
    <div className="p-4 space-y-6 max-h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Budget Tracker</h1>
        <p className="text-gray-600">Monitor your spending patterns</p>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-lg p-1 shadow-sm mb-6">
        <div className="flex">
          {['week', 'month'].map((period) => (
            <button
              key={period}
              className={`flex-1 py-2 text-center rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setSelectedPeriod(period)}
            >
              {period === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Overview */}
      <Card className="p-4 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-1">Weekly Budget</h2>
            <p className="text-sm text-gray-600">
              ₹{weeklyBudget.spent} of ₹{weeklyBudget.total} spent
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-green-600">
              ₹{weeklyBudget.total - weeklyBudget.spent}
            </p>
            <p className="text-xs text-gray-500">Remaining</p>
          </div>
        </div>
        
        <Progress 
          value={(weeklyBudget.spent / weeklyBudget.total) * 100} 
          className="h-2 mb-2" 
        />
        
        <p className="text-sm text-gray-600 text-center">
          {getPercentage(weeklyBudget.spent, weeklyBudget.total)}% of budget used
        </p>
      </Card>

      {/* Spending Chart */}
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-center">Spending Breakdown</h2>
        <div className="grid grid-cols-2 gap-4">
          {weeklyBudget.categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: category.color }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{category.name}</p>
                <p className="text-xs text-gray-600">₹{category.spent}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Category Details</h2>
        
        <div className="space-y-4">
          {weeklyBudget.categories.map((category, index) => {
            const percentage = parseFloat(getPercentage(category.spent, category.budget));
            const overBudget = isOverBudget(category.spent, category.budget);
            const IconComponent = category.icon === 'restaurant' ? TrendingUp : 
                               category.icon === 'car' ? TrendingDown : 
                               category.icon === 'game-controller' ? BarChart3 : TrendingUp;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <IconComponent size={20} color={category.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{category.name}</h3>
                        {category.essential && (
                          <Badge variant="secondary" className="text-xs">Essential</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        ₹{category.spent} / ₹{category.budget}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${overBudget ? 'text-red-600' : 'text-gray-900'}`}>
                      {percentage}%
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all" 
                    style={{ 
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: overBudget ? '#ef4444' : category.color
                    }}
                  />
                </div>
                
                {overBudget && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                    <Bell size={16} className="text-red-600" />
                    <p className="text-sm text-red-600">
                      Over budget by ₹{category.spent - category.budget}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <span className="text-sm">Add Expense</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
            <Settings className="w-6 h-6 text-green-600" />
            <span className="text-sm">Adjust Budget</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <span className="text-sm">View Reports</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
            <Bell className="w-6 h-6 text-orange-600" />
            <span className="text-sm">Set Alerts</span>
          </Button>
        </div>
      </Card>

      {/* AI Insight */}
      <Card className="p-4 bg-purple-50 border-purple-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-semibold text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-medium text-purple-800">Budget Insight</h3>
            <p className="text-sm text-purple-700 mt-1">
              Your entertainment spending is 20% below budget this week. Consider allocating some to savings goals!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

