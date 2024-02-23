export type UserDayType = {
  id?: number;
  date: string;
  goalStatus: string;
  userId: string;
};

export type UserGoalType = {
  id?: number;
  date: string;
  goal: string;
  description: string;
  userId: string;
  status: boolean;
  daily: boolean;
};
