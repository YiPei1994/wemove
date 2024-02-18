import { create } from "zustand";

type DisplayUserForm = {
  displayUserForm: boolean;
  toggleUserForm: () => void;
};

export const useDisplayUserForm = create<DisplayUserForm>((set) => ({
  displayUserForm: false,
  toggleUserForm: () =>
    set((state) => ({ displayUserForm: !state.displayUserForm })),
}));

type DisplayNavbar = {
  displayNavbar: boolean;
  toggleDisplayNavbar: () => void;
};

export const useDisplayNavbar = create<DisplayNavbar>((set) => ({
  displayNavbar: false,
  toggleDisplayNavbar: () =>
    set((state) => ({ displayNavbar: !state.displayNavbar })),
}));
