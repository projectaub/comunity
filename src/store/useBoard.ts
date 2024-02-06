import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBoards = create(
  persist(
    (set) => ({
      boardImgName: [],
      boardImg: [],
      boards: [],
      setBoards: (boards?: string[]) => set({ boards }),
      setBoardImg: (boardImg?: string[]) => set({ boardImg }),
      setBoardImgName: (boardImgName?: string[]) => set({ boardImgName }),
    }),
    {
      name: "board-storage", // 로컬 스토리지 키 이름
    }
  )
);
