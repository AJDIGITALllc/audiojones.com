"use client";

import { useEffect, useState } from "react";
import automationMappings from "@/config/automation-mappings.json";

interface AutomationEvent {
  id: string;
  timestamp: string;
  source: 'whop' | 'mailerlite';
  type: string;
  email?: string;
  productId?: string;
  status: 'success' | 'error' | 'pending';
  message?: string;
}

export default function AutomationPage() {
  const [events, setEvents] = useState<AutomationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real events from API endpoints
    // For now, show mock data
    const mockEvents: AutomationEvent[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        source: 'whop',
        type: 'purchase',
        email: 'example@artist.com',
        productId: 'whop:artist-studio',
        status: 'success',
        message: 'Successfully synced to MailerLite'
      }
    ];
    
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Automation Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor Whop ↔ MailerLite integration events and manage automation mappings.
        </p>
      </div>

      {/* Current Mappings Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Mappings</h2>
        <div className="space-y-3">
          {Object.entries(automationMappings).map(([productId, mapping]) => (
            <div key={productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-900">{productId}</span>
                <div className="text-sm text-gray-600 mt-1">
                  Tag: <code className="bg-gray-200 px-1 rounded">{mapping.mailerliteTag}</code>
                  {' • '}
                  EPM Stage: <span className="capitalize">{mapping.epmStage}</span>
                </div>
              </div>
              <div className="text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Events Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Automation Events</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4500] mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No automation events yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Events will appear here when Whop purchases or MailerLite actions occur.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      event.status === 'success' ? 'bg-green-500' :
                      event.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <span className="font-medium text-gray-900">
                        {event.source.toUpperCase()} • {event.type}
                      </span>
                      {event.email && (
                        <span className="text-gray-600 ml-2">({event.email})</span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>
                {event.productId && (
                  <div className="mt-2 text-sm text-gray-600">
                    Product: <code className="bg-gray-100 px-1 rounded">{event.productId}</code>
                  </div>
                )}
                {event.message && (
                  <div className="mt-2 text-sm text-gray-600">
                    {event.message}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Integration Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Whop Integration</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-yellow-600 font-medium">Placeholder</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Endpoint:</span>
              <code className="text-sm bg-gray-100 px-1 rounded">/api/integrations/whop</code>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">MailerLite Integration</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-yellow-600 font-medium">Placeholder</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Endpoint:</span>
              <code className="text-sm bg-gray-100 px-1 rounded">/api/integrations/mailerlite</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}