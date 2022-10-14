import Link from "next/link";
import styles from "../styles/NavBar.module.css";
import useUserStore from "../context/userStore";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../utils/axios";
import { useRouter } from "next/router";
import useCartStore from "../context/cartStore";

export default function NavBar() {
  const { user, setUser } = useUserStore();
  const cartContent = useCartStore((state) => state.cartContent);
  const [cartQty, setCartQty] = useState(0);
  const router = useRouter();

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
        };

        setUser(user);
      } catch {
        Cookies.remove("accessToken");
      }
    };

    // skipcq
    if (accessToken) getMe(accessToken);
  }, [setUser]);

  const logOut = () => {
    Cookies.remove("accessToken");
    setUser({});
    router.push("/");
  };

  return (
    <nav className="mx-auto flex max-w-3xl items-center justify-between p-4">
      <Link
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100"
        href="/"
      >
        <a className="text-xl font-bold text-gray-700">Hyperstore</a>
      </Link>

      <ul className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <li className="hidden lg:block">
          <Link href={"/cart"} passHref>
            <a className="rounded-lg px-3 py-2" href="/">
              Cart ({cartQty})
            </a>
          </Link>
        </li>

        <li>
          {user.name ? (
            <>
              <Link href={"/orders"} passHref>
                <a className="rounded-lg px-3 py-2">My Orders</a>
              </Link>
              <button className="rounded-lg px-3 py-2" onClick={logOut}>
                Log Out
              </button>
            </>
          ) : (
            <Link href={"/login"} passHref>
              <a className="rounded-lg px-3 py-2">Login</a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
