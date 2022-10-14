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

const useUserStore = create<userStateType>()(
  devtools(
    persist((set) => ({
      user: {},
      setUser: (user) => set(() => ({ user })),
    })),
    { name: "user" }
  )
);

export default useUserStore;
