import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface AnalyticsProps {
  userData?: any;
}

export default function Analytics({ userData }: AnalyticsProps) {
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  // Mock data for weekly spending and savings
  const weeklyData = [
    { day: 'Mon', spending: 245, savings: 155, budget: 400 },
    { day: 'Tue', spending: 189, savings: 211, budget: 400 },
    { day: 'Wed', spending: 312, savings: 88, budget: 400 },
    { day: 'Thu', spending: 198, savings: 202, budget: 400 },
    { day: 'Fri', spending: 267, savings: 133, budget: 400 },
    { day: 'Sat', spending: 423, savings: -23, budget: 400 },
    { day: 'Sun', spending: 356, savings: 44, budget: 400 },
  ];

  // Mock data for monthly spending and savings
  const monthlyData = [
    { week: 'Week 1', spending: 1240, savings: 760, budget: 2000 },
    { week: 'Week 2', spending: 1567, savings: 433, budget: 2000 },
    { week: 'Week 3', spending: 1089, savings: 911, budget: 2000 },
    { week: 'Week 4', spending: 1890, savings: 110, budget: 2000 },
  ];

  // Calculate totals
  const weeklyTotalSpending = weeklyData.reduce((sum, day) => sum + day.spending, 0);
  const weeklyTotalSavings = weeklyData.reduce((sum, day) => sum + day.savings, 0);
  const monthlyTotalSpending = monthlyData.reduce((sum, week) => sum + week.spending, 0);
  const monthlyTotalSavings = monthlyData.reduce((sum, week) => sum + week.savings, 0);

  // Category breakdown data
  const categoryData = [
    { category: 'Food', amount: 890, percentage: 36, color: '#f59e0b' },
    { category: 'Transport', amount: 450, percentage: 18, color: '#3b82f6' },
    { category: 'Entertainment', amount: 320, percentage: 13, color: '#8b5cf6' },
    { category: 'Shopping', amount: 560, percentage: 23, color: '#ec4899' },
    { category: 'Others', amount: 250, percentage: 10, color: '#10b981' },
  ];

  const currentData = view === 'weekly' ? weeklyData : monthlyData;
  const totalSpending = view === 'weekly' ? weeklyTotalSpending : monthlyTotalSpending;
  const totalSavings = view === 'weekly' ? weeklyTotalSavings : monthlyTotalSavings;
  const savingsRate = ((totalSavings / (totalSpending + totalSavings)) * 100).toFixed(1);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-700">Total Spending</p>
          </div>
          <p className="text-2xl font-semibold text-red-700">₹{totalSpending}</p>
          <p className="text-xs text-red-600 mt-1">
            {view === 'weekly' ? 'This Week' : 'This Month'}
          </p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700">Total Savings</p>
          </div>
          <p className="text-2xl font-semibold text-green-700">₹{totalSavings}</p>
          <p className="text-xs text-green-600 mt-1">
            {savingsRate}% savings rate
          </p>
        </Card>
      </div>

      {/* View Toggle */}
      <Tabs value={view} onValueChange={(v) => setView(v as 'weekly' | 'monthly')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">
            <Calendar className="w-4 h-4 mr-2" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="monthly">
            <BarChart3 className="w-4 h-4 mr-2" />
            Monthly
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6 mt-4">
          {/* Weekly Spending vs Savings Chart */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Weekly Spending & Savings</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                />
                <Area
                  type="monotone"
                  dataKey="spending"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Spending"
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Savings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Weekly Comparison Bar Chart */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Daily Comparison</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                />
                <Bar dataKey="spending" fill="#ef4444" name="Spending" radius={[4, 4, 0, 0]} />
                <Bar dataKey="savings" fill="#10b981" name="Savings" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6 mt-4">
          {/* Monthly Spending vs Savings Chart */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Monthly Spending & Savings</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                />
                <Area
                  type="monotone"
                  dataKey="spending"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Spending"
                />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Savings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Monthly Comparison Bar Chart */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Weekly Comparison</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                />
                <Bar dataKey="spending" fill="#ef4444" name="Spending" radius={[4, 4, 0, 0]} />
                <Bar dataKey="savings" fill="#10b981" name="Savings" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Spending by Category */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Spending by Category</h3>
        <div className="space-y-3">
          {categoryData.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm font-medium">{cat.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">₹{cat.amount}</span>
                  <Badge variant="secondary" className="text-xs">
                    {cat.percentage}%
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${cat.percentage}%`,
                    backgroundColor: cat.color 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-semibold text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Analytics Insight</h3>
            <p className="text-sm text-blue-700 mt-1">
              Your spending peaks on weekends. Consider setting aside a weekend entertainment budget to avoid overspending. You saved {savingsRate}% {view === 'weekly' ? 'this week' : 'this month'} - {parseFloat(savingsRate) >= 20 ? 'excellent work!' : 'try to increase to 20%!'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
