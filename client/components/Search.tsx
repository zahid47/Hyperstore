import styles from "../styles/Search.module.css";
import axios from "../utils/axios";
import { MouseEvent, useEffect, useState } from "react";
import useShopStore from "../context/shopStore";
import Cookies from "js-cookie";
import useUserStore from "../context/userStore";

export default function Search({ search, setSearch, setProducts }: any) {

  const handleSearch = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!search) {
      const res = await axios.get(`/product?name=${search}&storeId=${user.storeId}`);
      const data = res.data;
      setProducts(data);
    } else {
      const res = await axios.get(`/product?name=${search}&storeId=${user.storeId}`);
      const data = res.data;
      setProducts(data);
    }
  };

  const [store, setStore] = useState<any>(null);
  const { user } = useUserStore();

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

  return (
    <div className={styles.container}>
      <form>
        <input
          className={styles.input}
          placeholder="Search for a product..."
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          className={styles.searchBtn}
          style={{ backgroundColor: store?.primaryColor }}
          onClick={(e) => {
            handleSearch(e);
          }}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}
