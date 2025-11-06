import React, { useState } from 'react';
import { Target, Plus, Smartphone, MapPin, Gamepad2, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface GoalsProps {
  openAddDialog?: boolean;
}

export default function Goals({ openAddDialog = false }: GoalsProps) {
  const [showAddGoal, setShowAddGoal] = useState(openAddDialog);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [autoSaveAmount, setAutoSaveAmount] = useState('');

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'New iPhone',
      target: 80000,
      saved: 32000,
      icon: Smartphone,
      color: 'blue',
      autoSave: 2500,
      timeframe: '12 weeks',
      type: 'personal'
    },
    {
      id: 2,
      name: 'Summer Trip',
      target: 120000,
      saved: 45000,
      icon: MapPin,
      color: 'green',
      autoSave: 4000,
      timeframe: '16 weeks',
      type: 'personal'
    },
    {
      id: 3,
      name: 'Gaming Setup',
      target: 60000,
      saved: 18000,
      icon: Gamepad2,
      color: 'purple',
      autoSave: 1500,
      timeframe: '20 weeks',
      type: 'personal'
    },
    {
      id: 4,
      name: 'Family Gift Fund',
      target: 30000,
      saved: 12000,
      icon: Users,
      color: 'orange',
      autoSave: 1000,
      timeframe: '8 weeks',
      type: 'group'
    }
  ]);

  const handleCreateGoal = () => {
    // Validate inputs
    if (!goalName.trim() || !targetAmount || !autoSaveAmount) {
      toast.error('Please fill in all fields');
      return;
    }

    const target = parseInt(targetAmount);
    const autoSave = parseInt(autoSaveAmount);

    if (target <= 0 || autoSave <= 0) {
      toast.error('Please enter valid amounts');
      return;
    }

    // Calculate estimated timeframe
    const weeksNeeded = Math.ceil(target / autoSave);
    const timeframe = `${weeksNeeded} weeks`;

    // Create new goal object
    const newGoal = {
      id: goals.length + 1,
      name: goalName,
      target: target,
      saved: 0,
      icon: Target, // Default icon
      color: 'blue',
      autoSave: autoSave,
      timeframe: timeframe,
      type: 'personal'
    };

    // Add to goals list
    setGoals([...goals, newGoal]);

    // Clear form
    setGoalName('');
    setTargetAmount('');
    setAutoSaveAmount('');

    // Close dialog
    setShowAddGoal(false);

    // Show success message
    toast.success(`Goal "${goalName}" created successfully! 🎯`, {
      description: `Target: ₹${target.toLocaleString('en-IN')} • Auto-save: ₹${autoSave}/week`
    });
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.saved, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);

  return (
    <div className="p-4 space-y-6 max-h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Savings Goals</h1>
          <p className="text-gray-600">Track your progress and stay motivated</p>
        </div>
        <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set up a new savings goal to help you reach your financial targets.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goalName">Goal Name</Label>
                <Input 
                  id="goalName" 
                  placeholder="What are you saving for?" 
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                <Input 
                  id="targetAmount" 
                  type="number" 
                  placeholder="50000" 
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="autoSave">Weekly Auto-Save (₹)</Label>
                <Input 
                  id="autoSave" 
                  type="number" 
                  placeholder="2500" 
                  value={autoSaveAmount}
                  onChange={(e) => setAutoSaveAmount(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleCreateGoal}>
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overall Progress */}
      <Card className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Total Progress</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Saved: ₹{totalSaved.toLocaleString('en-IN')}</span>
            <span>Target: ₹{totalTarget.toLocaleString('en-IN')}</span>
          </div>
          <Progress value={(totalSaved / totalTarget) * 100} className="bg-white/20" />
          <p className="text-sm opacity-90">
            {((totalSaved / totalTarget) * 100).toFixed(1)}% complete across all goals
          </p>
        </div>
      </Card>

      {/* Individual Goals */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.saved / goal.target) * 100;
          const Icon = goal.icon;
          
          return (
            <Card key={goal.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-${goal.color}-100 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${goal.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{goal.name}</h3>
                    <p className="text-sm text-gray-500">{goal.timeframe} • ₹{goal.autoSave}/week</p>
                  </div>
                </div>
                <Badge variant={goal.type === 'group' ? 'secondary' : 'outline'}>
                  {goal.type === 'group' ? 'Group' : 'Personal'}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>₹{goal.saved.toLocaleString('en-IN')} saved</span>
                  <span>₹{(goal.target - goal.saved).toLocaleString('en-IN')} to go</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{progress.toFixed(1)}% complete</span>
                  <Button variant="ghost" size="sm">
                    Boost Savings
                  </Button>
                </div>
              </div>

              {goal.type === 'group' && (
                <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">
                    👨‍👩‍👧‍👦 3 family members contributing • ₹4500/week combined
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Savings Tips */}
      <Card className="p-4 bg-green-50 border-green-200">
        <h3 className="font-semibold text-green-800 mb-2">💡 Smart Saving Tip</h3>
        <p className="text-sm text-green-700">
          Round up your purchases! Enable "Spare Change" to automatically round up transactions and save the difference.
        </p>
        <Button variant="outline" size="sm" className="mt-2 border-green-300 text-green-700">
          Enable Round-ups
        </Button>
      </Card>
    </div>
  );
}