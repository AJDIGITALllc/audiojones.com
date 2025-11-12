/**
 * Feature Flags React Hook
 * Client-side feature flag evaluation with caching and real-time updates
 */

'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface FeatureFlagValue {
  enabled: boolean;
  variant?: string;
  value: any;
  loading: boolean;
  error?: string;
}

interface FeatureFlagContextType {
  evaluateFlag: (flagKey: string, context?: Record<string, any>) => Promise<FeatureFlagValue>;
  getFlag: (flagKey: string) => FeatureFlagValue;
  refreshFlag: (flagKey: string) => Promise<void>;
  refreshAllFlags: () => Promise<void>;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | null>(null);

interface FeatureFlagProviderProps {
  children: ReactNode;
  organizationId?: string;
  refreshInterval?: number; // Auto-refresh interval in seconds
}

export function FeatureFlagProvider({ 
  children, 
  organizationId,
  refreshInterval = 300 // 5 minutes default
}: FeatureFlagProviderProps) {
  const { user } = useAuth();
  const [flags, setFlags] = useState<Map<string, FeatureFlagValue>>(new Map());
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  // Build evaluation context
  const buildContext = useCallback((additionalContext?: Record<string, any>) => {
    return {
      user_id: user?.uid,
      organization_id: organizationId,
      session_id: typeof window !== 'undefined' ? 
        sessionStorage.getItem('feature_flag_session_id') || generateSessionId() : undefined,
      user_attributes: {
        email: user?.email,
        email_verified: user?.emailVerified,
        ...additionalContext
      },
      request_context: {
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
        timestamp: new Date().toISOString()
      }
    };
  }, [user, organizationId]);

  // Generate session ID for consistent feature flag evaluation
  const generateSessionId = useCallback(() => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('feature_flag_session_id', sessionId);
    }
    return sessionId;
  }, []);

  // Evaluate feature flag via API
  const evaluateFlag = useCallback(async (
    flagKey: string, 
    additionalContext?: Record<string, any>
  ): Promise<FeatureFlagValue> => {
    try {
      // Set loading state
      setFlags(prev => new Map(prev).set(flagKey, {
        enabled: prev.get(flagKey)?.enabled || false,
        value: prev.get(flagKey)?.value || false,
        loading: true
      }));

      const context = buildContext(additionalContext);
      const token = await user?.getIdToken();

      const response = await fetch('/api/feature-flags/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          flag_key: flagKey,
          context
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to evaluate feature flag');
      }

      const flagValue: FeatureFlagValue = {
        enabled: data.data.enabled,
        variant: data.data.variant,
        value: data.data.value,
        loading: false
      };

      // Update cache
      setFlags(prev => new Map(prev).set(flagKey, flagValue));

      return flagValue;

    } catch (error) {
      console.error(`Feature flag evaluation failed for ${flagKey}:`, error);
      
      const errorValue: FeatureFlagValue = {
        enabled: false,
        value: false,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      setFlags(prev => new Map(prev).set(flagKey, errorValue));
      return errorValue;
    }
  }, [buildContext, user]);

  // Get cached flag value
  const getFlag = useCallback((flagKey: string): FeatureFlagValue => {
    return flags.get(flagKey) || {
      enabled: false,
      value: false,
      loading: false
    };
  }, [flags]);

  // Refresh specific flag
  const refreshFlag = useCallback(async (flagKey: string): Promise<void> => {
    await evaluateFlag(flagKey);
  }, [evaluateFlag]);

  // Refresh all cached flags
  const refreshAllFlags = useCallback(async (): Promise<void> => {
    const flagKeys = Array.from(flags.keys());
    await Promise.all(flagKeys.map(key => evaluateFlag(key)));
  }, [flags, evaluateFlag]);

  // Auto-refresh setup
  useEffect(() => {
    if (refreshInterval > 0) {
      const timer = setInterval(() => {
        if (flags.size > 0) {
          refreshAllFlags();
        }
      }, refreshInterval * 1000);

      setRefreshTimer(timer);

      return () => {
        clearInterval(timer);
        setRefreshTimer(null);
      };
    }
  }, [refreshInterval, refreshAllFlags, flags.size]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshTimer) {
        clearInterval(refreshTimer);
      }
    };
  }, [refreshTimer]);

  const contextValue: FeatureFlagContextType = {
    evaluateFlag,
    getFlag,
    refreshFlag,
    refreshAllFlags
  };

  return (
    <FeatureFlagContext.Provider value={contextValue}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

/**
 * Hook to use feature flags
 */
export function useFeatureFlag(flagKey: string, context?: Record<string, any>) {
  const featureFlagContext = useContext(FeatureFlagContext);
  const [flag, setFlag] = useState<FeatureFlagValue>({
    enabled: false,
    value: false,
    loading: true
  });

  if (!featureFlagContext) {
    throw new Error('useFeatureFlag must be used within a FeatureFlagProvider');
  }

  const { evaluateFlag, getFlag } = featureFlagContext;

  // Initial evaluation
  useEffect(() => {
    evaluateFlag(flagKey, context).then(setFlag);
  }, [flagKey, evaluateFlag, context]);

  // Get current cached value
  useEffect(() => {
    const cachedFlag = getFlag(flagKey);
    setFlag(cachedFlag);
  }, [flagKey, getFlag]);

  return flag;
}

/**
 * Hook for multiple feature flags
 */
export function useFeatureFlags(flagKeys: string[], context?: Record<string, any>) {
  const featureFlagContext = useContext(FeatureFlagContext);
  const [flags, setFlags] = useState<Record<string, FeatureFlagValue>>({});

  if (!featureFlagContext) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }

  const { evaluateFlag, getFlag } = featureFlagContext;

  // Initial evaluation of all flags
  useEffect(() => {
    const evaluateAllFlags = async () => {
      const results: Record<string, FeatureFlagValue> = {};
      
      await Promise.all(
        flagKeys.map(async (key) => {
          results[key] = await evaluateFlag(key, context);
        })
      );

      setFlags(results);
    };

    evaluateAllFlags();
  }, [flagKeys, evaluateFlag, context]);

  // Update with cached values
  useEffect(() => {
    const cachedFlags: Record<string, FeatureFlagValue> = {};
    flagKeys.forEach(key => {
      cachedFlags[key] = getFlag(key);
    });
    setFlags(cachedFlags);
  }, [flagKeys, getFlag]);

  return flags;
}

