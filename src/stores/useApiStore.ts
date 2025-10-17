import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ApiStore {
  baseURL: string;
  setBaseURL: (url: string) => void;
}

export const useApiStore = create<ApiStore>()(
  persist(
    (set) => ({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
      setBaseURL: (url) => set({ baseURL: url }),
    }),
    {
      name: "api-storage",
      storage: typeof window !== "undefined" ? createJSONStorage(() => localStorage) : undefined, // SSR에서는 storage를 undefined로 처리
    }
  )
);
