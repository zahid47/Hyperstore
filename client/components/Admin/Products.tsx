import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import axios from "../../utils/axios";
import styles from "../../styles/Admin.Products.module.css";
import useUserStore from "../../context/userStore";

export default function ProductsTable() {
  const [productsState, setProductsState] = useState<any>([]);
  const [deleting, setDeleting] = useState(false);
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

  useEffect(() => {
    const fetchProducts = async () => {
      const accessToken = Cookies.get("accessToken");
      const productsResponse = await axios.get(`/product?storeId=${user.storeId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProductsState(productsResponse.data);
    };

    if (user.storeId) fetchProducts();
  }, [user.storeId]);

  const handleEdit = (
    _e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    router.push(`/admin/products/edit/${id}`);
  };

  const handleAdd = (
    _e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    router.push(`/admin/products/add`);
  };

  const handleDelete = (
    _e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    productId: string
  ) => {
    setDeleting(true);
    const accessToken = Cookies.get("accessToken");
    axios.delete(`product/${productId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    setProductsState(
      productsState.filter((product: any) => product._id !== productId)
    );
    setDeleting(false);
  };

  return (
    <>
      {productsState && productsState.length <= 0 ? (
        <p className={styles.noItems}>No products found</p>
      ) : (
        <table className={styles.table}>
          <caption className={styles.caption}>Products</caption>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Product ID</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Edit</th>
              <th className={styles.th}>Delete</th>
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {productsState &&
              productsState.reverse().map((product: any) => (
                <tr key={product._id}>
                  <td className={styles.td}>{product._id}</td>
                  <td className={styles.td}>{product.name}</td>
                  <td className={styles.td}>
                    <button
                      className={styles.editBtn}
                      onClick={(e) => handleEdit(e, product._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className={styles.td}>
                    <button
                      disabled={deleting}
                      className={styles.deleteBtn}
                      onClick={(e) => handleDelete(e, product._id)}
                    >
                      {deleting ? "deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div className={styles.btnWrapper}>
        <button className={styles.addNewBtn} onClick={handleAdd}>
          Add a new Product
        </button>
      </div>
    </>
  );
}
