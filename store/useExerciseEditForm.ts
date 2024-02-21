import { create } from "zustand";

type DisplayExerciseEditForm = {
  displayExerciseEditForm: boolean;
  toggleDisplayExerciseEditForm: () => void;
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
