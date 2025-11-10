'use client';

import { useState, useEffect } from 'react';
import { formatOpenDate, getCapacityStatusColor } from '@/lib/capacity';

interface CapacityData {
  availability: 'open' | 'limited' | 'full';
  is_full: boolean;
  next_open_date?: string;
  capacity_metrics: {
    total_mrr: number;
    active_retainers: number;
    slots_filled: number;
    slots_total: number;
  };
}

interface CapacityBannerProps {
  className?: string;
}

export default function CapacityBanner({ className = '' }: CapacityBannerProps) {
  const [capacity, setCapacity] = useState<CapacityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWaitlist, setShowWaitlist] = useState(false);

  useEffect(() => {
    fetchCapacity();
  }, []);

  const fetchCapacity = async () => {
    try {
      const response = await fetch('/api/capacity');
      const data = await response.json();
      
      if (data.ok) {
        setCapacity(data);
      }
    } catch (error) {
      console.error('Failed to fetch capacity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWaitlistClick = () => {
    setShowWaitlist(true);
  };

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-200 rounded-lg p-4 ${className}`}>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    );
  }

  if (!capacity) {
    return null;
  }

  const statusColor = getCapacityStatusColor(capacity.availability);
  
  const colorClasses = {
    green: 'bg-green-50 border-green-200 text-green-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800', 
    red: 'bg-red-50 border-red-200 text-red-800',
    gray: 'bg-gray-50 border-gray-200 text-gray-800'
  };

  const buttonClasses = {
    green: 'bg-green-600 hover:bg-green-700 text-white',
    yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    red: 'bg-red-600 hover:bg-red-700 text-white', 
    gray: 'bg-gray-600 hover:bg-gray-700 text-white'
  };

  const getBannerContent = () => {
    switch (capacity.availability) {
      case 'open':
        return {
          title: '✨ Now Accepting New Retainer Clients',
          description: `We have ${capacity.capacity_metrics.slots_total - capacity.capacity_metrics.slots_filled} open slots for new retainer partnerships. Start your project with Audio Jones today.`,
          buttonText: 'Get Started',
          buttonHref: '/book'
        };
        
      case 'limited':
        return {
          title: '⏰ Limited Availability',
          description: capacity.next_open_date 
            ? `Next opening expected ${formatOpenDate(capacity.next_open_date)}. We're currently at ${capacity.capacity_metrics.slots_filled}/${capacity.capacity_metrics.slots_total} capacity.`
            : `We're currently at ${capacity.capacity_metrics.slots_filled}/${capacity.capacity_metrics.slots_total} capacity with limited availability for new projects.`,
          buttonText: 'Join Waitlist',
          buttonAction: handleWaitlistClick
        };
        
      case 'full':
        return {
          title: '🚫 Currently at Full Project Capacity',
          description: `All ${capacity.capacity_metrics.slots_total} client slots are filled. Join our waitlist to be notified when space becomes available.`,
          buttonText: 'Join Waitlist',
          buttonAction: handleWaitlistClick
        };
        
      default:
        return {
          title: 'Capacity Status Unknown',
          description: 'Please check back later for availability updates.',
          buttonText: 'Contact Us',
          buttonHref: '/book'
        };
    }
  };

  const content = getBannerContent();

  return (
    <>
      <div className={`border rounded-lg p-4 ${colorClasses[statusColor as keyof typeof colorClasses]} ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{content.title}</h3>
            <p className="text-sm opacity-90">{content.description}</p>
          </div>
          
          <div className="ml-4">
            {content.buttonAction ? (
              <button
                onClick={content.buttonAction}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${buttonClasses[statusColor as keyof typeof buttonClasses]}`}
              >
                {content.buttonText}
              </button>
            ) : (
              <a
                href={content.buttonHref}
                className={`inline-block px-4 py-2 rounded-lg font-medium transition-colors ${buttonClasses[statusColor as keyof typeof buttonClasses]}`}
              >
                {content.buttonText}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Join Our Waitlist</h3>
            <p className="text-gray-600 mb-4">
              We'll notify you as soon as a slot opens up for new retainer clients.
            </p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Join Waitlist
                </button>
                <button
                  type="button"
                  onClick={() => setShowWaitlist(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}