import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string;
  phoneNumber: string | null;
  // 필요한 다른 속성들을 여기에 추가할 수 있습니다.
}

export interface StsTokenManager {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
}

export interface CurrentUser {
  email: string;
  nickname: string;
  greetings: string;
  apiKey: string;
  appName: string;
  createdAt: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  uid: string;

  setUser: (user: CurrentUser) => void;
}

export const useUserinfo = create(
  persist(
    (set) => ({
      login: false,
      nowUsers: [],
      LoginUser: [],
      photoURL: "",
      selectUser: "",
      setLogin: (login: boolean) => set({ login }),
      setLoginUser: (LoginUser?: any) => set({ LoginUser }),
      setCurrentUser: (nowUsers?: any) => set({ nowUsers }),
      setPhotoURL: (photoURL?: string) => set({ photoURL }),
      setSelectUser: (selectUser?: string) => set({ selectUser }),
    }),
    {
      name: "userinfo-storage", // 로컬 스토리지 키 이름
    }
  )
);
