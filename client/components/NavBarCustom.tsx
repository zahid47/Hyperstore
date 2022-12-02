import Link from "next/link";
import useUserStore from "../context/userStore";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import useCartStore from "../context/cartStore";
import useShopStore from "../context/shopStore";

export default function NavBarCustom() {
  const { user, setUser } = useUserStore();
  const { setShop } = useShopStore();
  const cartContent = useCartStore((state) => state.cartContent);
  const [cartQty, setCartQty] = useState(0);
  const router = useRouter();
  const [store, setStore] = useState<any>(null);

  useEffect(() => {
    setCartQty(
      cartContent.reduce((totalQty: number, product: any) => {
        return totalQty + product.quantity;
      }, 0)
    );
  }, [cartContent]);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    const getMe = async (accessToken: string) => {
      try {
        const response = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const user = {
          name: response.data.name,
          role: response.data.role,
          storeId: response.data.storeId || null,
        };
        setUser(user);

        const response2 = await axios.get(`/store/${user.storeId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setShop({
          name: response2.data.name,
          description: response2.data.description,
          logo: response2.data.logo,
          primaryColor: response2.data.primaryColor,
        });
      } catch {}
    };

    // skipcq
    if (accessToken) getMe(accessToken);
  }, [setUser, setShop]);

  useEffect(() => {
    const getStore = async () => {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(`/store/${user.storeId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setStore(response.data);
    };

    if (user.storeId) getStore();
  }, [user.storeId]);

  const logOut = () => {
    Cookies.remove("accessToken");
    setUser({});
    router.push("/");
  };

  return (
    <>
      {!!store && (
        <>
          <nav className="mx-auto flex max-w-3xl items-center justify-between p-4">
            <Link
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100"
              href={`/${store?.slug}`}
            >
              <a className="text-xl font-bold text-gray-700">
                <img src={store?.logo} className="h-10 w-10" alt="logo" />
              </a>
            </Link>

            <ul className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <li>
                {user.name ? (
                  <>
                    <Link href={"/cart"} passHref>
                      <a className="rounded-lg px-3 py-2">Cart ({cartQty})</a>
                    </Link>

                    <Link href={"/orders"} passHref>
                      <a className="rounded-lg px-3 py-2">My Orders</a>
                    </Link>

                    <button className="rounded-lg px-3 py-2" onClick={logOut}>
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={"/login"} passHref>
                      <a className="rounded-lg px-3 py-2">Login</a>
                    </Link>
                    <Link href={"/open-shop"} passHref>
                      <a className="rounded-lg px-3 py-2">Open a shop</a>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
