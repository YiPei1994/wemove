import { create } from "zustand";

type DisplayExerciseDataForm = {
  displayExerciseDataForm: boolean;
  toggleDisplayExerciseDataForm: (state?: boolean) => void;
};

export const useDisplayExerciseDataForm = create<DisplayExerciseDataForm>(
  (set) => ({
    displayExerciseDataForm: false,
    toggleDisplayExerciseDataForm: () =>
      set((state) => ({
        displayExerciseDataForm: !state.displayExerciseDataForm,
      })),
  })
);
