import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/data/menu';

export interface CartItemModifier {
  group: string;
  option: string;
  priceDelta: number;
}

export interface CartItem {
  id: string; // Unique ID for this specific line item
  product: Product;
  variantLabel: string;
  basePrice: number; // Price of the chosen variant in cents
  quantity: number;
  modifiers: CartItemModifier[];
  specialInstructions: string;
}

interface CartState {
  items: CartItem[];
  isSidebarOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // UI Actions
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  
  // Computed
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isSidebarOpen: false,

      addItem: (item) => {
        set((state) => {
          // Generate a unique ID for this cart line item
          const newItem = { ...item, id: crypto.randomUUID() };
          return {
            items: [...state.items, newItem],
            isSidebarOpen: true, // Auto-open sidebar when adding an item
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openSidebar: () => set({ isSidebarOpen: true }),
      closeSidebar: () => set({ isSidebarOpen: false }),
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const modifiersTotal = item.modifiers.reduce((sum, mod) => sum + mod.priceDelta, 0);
          const itemTotal = (item.basePrice + modifiersTotal) * item.quantity;
          return total + itemTotal;
        }, 0);
      },

      getTax: () => {
        // 13% HST in Ontario
        const subtotal = get().getSubtotal();
        return Math.round(subtotal * 0.13);
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax();
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'greek-mansion-cart',
      storage: createJSONStorage(() => localStorage),
      // Don't persist UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
