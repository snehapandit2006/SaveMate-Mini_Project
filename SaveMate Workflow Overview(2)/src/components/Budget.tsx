import React, { useState } from 'react';
import { TrendingDown, TrendingUp, PlusCircle, Settings, BarChart3, Bell, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';
import Analytics from './Analytics';

export default function Budget() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAdjustBudget, setShowAdjustBudget] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [alerts, setAlerts] = useState({
    overBudget: true,
    approaching: true,
    dailySpending: false,
    weeklyReport: true,
    unusualActivity: true,
  });

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

  const monthlyBudget = {
    total: 6000,
    spent: 3450,
    categories: [
      { name: 'Food', budget: 2400, spent: 1680, icon: 'restaurant', color: '#ef4444', essential: true },
      { name: 'Transport', budget: 1200, spent: 850, icon: 'car', color: '#3b82f6', essential: true },
      { name: 'Entertainment', budget: 1600, spent: 720, icon: 'game-controller', color: '#8b5cf6', essential: false },
      { name: 'Shopping', budget: 800, spent: 200, icon: 'bag', color: '#f59e0b', essential: false },
    ]
  };

  const currentBudget = selectedPeriod === 'week' ? weeklyBudget : monthlyBudget;

  const getPercentage = (spent: number, budget: number) => ((spent / budget) * 100).toFixed(1);
  const isOverBudget = (spent: number, budget: number) => spent > budget;

  const handleAddExpense = () => {
    setShowAddExpense(true);
  };

  const handleAdjustBudget = () => {
    setShowAdjustBudget(true);
  };

  const handleViewReports = () => {
    setShowReports(true);
  };

  const handleSetAlerts = () => {
    setShowAlerts(true);
  };

  const handleSaveAlerts = () => {
    setShowAlerts(false);
    toast.success('Alerts updated successfully!', {
      description: 'Your notification preferences have been saved.',
    });
  };

  const toggleAlert = (alertKey: keyof typeof alerts) => {
    setAlerts(prev => ({
      ...prev,
      [alertKey]: !prev[alertKey]
    }));
  };

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
            <h2 className="text-lg font-semibold mb-1">
              {selectedPeriod === 'week' ? 'Weekly' : 'Monthly'} Budget
            </h2>
            <p className="text-sm text-gray-600">
              ₹{currentBudget.spent} of ₹{currentBudget.total} spent
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold text-green-600">
              ₹{currentBudget.total - currentBudget.spent}
            </p>
            <p className="text-xs text-gray-500">Remaining</p>
          </div>
        </div>
        
        <Progress 
          value={(currentBudget.spent / currentBudget.total) * 100} 
          className="h-2 mb-2" 
        />
        
        <p className="text-sm text-gray-600 text-center">
          {getPercentage(currentBudget.spent, currentBudget.total)}% of budget used
        </p>
      </Card>

      {/* Spending Chart */}
      <Card className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-center">Spending Breakdown</h2>
        <div className="grid grid-cols-2 gap-4">
          {currentBudget.categories.map((category, index) => (
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
          {currentBudget.categories.map((category, index) => {
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
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col gap-2"
            onClick={handleAddExpense}
          >
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <span className="text-sm">Add Expense</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col gap-2"
            onClick={handleAdjustBudget}
          >
            <Settings className="w-6 h-6 text-green-600" />
            <span className="text-sm">Adjust Budget</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col gap-2"
            onClick={handleViewReports}
          >
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <span className="text-sm">View Reports</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col gap-2"
            onClick={handleSetAlerts}
          >
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
              {selectedPeriod === 'week' 
                ? "Your entertainment spending is 20% below budget this week. Consider allocating some to savings goals!"
                : "You're on track to save ₹550 this month! Your food expenses are slightly higher than usual."}
            </p>
          </div>
        </div>
      </Card>

      {/* Add Expense Dialog */}
      <Dialog open={showAddExpense} onOpenChange={setShowAddExpense}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>
              Record a new expense and categorize it to track your spending.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input id="amount" type="number" placeholder="Enter amount" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select category</option>
                {currentBudget.categories.map((cat, i) => (
                  <option key={i} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="What did you spend on?" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddExpense(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowAddExpense(false);
              toast.success('Expense added successfully!');
            }}>
              Add Expense
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Budget Dialog */}
      <Dialog open={showAdjustBudget} onOpenChange={setShowAdjustBudget}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Budget</DialogTitle>
            <DialogDescription>
              Modify your budget limits for different categories.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {currentBudget.categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`budget-${index}`}>
                  {category.name} Budget (₹)
                </Label>
                <Input 
                  id={`budget-${index}`}
                  type="number" 
                  defaultValue={category.budget}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdjustBudget(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setShowAdjustBudget(false);
              toast.success('Budget updated successfully!');
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Set Alerts Dialog */}
      <Dialog open={showAlerts} onOpenChange={setShowAlerts}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Spending Alerts</DialogTitle>
            <DialogDescription>
              Choose which notifications you want to receive about your spending.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label htmlFor="overBudget" className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <div>Over Budget Alert</div>
                    <p className="text-xs text-gray-500">
                      Get notified when you exceed your budget in any category
                    </p>
                  </div>
                </Label>
              </div>
              <Switch 
                id="overBudget"
                checked={alerts.overBudget}
                onCheckedChange={() => toggleAlert('overBudget')}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label htmlFor="approaching" className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                    <div>Approaching Limit</div>
                    <p className="text-xs text-gray-500">
                      Alert when you've spent 80% of your budget
                    </p>
                  </div>
                </Label>
              </div>
              <Switch 
                id="approaching"
                checked={alerts.approaching}
                onCheckedChange={() => toggleAlert('approaching')}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label htmlFor="dailySpending" className="flex items-start gap-2">
                  <Bell className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <div>Daily Spending Summary</div>
                    <p className="text-xs text-gray-500">
                      Receive a daily summary of your expenses
                    </p>
                  </div>
                </Label>
              </div>
              <Switch 
                id="dailySpending"
                checked={alerts.dailySpending}
                onCheckedChange={() => toggleAlert('dailySpending')}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label htmlFor="weeklyReport" className="flex items-start gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-500 mt-0.5" />
                  <div>
                    <div>Weekly Report</div>
                    <p className="text-xs text-gray-500">
                      Get a weekly analysis of your spending patterns
                    </p>
                  </div>
                </Label>
              </div>
              <Switch 
                id="weeklyReport"
                checked={alerts.weeklyReport}
                onCheckedChange={() => toggleAlert('weeklyReport')}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1">
                <Label htmlFor="unusualActivity" className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <div>
                    <div>Unusual Activity</div>
                    <p className="text-xs text-gray-500">
                      Detect and alert on unusual spending patterns
                    </p>
                  </div>
                </Label>
              </div>
              <Switch 
                id="unusualActivity"
                checked={alerts.unusualActivity}
                onCheckedChange={() => toggleAlert('unusualActivity')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAlerts(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAlerts}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Reports Sheet */}
      <Sheet open={showReports} onOpenChange={setShowReports}>
        <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Spending Reports & Analytics</SheetTitle>
            <SheetDescription>
              Detailed insights into your spending patterns and trends
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Analytics />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

