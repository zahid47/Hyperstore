import styles from "../styles/Search.module.css";
import axios from "../utils/axios";
import { MouseEvent } from "react";
import useShopStore from "../context/shopStore";

export default function Search({ search, setSearch, setProducts }: any) {
  const handleSearch = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    if (!search) {
      const res = await axios.get(`/product?name=${search}`);
      const data = res.data;
      setProducts(data);
    } else {
      const res = await axios.get(`/product?name=${search}`);
      const data = res.data;
      setProducts(data);
    }
  };

  const { shop } = useShopStore();

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
          style={{ backgroundColor: shop?.primaryColor }}
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
