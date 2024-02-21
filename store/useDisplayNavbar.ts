import { create } from "zustand";

type DisplayNavbar = {
  displayNavbar: boolean;
  toggleDisplayNavbar: () => void;
};

export const useDisplayNavbar = create<DisplayNavbar>((set) => ({
  displayNavbar: false,
  toggleDisplayNavbar: () =>
    set((state) => ({ displayNavbar: !state.displayNavbar })),
}));
