import { useQuery } from "@tanstack/react-query";
import { DEMO_HARVEST_INTELLIGENCE, DEMO_PRODUCTS } from "./demo-data";
import type {
  FarmFlowStatus,
  FarmProduct,
  HarvestIntelligence,
  MarketplaceFilters,
} from "./types";

const DEMO_STATUS: FarmFlowStatus = {
  mode: "demo",
  isConnected: false,
  canCreateReservations: false,
  notice:
    "Demo environment — records are sample data. Connect Supabase before placing a real reservation or saving a harvest plan.",
};

export function useFarmFlowMode(): FarmFlowStatus {
  return DEMO_STATUS;
}

export function useMarketplaceProducts(filters: MarketplaceFilters = {}) {
  return useQuery<FarmProduct[]>({
    queryKey: ["farmflow", "marketplace", filters],
    queryFn: async () => {
      const search = filters.search?.trim().toLocaleLowerCase();
      return DEMO_PRODUCTS.filter((product) => {
        const matchesSearch =
          !search ||
          `${product.name} ${product.farmName} ${product.farmerName} ${product.location}`
            .toLocaleLowerCase()
            .includes(search);
        const matchesCategory =
          !filters.category ||
          filters.category === "All" ||
          product.category === filters.category;
        return matchesSearch && matchesCategory;
      });
    },
    staleTime: Infinity,
  });
}

export function useFarmProduct(productId: string) {
  return useQuery<FarmProduct | null>({
    queryKey: ["farmflow", "product", productId],
    queryFn: async () =>
      DEMO_PRODUCTS.find((product) => product.id === productId) ?? null,
    staleTime: Infinity,
  });
}

export function useHarvestIntelligence() {
  return useQuery<HarvestIntelligence>({
    queryKey: ["farmflow", "harvest-intelligence", "demo"],
    queryFn: async () => DEMO_HARVEST_INTELLIGENCE,
    staleTime: Infinity,
  });
}
