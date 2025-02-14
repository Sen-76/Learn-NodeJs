import { create } from 'zustand';

interface StoreState {
  count: number;
  nuts: number;
  honey: number;
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
}

const useCountStore = create<StoreState>((set) => ({
  count: 0,
  nuts: 0,
  honey: 0,
  increment: (qty: number) => set((state) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state) => ({ count: state.count - qty })),
}));

export default useCountStore;
