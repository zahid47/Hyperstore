import "../styles/globals.css";
import Layout from "../components/Layout";
import { AppProps } from "next/app";
// import useShopStore from "../context/shopStore";
// import useUserStore from "../context/userStore";
// import { useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  // const { user, setUser } = useUserStore();
  // const { shop, setShop } = useShopStore();

  // const accessToken = Cookies.get("accessToken");

  // useEffect(() => {
  //   const getInitialInfo = async (accessToken: string) => {
  //     try {
  //       const response = await axios.get("/auth/me", {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       });
  //       const user = {
  //         name: response.data.name,
  //         role: response.data.role,
  //         storeId: response.data.storeId || null,
  //       };
  //       setUser(user);

  //       const response2 = await axios.get(`/store/${user.storeId}`, {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       });
  //       setShop({
  //         name: response2.data.name,
  //         description: response2.data.description,
  //         logo: response2.data.logo,
  //         primaryColor: response2.data.primaryColor,
  //         slug: response2.data.slug,
  //       });

  //       console.log("user", user);
  //       console.log("shop", shop);
        
  //     } catch {
  //       Cookies.remove("accessToken");
  //     }
  //   };

  //   if (accessToken) getInitialInfo(accessToken);
  // }, [user, shop, accessToken, setUser, setShop]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
