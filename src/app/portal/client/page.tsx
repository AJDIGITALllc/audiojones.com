// src/app/portal/client/page.tsx
// Client dashboard with user's subscription info and resources

'use client';

import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  User, 
  Calendar, 
  CreditCard, 
  Download,
  ExternalLink,
  Crown,
  Settings
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface UserSubscription {
  tier: string;
  status: 'active' | 'cancelled' | 'expired';
  renewalDate: string;
  nextBilling: number;
  features: string[];
}

export default function ClientDashboard() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock subscription data - in real app, fetch from Whop API or Firestore
    const mockSubscription: UserSubscription = {
      tier: 'Professional',
      status: 'active',
      renewalDate: '2024-12-15',
      nextBilling: 99.00,
      features: [
        'Custom AI Voice Generation',
        'Premium Sound Library',
        'Advanced Audio Processing',
        'Priority Support',
        'Commercial Usage Rights'
      ]
    };

    setTimeout(() => {
      setSubscription(mockSubscription);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.displayName || user?.email || 'User'}!
          </h1>
          <p className="text-gray-400 mt-1">
            Manage your AudioJones subscription and access your creative tools
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-400" />
              <span>Current Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">
                  {subscription?.tier}
                </span>
                <Badge
                  variant="outline"
                  className={
                    subscription?.status === 'active'
                      ? 'border-green-500 text-green-400'
                      : 'border-red-500 text-red-400'
                  }
                >
                  {subscription?.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-400">
                Premium AI audio generation and processing
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <span>Next Billing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-white">
                {subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString() : 'N/A'}
              </div>
              <p className="text-sm text-gray-400">
                ${subscription?.nextBilling?.toFixed(2) || '0.00'} will be charged
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-purple-400" />
              <span>Billing</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                Manage Billing
              </button>
              <p className="text-xs text-gray-500 text-center">
                Update payment method or view invoices
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Features */}
      <Card>
        <CardHeader>
          <CardTitle>Your Plan Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscription?.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-green-400" />
              <span>Resources & Downloads</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Download className="h-4 w-4 text-gray-400" />
                  <span className="text-white">AI Voice Models</span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Download className="h-4 w-4 text-gray-400" />
                  <span className="text-white">Sound Library</span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Download className="h-4 w-4 text-gray-400" />
                  <span className="text-white">Documentation</span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-400" />
              <span>Account Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-white">Profile Settings</span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <span className="text-white">Subscription Details</span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Settings className="h-4 w-4" />
                  <span>Cancel Subscription</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Stats (placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">47</div>
              <div className="text-sm text-gray-400">AI Generations</div>
              <div className="text-xs text-gray-500 mt-1">of 500 included</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">12.3 GB</div>
              <div className="text-sm text-gray-400">Storage Used</div>
              <div className="text-xs text-gray-500 mt-1">of 100 GB included</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">156</div>
              <div className="text-sm text-gray-400">API Calls</div>
              <div className="text-xs text-gray-500 mt-1">of 10,000 included</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}