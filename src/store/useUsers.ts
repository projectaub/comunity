import { create } from "zustand";

export interface User {
  email: string;
  nickname: string;
  greetings: string;

  setUser: (user: User) => void;
}

export const useUserinfo = create((set) => ({
  user: {
    email: "",
    nickname: "",
    greetings: "",
  },
  setUser: (user: User) => set({ user }),
}));
