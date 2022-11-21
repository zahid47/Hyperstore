import axios from "../utils/axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import useUserStore from "../context/userStore";
import styles from "../styles/Item.module.css";

const Item = ({ item }: any) => {
  const [store, setStore] = useState<any>(null);
  const { user } = useUserStore();

  useEffect(() => {
    const getStore = async () => {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(`/store/${user.storeId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("🚀 ~ response", response)
      setStore(response.data);
    };

    if (user.storeId) getStore();
  }, [user.storeId]);

  // useEffect(() => {
  //   console.log("🚀 ~ store", store)
  // }, [store]);

  return (
    <Link href={`/products/${item._id}`}>
      <div className={styles.container}>
        <Image
          src={item.images[0]}
          alt={item.name}
          width="200"
          height="200"
          priority
        />
        <h1 className={styles.title} style={{ color: store?.primaryColor }}>
          {item.name}
        </h1>
        <p className={styles.desc}>{item.description}</p>
        <span className={styles.price}>${item.prices[0].price}</span>
      </div>
    </Link>
  );
};

export default Item;
