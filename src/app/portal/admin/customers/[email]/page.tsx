'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Calendar, Package, User, AlertCircle, RefreshCw } from 'lucide-react';

interface Customer {
  email: string;
  status: string;
  billing_sku?: string;
  service_id?: string;
  tier_id?: string;
  updated_at: string;
}

interface SubscriptionEvent {
  id: string;
  event_type: string;
  customer_email: string;
  whop_user_id?: string;
  tier?: string;
  timestamp: string;
  processed_at: string;
  raw_data?: any;
}

interface CustomerDetailResponse {
  ok: boolean;
  customer: Customer | null;
  events: SubscriptionEvent[];
  error?: string;
}

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const email = decodeURIComponent(params.email as string);
  
  const [data, setData] = useState<CustomerDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomerDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/customers/${encodeURIComponent(email)}`, {
        headers: {
          'admin-key': 'gGho3TE8ztiSAMvORfyCDem62Fk0xpW1',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result: CustomerDetailResponse = await response.json();
      setData(result);
      setError(null);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerDetail();
  }, [email]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'default';
      case 'cancelled':
      case 'inactive':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'subscription.created':
        return 'text-green-600';
      case 'subscription.cancelled':
        return 'text-red-600';
      case 'payment.succeeded':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded" />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-32 w-full bg-gray-200 animate-pulse rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-red-600">Error Loading Customer</h1>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="font-medium text-red-600">Failed to load customer details</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
              <button
                onClick={fetchCustomerDetail}
                className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data?.customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold">Customer Not Found</h1>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="font-medium">Customer not found</p>
              <p className="text-sm text-muted-foreground mt-1">
                No customer with email "{email}" exists in the database.
              </p>
              <button
                onClick={() => router.push('/portal/admin/customers')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Back to Customers
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { customer, events } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold">{customer.email}</h1>
          <Badge variant={getStatusBadgeVariant(customer.status)}>
            {customer.status}
          </Badge>
        </div>
        <button
          onClick={fetchCustomerDetail}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
            <CardDescription>Core customer data and subscription details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Email:</span>
              <span className="text-muted-foreground">{customer.email}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Status:</span>
              <Badge variant={getStatusBadgeVariant(customer.status)}>
                {customer.status}
              </Badge>
            </div>

            {customer.billing_sku && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Billing SKU:</span>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {customer.billing_sku}
                </code>
              </div>
            )}

            {customer.service_id && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Service ID:</span>
                <span className="text-muted-foreground">{customer.service_id}</span>
              </div>
            )}

            {customer.tier_id && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Tier ID:</span>
                <span className="text-muted-foreground">{customer.tier_id}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="font-medium">Last Updated:</span>
              <span className="text-muted-foreground">
                {formatDate(customer.updated_at)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Activity Summary
            </CardTitle>
            <CardDescription>Recent webhook events and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Total Events:</span>
                <span className="text-2xl font-bold">{events.length}</span>
              </div>
              
              {events.length > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="font-medium">Latest Event:</span>
                    <span className={`font-medium ${getEventTypeColor(events[0].event_type)}`}>
                      {events[0].event_type}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-medium">Last Activity:</span>
                    <span className="text-muted-foreground">
                      {formatDate(events[0].timestamp)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Event Timeline
          </CardTitle>
          <CardDescription>
            All subscription events for this customer, ordered by most recent
          </CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No events found for this customer</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${getEventTypeColor(event.event_type)}`}>
                        {event.event_type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(event.timestamp)}
                      </span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground space-y-1">
                      {event.whop_user_id && (
                        <div>Whop User: {event.whop_user_id}</div>
                      )}
                      {event.tier && (
                        <div>Tier: {event.tier}</div>
                      )}
                      <div>Processed: {formatDate(event.processed_at)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}