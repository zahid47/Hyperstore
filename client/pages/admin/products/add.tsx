import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import axios from "../../../utils/axios";
import styles from "../../../styles/Admin.add.module.css";
import useUserStore from "../../../context/userStore";

export default function Add() {
  const [product, setProduct] = useState<any>({
    prices: [
      { price: 999999, option: "small" },
      { price: 999999, option: "medium" },
      { price: 999999, option: "large" },
    ],
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = {
        name: response.data.name,
        role: response.data.role,
        storeId: response.data.storeId || null,
      };
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleAddNewProduct = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setLoading(true);

    e.preventDefault();

    const storeId = user.storeId!;

    const data = new FormData();
    data.append("name", product.name);
    data.append("prices", JSON.stringify(product.prices));
    data.append("description", product.description);
    data.append("images", product.image);
    data.append("storeId", storeId);

    const accessToken = Cookies.get("accessToken");

    await axios.post("/product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setLoading(false);
    router.push("/admin");
  };

  return (
    <div className={styles.container}>
      <form encType="multipart/form-data">
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          className={styles.input}
          type="text"
          id="name"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          className={styles.input}
          id="description"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        <label htmlFor="images" className={styles.label}>
          Image
        </label>
        <input
          className={styles.fileInput}
          type="file"
          id="images"
          accept="jpeg, jpg, png"
          // multiple
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            const image: File = (target.files as FileList)[0];
            setProduct({ ...product, image });
          }}
        />

        <label htmlFor="prices" className={styles.label}>
          Prices
        </label>
        <div id="prices" className={styles.prices}>
          <input
            className={styles.price}
            type="number"
            id="small"
            placeholder="option 1"
            onChange={(e) => {
              setProduct({
                ...product,
                prices: [
                  { price: e.target.value, option: "small" },
                  { price: product.prices[1].price, option: "medium" },
                  { price: product.prices[2].price, option: "large" },
                ],
              });
            }}
          />
          <input
            className={styles.price}
            type="number"
            id="medium"
            placeholder="option 2"
            onChange={(e) => {
              setProduct({
                ...product,
                prices: [
                  { price: product.prices[0].price, option: "small" },
                  { price: e.target.value, option: "medium" },
                  { price: product.prices[2].price, option: "large" },
                ],
              });
            }}
          />
          <input
            className={styles.price}
            type="number"
            id="large"
            placeholder="option 3"
            onChange={(e) => {
              setProduct({
                ...product,
                prices: [
                  { price: product.prices[0].price, option: "small" },
                  { price: product.prices[1].price, option: "medium" },
                  { price: e.target.value, option: "large" },
                ],
              });
            }}
          />
        </div>

        <button
          disabled={loading}
          className={styles.addBtn}
          onClick={handleAddNewProduct}
        >
          {loading ? "Loading..." : "Create New Product"}
        </button>
      </form>
    </div>
  );
}
