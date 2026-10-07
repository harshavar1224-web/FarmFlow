import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEMO_PRODUCTS } from "./demo-data";
import type { FarmFlowCartLine } from "./types";

export interface FarmFlowCart {
  items: FarmFlowCartLine[];
  itemCount: number;
  subtotalRupees: number;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<FarmFlowCart | null>(null);

export function DemoCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FarmFlowCartLine[]>([]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    const product = DEMO_PRODUCTS.find((item) => item.id === productId);
    if (!product || quantity < 1 || quantity > product.availableQuantity) {
      return;
    }
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      const nextQuantity = (existing?.quantity ?? 0) + quantity;
      if (nextQuantity > product.availableQuantity) {
        return current;
      }
      return existing
        ? current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: nextQuantity }
              : item,
          )
        : [...current, { productId, quantity }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const product = DEMO_PRODUCTS.find((item) => item.id === productId);
    if (!product) return;
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    if (quantity > product.availableQuantity) return;
    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<FarmFlowCart>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotalRupees = items.reduce((total, item) => {
      const product = DEMO_PRODUCTS.find(
        (candidate) => candidate.id === item.productId,
      );
      return total + (product?.priceRupees ?? 0) * item.quantity;
    }, 0);
    return {
      items,
      itemCount,
      subtotalRupees,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    };
  }, [items, addItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useFarmFlowCart(): FarmFlowCart {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("useFarmFlowCart must be used inside DemoCartProvider.");
  }
  return cart;
}
