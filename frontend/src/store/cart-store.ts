import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types/cart';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      updateQuantity: (id, quantity) => set((state) => ({
        items: quantity > 0
          ? state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            )
          : state.items.filter((item) => item.id !== id),
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);