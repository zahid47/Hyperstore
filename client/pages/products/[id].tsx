import { GetServerSideProps } from "next";
import axios from "../../utils/axios";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import useCartStore from "../../context/cartStore";
import styles from "../../styles/Singleitem.module.css";
import useShopStore from "../../context/shopStore";
import NavBarCustom from "../../components/NavBarCustom";
import Cookies from "js-cookie";
import useUserStore from "../../context/userStore";

export default function SingleProduct({ product }: any) {
  const [option, setOption] = useState<"small" | "medium" | "large">("small");
  const { addToCart } = useCartStore((state) => state);

  const handleAddToCart = (
    _e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const orderedProduct = {
      id: product._id,
      name: product.name,
      price: product.prices.filter((p: any) => p.option === option)[0].price,
      option: option,
      quantity: 1,
    };
    addToCart(orderedProduct);
    alert("Added to cart");
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
    <>
      <NavBarCustom />
      <div className={styles.container}>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={500}
          height={500}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.desc}>{product.description}</p>
          <div onChange={(e: any) => setOption(e.target.value)}>
            <input type="radio" name="option" value="small" defaultChecked />{" "}
            <span className={styles.options}>Small</span>
            <input type="radio" name="option" value="medium" />{" "}
            <span className={styles.options}>Medium</span>
            <input type="radio" name="option" value="large" />{" "}
            <span className={styles.options}>Large</span>
          </div>
          <p className={styles.price}>
            ${product.prices.filter((p: any) => p.option === option)[0].price}
          </p>
          <button
            className={styles.addToCartBtn}
            style={{ backgroundColor: store?.primaryColor }}
            onClick={(e) => {
              handleAddToCart(e);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const productId = params?.id;

  const res = await axios.get(`/product/${productId}`);
  const product = res.data;

  return {
    props: {
      product,
    },
  };
};
