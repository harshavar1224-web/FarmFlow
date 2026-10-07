export type FarmFlowMode = "demo" | "supabase";

export interface FarmFlowStatus {
  mode: FarmFlowMode;
  isConnected: boolean;
  canCreateReservations: boolean;
  notice: string;
}

export interface FarmProduct {
  id: string;
  farmId: string;
  name: string;
  category: string;
  description: string;
  priceRupees: number;
  unit: string;
  farmName: string;
  farmerName: string;
  location: string;
  distanceKm: number;
  harvestLabel: string;
  availableQuantity: number;
  reservedQuantity: number;
  rating: number;
  freshnessLabel: string;
  demandLabel: string;
}

export interface MarketplaceFilters {
  search?: string;
  category?: string;
}

export interface HarvestSignal {
  label: string;
  contribution: string;
}

export interface HarvestIntelligence {
  productName: string;
  harvestDate: string;
  predictedDemandKg: number;
  preorderDemandKg: number;
  recommendedHarvestKg: number;
  confidencePercent: number;
  potentialSurplusKg: number;
  currentStockKg: number;
  demandTrendPercent: number;
  explanation: string;
  signals: HarvestSignal[];
}

export interface FarmFlowCartLine {
  productId: string;
  quantity: number;
}
