import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBoards = create(
  persist(
    (set) => ({
      boards: [],
      setBoards: (boards?: string[]) => set({ boards }),
    }),
    {
      name: "board-storage", // 로컬 스토리지 키 이름
    }
  )
);
