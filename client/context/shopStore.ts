import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface shopType {
  name?: string;
  description?: string;
  logo?: string;
  primaryColor?: string;
  slug?: string;
}

interface shopStateType {
  shop: shopType;
  setShop: (shop: shopType) => void;
}

const shopStore = (set: any) => ({
  shop: {},
  setShop: (shop: shopType) => set((state: any) => ({ ...state, shop })),
});

const useShopStore = create<shopStateType>()(
  devtools(persist(shopStore), { name: "shop" })
);

export default useShopStore;
