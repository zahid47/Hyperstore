import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface userType {
  name?: string;
  storeId?: string;
}

interface userStateType {
  user: userType;
  setUser: (user: userType) => void;
}

const userStore = (set: any) => ({
  user: {},
  setUser: (user: userType) => set((state: any) => ({ ...state, user })),
});

const useUserStore = create<userStateType>()(
  devtools(persist(userStore), { name: "user" })
);

export default useUserStore;
