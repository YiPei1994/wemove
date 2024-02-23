import { create } from "zustand";

type DisplayAddGoal = {
  displayAddGoal: boolean;
  toggleDisplayAddGoal: (state?: boolean) => void;
};

export const useDisplayAddGoal = create<DisplayAddGoal>((set) => ({
  displayAddGoal: false,
  toggleDisplayAddGoal: () =>
    set((state) => ({ displayAddGoal: !state.displayAddGoal })),
}));
