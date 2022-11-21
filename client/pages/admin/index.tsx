import Orders from "../../components/Admin/Orders";
import Products from "../../components/Admin/Products";
import styles from "../../styles/Admin.module.css";

export default function Admin() {
  return (
    <div className={styles.container}>
      <Orders />
      <Products />
    </div>
  );
}
