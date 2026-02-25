import { create } from "zustand";

type UiState = {
  compactMode: boolean;
  setCompactMode: (next: boolean) => void;
};

export const useUiStore = create<UiState>((set) => ({
  compactMode: false,
  setCompactMode: (next) => set({ compactMode: next })
}));
