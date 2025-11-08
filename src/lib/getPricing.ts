import servicesCatalog from '../../data/catalog/services_pricing_catalog.json';

export interface ServiceTier {
  id: string;
  name: string;
  billing_model: string;
  price_min: number;
  price_max: number;
  deliverables: string[];
  contract_min_months: number;
  billing_source?: string;
  billing_sku?: string;
  hybrid_base?: number;
  hybrid_per_lead?: number;
  hybrid_per_appointment?: number;
  commission_pct_min?: number;
  commission_pct_max?: number;
  active: boolean;
}

export interface Service {
  id: string;
  label: string;
  market: string;
  tiers: ServiceTier[];
}

export interface PricingCatalog {
  $schema: string;
  version: string;
  currency: string;
  markets: string[];
  services: Service[];
  rules: Array<{
    id: string;
    applies_to_market: string;
    uplift_pct: number;
    applies_to_services: string[];
  }>;
}

/**
 * Get all services from the pricing catalog
 */
export function getAllServices(): Service[] {
  return (servicesCatalog as PricingCatalog).services;
}

/**
 * Get a specific service by ID
 */
export function getServiceById(id: string): Service | undefined {
  return getAllServices().find(service => service.id === id);
}

/**
 * Get all tiers for a specific service
 */
export function getTiersForService(serviceId: string): ServiceTier[] {
  const service = getServiceById(serviceId);
  return service ? service.tiers : [];
}

/**
 * Find tier by billing SKU across all services
 */
export function getTierByBillingSku(billingSku: string): { service: Service; tier: ServiceTier } | undefined {
  for (const service of getAllServices()) {
    const tier = service.tiers.find(t => t.billing_sku === billingSku);
    if (tier) {
      return { service, tier };
    }
  }
  return undefined;
}

/**
 * Apply market rules to pricing based on market and service
 */
export function applyMarketRules(
  serviceId: string, 
  market: string, 
  basePrice: number
): number {
  const catalog = getPricingCatalog();
  
  // Find applicable rules for this market and service
  const applicableRules = catalog.rules.filter(rule => 
    rule.applies_to_market === market && 
    rule.applies_to_services.includes(serviceId)
  );
  
  let adjustedPrice = basePrice;
  
  // Apply each rule's uplift
  for (const rule of applicableRules) {
    adjustedPrice = adjustedPrice * (1 + rule.uplift_pct);
  }
  
  return Math.round(adjustedPrice);
}

/**
 * Get the full pricing catalog
 */
export function getPricingCatalog(): PricingCatalog {
  return servicesCatalog as PricingCatalog;
}