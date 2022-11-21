import styles from "../styles/Items.module.css";
import Item from "./Item";
import React from "react";

const Items = ({ products }: any) => {
  return (
    <div className={styles.container}>
      {!products.length ? (
        <p>No products found</p>
      ) : (
        <div className={styles.wrapper}>
          {products.map((item: any) => (
            <Item key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Items;
