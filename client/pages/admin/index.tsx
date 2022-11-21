import Orders from "../../components/Admin/Orders";
import Products from "../../components/Admin/Products";
import NavBar from "../../components/NavBar";
import styles from "../../styles/Admin.module.css";

export default function Admin() {
  return (
    <div className={styles.container}>
      <NavBar />
      <Orders />
      <Products />
    </div>
  );
}
