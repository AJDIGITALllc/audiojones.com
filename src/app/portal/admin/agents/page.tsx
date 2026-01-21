/**
 * Agent Operations Admin Page
 * Platform-aware agent plan creation, approval, and execution
 */

'use client';

import { useState, useEffect } from 'react';
import { useRequireAuth } from '@/lib/client/useRequireAuth';

interface Platform {
  id: string;
  name: string;
  enabled: boolean;
  configured: boolean;
  mode: 'real' | 'stub';
}

interface Action {
  platform: string;
  type: string;
  parameters: Record<string, any>;
}

interface Plan {
  id: string;
  description: string;
  actions: Action[];
  createdAt: string;
  metadata?: Record<string, any>;
}

interface PlanResult {
  planId: string;
  success: boolean;
  results: Array<{
    success: boolean;
    action: Action;
    data?: any;
    error?: string;
    executedAt: string;
  }>;
  executedAt: string;
  duration?: number;
}

type WorkflowState = 'input' | 'plan' | 'approved' | 'executed';

export default function AgentsPage() {
  const { loading } = useRequireAuth({ redirectTo: "/login", requireAdmin: true });
  
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'whop', name: 'Whop', enabled: true, configured: true, mode: 'stub' },
    { id: 'gumroad', name: 'Gumroad', enabled: false, configured: false, mode: 'stub' },
  ]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('whop');
  const [prompt, setPrompt] = useState<string>('');
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [planResult, setPlanResult] = useState<PlanResult | null>(null);
  const [workflowState, setWorkflowState] = useState<WorkflowState>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      checkPlatformStatus();
    }
  }, [loading]);

  const checkPlatformStatus = async () => {
    try {
      // TODO: Call API to check actual platform status
      // For now, using hardcoded status
      console.log('Checking platform status...');
    } catch (err) {
      console.error('Failed to check platform status:', err);
    }
  };

  const generatePlan = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/agents/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          context: {
            platform: selectedPlatform,
          },
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Plan generation failed');
      }
      
      setCurrentPlan(result.plan);
      setWorkflowState('plan');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const approvePlan = () => {
    setWorkflowState('approved');
  };

  const executePlan = async () => {
    if (!currentPlan) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/agents/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: currentPlan }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to execute plan');
      }
      
      const result = await response.json();
      setPlanResult(result);
      setWorkflowState('executed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetWorkflow = () => {
    setPrompt('');
    setCurrentPlan(null);
    setPlanResult(null);
    setWorkflowState('input');
    setError(null);
  };

  const groupActionsByPlatform = (actions: Action[]) => {
    const groups: Record<string, Action[]> = {};
    
    for (const action of actions) {
      if (!groups[action.platform]) {
        groups[action.platform] = [];
      }
      groups[action.platform].push(action);
    }
    
    return groups;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🤖 Agent Operations</h1>
          <p className="text-gray-400">
            Platform-aware agent planning and execution system
          </p>
        </div>

        {/* Platform Status */}
        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Platform Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`p-4 rounded-lg border-2 ${
                  platform.enabled
                    ? 'border-green-600 bg-green-900/20'
                    : 'border-gray-600 bg-gray-800/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{platform.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      platform.enabled ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    {platform.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>Configured: {platform.configured ? '✅' : '❌'}</p>
                  <p>Mode: <span className="uppercase font-mono">{platform.mode}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Progress */}
        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Workflow Progress</h2>
          <div className="flex items-center space-x-4">
            {['INPUT', 'PLAN', 'APPROVE', 'EXECUTE'].map((stage, index) => {
              const stageMap: Record<string, WorkflowState> = {
                INPUT: 'input',
                PLAN: 'plan',
                APPROVE: 'approved',
                EXECUTE: 'executed',
              };
              const currentStage = stageMap[stage];
              const isActive =
                (workflowState === 'input' && stage === 'INPUT') ||
                (workflowState === 'plan' && (stage === 'INPUT' || stage === 'PLAN')) ||
                (workflowState === 'approved' && stage !== 'EXECUTE') ||
                (workflowState === 'executed');
              
              return (
                <div key={stage} className="flex items-center">
                  <div
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      isActive ? 'bg-blue-600' : 'bg-gray-700'
                    }`}
                  >
                    {stage}
                  </div>
                  {index < 3 && (
                    <div className="w-8 h-0.5 bg-gray-700 mx-2"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border-2 border-red-600 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-red-400 mb-2">Error</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Input Stage */}
        {workflowState === 'input' && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create Plan</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Platform
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                  disabled={isLoading}
                >
                  {platforms.map((platform) => (
                    <option
                      key={platform.id}
                      value={platform.id}
                      disabled={!platform.enabled}
                    >
                      {platform.name} {!platform.enabled && '(Disabled)'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Describe what you want to do
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Example: List the last 10 payments"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 h-32"
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={generatePlan}
                disabled={isLoading || !prompt.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isLoading ? 'Generating Plan...' : 'Generate Plan →'}
              </button>
            </div>
          </div>
        )}

        {/* Plan Review Stage */}
        {workflowState === 'plan' && currentPlan && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Review Plan</h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Plan Details</h3>
                <p className="text-gray-400 text-sm mb-2">
                  <strong>ID:</strong> {currentPlan.id}
                </p>
                <p className="text-gray-400 text-sm mb-2">
                  <strong>Description:</strong> {currentPlan.description}
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Created:</strong> {new Date(currentPlan.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Actions grouped by platform */}
              {Object.entries(groupActionsByPlatform(currentPlan.actions)).map(
                ([platform, actions]) => (
                  <div key={platform} className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">
                      <span className="px-2 py-1 bg-blue-600 rounded text-sm mr-2">
                        {platform.toUpperCase()}
                      </span>
                      {actions.length} {actions.length === 1 ? 'Action' : 'Actions'}
                    </h3>
                    
                    <div className="space-y-2">
                      {actions.map((action, index) => (
                        <div
                          key={index}
                          className="bg-gray-900 p-3 rounded border border-gray-700"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-mono text-sm text-blue-400">
                              {action.type}
                            </span>
                            <span className="px-2 py-0.5 bg-purple-600 rounded text-xs">
                              {action.platform}
                            </span>
                          </div>
                          <pre className="text-xs text-gray-400 overflow-x-auto">
                            {JSON.stringify(action.parameters, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={resetWorkflow}
                className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                ← Cancel
              </button>
              <button
                onClick={approvePlan}
                className="flex-1 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Approve Plan ✓
              </button>
            </div>
          </div>
        )}

        {/* Approved Stage */}
        {workflowState === 'approved' && currentPlan && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Execute Plan</h2>
            
            <div className="bg-green-900/20 border-2 border-green-600 p-4 rounded-lg mb-6">
              <p className="text-green-400">
                ✓ Plan approved and ready for execution
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={resetWorkflow}
                className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                ← Cancel
              </button>
              <button
                onClick={executePlan}
                disabled={isLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isLoading ? 'Executing...' : 'Execute Plan →'}
              </button>
            </div>
          </div>
        )}

        {/* Execution Results Stage */}
        {workflowState === 'executed' && planResult && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Execution Results</h2>
            
            <div
              className={`p-4 rounded-lg mb-6 border-2 ${
                planResult.success
                  ? 'bg-green-900/20 border-green-600'
                  : 'bg-red-900/20 border-red-600'
              }`}
            >
              <p className={planResult.success ? 'text-green-400' : 'text-red-400'}>
                {planResult.success ? '✓' : '✗'} Plan {planResult.success ? 'executed successfully' : 'failed'}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Executed at: {new Date(planResult.executedAt).toLocaleString()}
              </p>
              {planResult.duration && (
                <p className="text-sm text-gray-400">
                  Duration: {planResult.duration}ms
                </p>
              )}
            </div>

            {/* Results grouped by platform */}
            {Object.entries(
              planResult.results.reduce((acc, result) => {
                const platform = result.action.platform;
                if (!acc[platform]) acc[platform] = [];
                acc[platform].push(result);
                return acc;
              }, {} as Record<string, typeof planResult.results>)
            ).map(([platform, results]) => (
              <div key={platform} className="bg-gray-800 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-3">
                  <span className="px-2 py-1 bg-blue-600 rounded text-sm mr-2">
                    {platform.toUpperCase()}
                  </span>
                  Results
                </h3>
                
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded border-2 ${
                        result.success
                          ? 'bg-green-900/20 border-green-600'
                          : 'bg-red-900/20 border-red-600'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-mono text-sm">
                          {result.action.type}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            result.success ? 'bg-green-600' : 'bg-red-600'
                          }`}
                        >
                          {result.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      
                      {result.error && (
                        <p className="text-sm text-red-400 mb-2">{result.error}</p>
                      )}
                      
                      {result.data && (
                        <pre className="text-xs text-gray-400 overflow-x-auto max-h-40">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={resetWorkflow}
              className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Create New Plan →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
