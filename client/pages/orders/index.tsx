import axios from "../../utils/axios";
import { GetServerSideProps } from "next";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import styles from "../../styles/Orders.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useCartStore from "../../context/cartStore";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useUserStore from "../../context/userStore";
import NavBarCustom from "../../components/NavBarCustom";

export default function Orders() {
  const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
  const [ordersState, setOrdersState] = useState<any>([]);
  const { clearCart } = useCartStore((state) => state);
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
  dayjs.extend(relativeTime);

  useEffect(() => {
    if (router.query.success === "true") {
      clearCart();
    }
  }, [clearCart, router.query.success]);

  useEffect(() => {
    const fetchOrders = async () => {
      const accessToken = Cookies.get("accessToken");
      const res = await axios.get(`/user/orders?storeId=${user.storeId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setOrdersState(res.data);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on("orderStatusChanged", (order: any) => {
      setOrdersState(
        ordersState.map((ordr: any) => {
          if (ordr._id === order._id) {
            return order;
          }
          return ordr;
        })
      );
    });

    return () => {
      socket.off("orderStatusChanged");
      socket.disconnect();
    };
  }, [ordersState, socket]);

  return (
    <>
      <NavBarCustom />
      <div className={styles.container}>
        {ordersState && ordersState.length <= 0 ? (
          <p className={styles.noOrders}>You have no orders yet</p>
        ) : (
          <>
            <table className={styles.table}>
              <caption className={styles.caption}>Your Orders</caption>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>Order ID</th>
                  <th className={styles.th}>Products</th>
                  <th className={styles.th}>Total</th>
                  <th className={styles.th}>Time</th>
                  <th className={styles.th}>Payment</th>
                  <th className={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {ordersState &&
                  ordersState.reverse().map((order: any) => {
                    return (
                      <tr key={order._id}>
                        <td className={styles.td}>{order._id}</td>
                        <td className={styles.td}>
                          {order.products.map((product: any) => {
                            return (
                              <p
                                key={product._id}
                              >{`${product.product.name} - ${product.option}`}</p>
                            );
                          })}
                        </td>
                        <td className={styles.td}>{order.total}</td>
                        <td className={styles.td}>
                          {dayjs(order.createdAt).fromNow()}
                        </td>
                        <td className={styles.td}>
                          {order.payment.paymentStatus}
                        </td>
                        <td className={styles.td}>{order.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}
