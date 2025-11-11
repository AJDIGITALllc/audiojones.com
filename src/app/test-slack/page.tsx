'use client';

import { useState } from 'react';

export default function TestSlackPage() {
  const [message, setMessage] = useState('🎉 Slack Web API integration test from browser');
  const [severity, setSeverity] = useState<'info' | 'warning' | 'error'>('info');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testSlackNotification = async () => {
    setLoading(true);
    setResult('');
    
    try {
      const response = await fetch('/api/admin/alerts/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          severity,
          metadata: {
            component: 'slack-integration',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            source: 'browser-test'
          }
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ Success! ${JSON.stringify(data, null, 2)}`);
      } else {
        setResult(`❌ Error: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      setResult(`❌ Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Slack Integration Test</h1>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as 'info' | 'warning' | 'error')}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <button
            onClick={testSlackNotification}
            disabled={loading}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            {loading ? '🔄 Sending...' : '📤 Send Test Notification'}
          </button>

          {result && (
            <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="text-sm overflow-auto whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <h3 className="font-medium mb-2">🔧 Integration Status</h3>
          <ul className="text-sm space-y-1">
            <li>✅ Slack Web API integration deployed</li>
            <li>✅ GitHub push protection resolved</li>
            <li>✅ Security-compliant documentation</li>
            <li>✅ Local environment configured</li>
            <li>⚠️ Production tokens need to be added to deployment platform</li>
          </ul>
        </div>
      </div>
    </div>
  );
}