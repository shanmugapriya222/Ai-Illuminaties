import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  Briefcase,
  Shield
} from 'lucide-react';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const getUserStats = () => ({
    totalUsers: 12450,
    activeUsers: 8930,
    newSignups: 342,
    retentionRate: 78.5,
    completionRate: 65.2
  });

  const getEngagementMetrics = () => [
    { name: 'Quiz Completion', value: 89, change: 5.2 },
    { name: 'Career Path Views', value: 76, change: -2.1 },
    { name: 'Skill Assessments', value: 67, change: 8.3 },
    { name: 'Interview Practice', value: 45, change: 12.5 },
    { name: 'VR Experiences', value: 34, change: 15.7 }
  ];

  const getRevenueData = () => ({
    totalRevenue: 145230,
    subscriptions: 89340,
    partnerships: 34560,
    premiumUpgrades: 21330,
    monthlyGrowth: 12.3
  });

  const getTopPartners = () => [
    { name: 'TechCorp University', students: 2340, revenue: 23400, status: 'active' },
    { name: 'Global Business School', students: 1890, revenue: 18900, status: 'active' },
    { name: 'Innovation Institute', students: 1560, revenue: 15600, status: 'pending' },
    { name: 'Future Skills Academy', students: 1234, revenue: 12340, status: 'active' },
    { name: 'Career Development Center', students: 987, revenue: 9870, status: 'active' }
  ];

  const getSystemHealth = () => [
    { metric: 'API Response Time', value: 245, unit: 'ms', status: 'good' },
    { metric: 'Database Performance', value: 98.7, unit: '%', status: 'excellent' },
    { metric: 'CDN Availability', value: 99.9, unit: '%', status: 'excellent' },
    { metric: 'User Session Length', value: 24.5, unit: 'min', status: 'good' },
    { metric: 'Error Rate', value: 0.02, unit: '%', status: 'excellent' }
  ];

  const userStats = getUserStats();
  const engagementMetrics = getEngagementMetrics();
  const revenueData = getRevenueData();
  const topPartners = getTopPartners();
  const systemHealth = getSystemHealth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-xl text-gray-600">System performance, user engagement, and business metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{formatNumber(userStats.totalUsers)}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{formatNumber(userStats.activeUsers)}</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{userStats.completionRate}%</p>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl text-gray-900">{formatCurrency(revenueData.totalRevenue)}</p>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Engagement Overview */}
          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-6">Feature Engagement</h2>
            <div className="space-y-4">
              {engagementMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-900">{metric.name}</span>
                      <span className="text-sm text-gray-600">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                  <div className={`ml-4 px-2 py-1 rounded text-xs ${
                    metric.change > 0 ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-4">Recent System Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-green-900">System backup completed successfully</p>
                  <p className="text-sm text-green-700">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-blue-900">New university partnership activated</p>
                  <p className="text-sm text-blue-700">4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-yellow-900">High server load detected and resolved</p>
                  <p className="text-sm text-yellow-700">6 hours ago</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">User Growth</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New signups (7d)</span>
                  <span className="text-2xl text-gray-900">{formatNumber(userStats.newSignups)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Retention rate</span>
                  <span className="text-2xl text-gray-900">{userStats.retentionRate}%</span>
                </div>
                <Progress value={userStats.retentionRate} className="h-3" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">User Distribution</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pre-University</span>
                  <span className="text-gray-900">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">University</span>
                  <span className="text-gray-900">35%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Seekers</span>
                  <span className="text-gray-900">20%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Geographic Distribution</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">North America</span>
                  <span className="text-gray-900">40%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Europe</span>
                  <span className="text-gray-900">30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Asia Pacific</span>
                  <span className="text-gray-900">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Other</span>
                  <span className="text-gray-900">5%</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-6">Feature Usage Analytics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg text-gray-900">Most Popular Features</h3>
                {engagementMetrics.slice(0, 3).map((metric, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-800 text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{metric.name}</p>
                      <p className="text-sm text-gray-600">{metric.value}% usage rate</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg text-gray-900">Growth Opportunities</h3>
                {engagementMetrics.slice(3).map((metric, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{metric.name}</p>
                      <p className="text-sm text-gray-600">{metric.value}% usage rate</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      +{metric.change}% potential
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-900">{formatCurrency(revenueData.subscriptions)}</p>
                  <p className="text-sm text-gray-600">Subscriptions</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-900">{formatCurrency(revenueData.partnerships)}</p>
                  <p className="text-sm text-gray-600">Partnerships</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-900">{formatCurrency(revenueData.premiumUpgrades)}</p>
                  <p className="text-sm text-gray-600">Premium</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-lg text-gray-900">+{revenueData.monthlyGrowth}%</p>
                  <p className="text-sm text-gray-600">Growth</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-6">Top University Partners</h2>
            <div className="space-y-4">
              {topPartners.map((partner, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-800 text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-gray-900">{partner.name}</h3>
                      <p className="text-sm text-gray-600">{formatNumber(partner.students)} students</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-900">{formatCurrency(partner.revenue)}</span>
                    <Badge variant="outline" className={getStatusColor(partner.status)}>
                      {partner.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl text-gray-900 mb-6">System Performance Metrics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {systemHealth.map((health, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-900">{health.metric}</h3>
                    <Badge variant="outline" className={getStatusColor(health.status)}>
                      {health.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl text-gray-900">{health.value}</span>
                    <span className="text-gray-600">{health.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Security Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-green-900">SSL Certificates Valid</p>
                    <p className="text-sm text-green-700">Expires in 45 days</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-green-900">Data Encryption Active</p>
                    <p className="text-sm text-green-700">AES-256 encryption</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-green-900">Security Audit Passed</p>
                    <p className="text-sm text-green-700">Last check: 2 days ago</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Maintenance Schedule</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-gray-900">Database Optimization</p>
                    <p className="text-sm text-gray-600">Scheduled for Sunday 2 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-gray-900">CDN Cache Refresh</p>
                    <p className="text-sm text-gray-600">Scheduled for Monday 1 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-gray-900">Security Updates</p>
                    <p className="text-sm text-gray-600">Scheduled for Tuesday 3 AM</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}