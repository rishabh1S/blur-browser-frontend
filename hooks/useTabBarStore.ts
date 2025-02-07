import { create } from "zustand";

interface TabBarStore {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export const useTabBarStore = create<TabBarStore>((set) => ({
  isVisible: true,
  setIsVisible: (visible) => set({ isVisible: visible }),
}));