/**
 * HOC for feature flag gating
 */
export function withFeatureFlag<P extends object>(
  flagKey: string,
  fallbackComponent?: React.ComponentType<P>
) {
  return function FeatureGatedComponent(WrappedComponent: React.ComponentType<P>) {
    return function FeatureGate(props: P) {
      const flag = useFeatureFlag(flagKey);

      if (flag.loading) {
        return <div className="animate-pulse bg-gray-300 h-4 w-16 rounded"></div>;
      }

      if (flag.error) {
        console.warn(`Feature flag ${flagKey} evaluation error:`, flag.error);
      }

      if (flag.enabled) {
        return <WrappedComponent {...props} />;
      }

      if (fallbackComponent) {
        const FallbackComponent = fallbackComponent;
        return <FallbackComponent {...props} />;
      }

      return null;
    };
  };
}

/**
 * Component for conditional rendering based on feature flags
 */
interface FeatureGateProps {
  flagKey: string;
  context?: Record<string, any>;
  fallback?: ReactNode;
  children: ReactNode;
}

export function FeatureGate({ flagKey, context, fallback, children }: FeatureGateProps) {
  const flag = useFeatureFlag(flagKey, context);

  if (flag.loading) {
    return <div className="animate-pulse bg-gray-300 h-4 w-16 rounded"></div>;
  }

  if (flag.error) {
    console.warn(`Feature flag ${flagKey} evaluation error:`, flag.error);
  }

  if (flag.enabled) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Hook for feature flag variants (A/B testing)
 */
export function useFeatureFlagVariant(flagKey: string, context?: Record<string, any>) {
  const flag = useFeatureFlag(flagKey, context);

  return {
    enabled: flag.enabled,
    variant: flag.variant,
    value: flag.value,
    loading: flag.loading,
    error: flag.error,
    isVariant: (variantKey: string) => flag.variant === variantKey
  };
}

/**
 * Utility functions for feature flag evaluation
 */
export const FeatureFlagUtils = {
  /**
   * Check if feature flag is enabled (synchronous, uses cache)
   */
  isEnabled: (flagKey: string, context?: FeatureFlagContextType) => {
    if (!context) return false;
    const flag = context.getFlag(flagKey);
    return flag.enabled && !flag.error;
  },

  /**
   * Get feature flag value (synchronous, uses cache)
   */
  getValue: (flagKey: string, defaultValue: any = false, context?: FeatureFlagContextType) => {
    if (!context) return defaultValue;
    const flag = context.getFlag(flagKey);
    return flag.error ? defaultValue : flag.value;
  },

  /**
   * Check if feature flag has specific variant
   */
  hasVariant: (flagKey: string, variantKey: string, context?: FeatureFlagContextType) => {
    if (!context) return false;
    const flag = context.getFlag(flagKey);
    return flag.enabled && flag.variant === variantKey;
  }
};

/**
 * Development utilities
 */
export const FeatureFlagDev = {
  /**
   * Log all current feature flag states (development only)
   */
  logFlags: (flags: Record<string, FeatureFlagValue>) => {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚩 Feature Flags Status');
      Object.entries(flags).forEach(([key, flag]) => {
        console.log(`${key}:`, {
          enabled: flag.enabled,
          variant: flag.variant,
          value: flag.value,
          loading: flag.loading,
          error: flag.error
        });
      });
      console.groupEnd();
    }
  },

  /**
   * Override feature flag for testing (development only)
   */
  overrideFlag: (flagKey: string, enabled: boolean, value?: any) => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const overrides = JSON.parse(localStorage.getItem('feature_flag_overrides') || '{}');
      overrides[flagKey] = { enabled, value: value !== undefined ? value : enabled };
      localStorage.setItem('feature_flag_overrides', JSON.stringify(overrides));
      
      console.log(`🚩 Feature flag override set: ${flagKey} = ${enabled}`);
    }
  },

  /**
   * Clear all feature flag overrides
   */
  clearOverrides: () => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      localStorage.removeItem('feature_flag_overrides');
      console.log('🚩 All feature flag overrides cleared');
    }
  }
};