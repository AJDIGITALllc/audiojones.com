// src/app/portal/admin/events/page.tsx
// Admin subscription events listing with Firestore integration

import { getSubscriptionEvents } from '@/lib/firestore/collections';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, DollarSign, Calendar, AlertCircle } from 'lucide-react';

export default async function AdminEvents() {
  // Fetch events server-side
  const events = await getSubscriptionEvents(100);
  
  // Group events by type for stats
  const eventStats = events.reduce((acc, event) => {
    const type = event.event_type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getEventIcon = (eventType: string) => {
    if (eventType.includes('payment')) return DollarSign;
    if (eventType.includes('subscription')) return Activity;
    return AlertCircle;
  };

  const getEventColor = (eventType: string) => {
    if (eventType.includes('payment.succeeded') || eventType.includes('invoice.paid')) 
      return 'border-green-500 text-green-400';
    if (eventType.includes('payment.failed')) 
      return 'border-red-500 text-red-400';
    if (eventType.includes('subscription.created')) 
      return 'border-blue-500 text-blue-400';
    if (eventType.includes('subscription.cancelled')) 
      return 'border-orange-500 text-orange-400';
    return 'border-gray-500 text-gray-400';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscription Events</h1>
          <p className="text-gray-400 mt-1">
            Monitor webhook events and subscription activities
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Total: {events.length} events
          </div>
        </div>
      </div>

      {/* Event Type Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(eventStats).map(([type, count]) => {
          const Icon = getEventIcon(type);
          return (
            <Card key={type}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 capitalize">
                      {type.replace(/[._]/g, ' ')}
                    </p>
                    <p className="text-xl font-bold text-white">{count}</p>
                  </div>
                  <Icon className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Events Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Event Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Activity className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <p>No events found</p>
              <p className="text-sm mt-1">Webhook events will appear here as they are processed</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event, index) => {
                const Icon = getEventIcon(event.event_type);
                return (
                  <div key={event.id || index} className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant="outline"
                            className={getEventColor(event.event_type)}
                          >
                            {event.event_type}
                          </Badge>
                          {event.customer_email && (
                            <span className="text-sm text-gray-300">
                              {event.customer_email}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {event.amount && (
                            <span className="text-sm font-medium text-white">
                              ${(event.amount / 100).toFixed(2)}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                          {event.whop_user_id && (
                            <div>
                              <span className="font-medium">User ID:</span> {event.whop_user_id}
                            </div>
                          )}
                          {event.subscription_id && (
                            <div>
                              <span className="font-medium">Subscription:</span> {event.subscription_id}
                            </div>
                          )}
                          {event.tier && (
                            <div>
                              <span className="font-medium">Tier:</span> {event.tier}
                            </div>
                          )}
                          {event.currency && (
                            <div>
                              <span className="font-medium">Currency:</span> {event.currency.toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Raw data preview (collapsible) */}
                      {event.raw_data && (
                        <details className="mt-3">
                          <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                            View raw data
                          </summary>
                          <pre className="mt-2 text-xs bg-gray-900 p-3 rounded overflow-x-auto text-gray-400">
                            {JSON.stringify(event.raw_data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Filters (for future enhancement) */}
      <Card>
        <CardHeader>
          <CardTitle>Event Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700">
              All Events
            </button>
            <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700">
              Payments Only
            </button>
            <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700">
              Subscriptions Only
            </button>
            <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700">
              Failures Only
            </button>
            <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md text-sm hover:bg-gray-700">
              Last 24 Hours
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}