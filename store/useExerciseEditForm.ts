import { create } from "zustand";

type DisplayExerciseEditForm = {
  displayExerciseEditForm: boolean;
  toggleDisplayExerciseEditForm: (state?: boolean) => void;
};

export const useDisplayExerciseEditForm = create<DisplayExerciseEditForm>(
  (set) => ({
    displayExerciseEditForm: false,
    toggleDisplayExerciseEditForm: () =>
      set((state) => ({
        displayExerciseEditForm: !state.displayExerciseEditForm,
      })),
  })
);
