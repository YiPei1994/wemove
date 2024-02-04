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
