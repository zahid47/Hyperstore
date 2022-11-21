import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Head>
        <title>Hyperstore - eCommerce platform for small businesses</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
      <Footer />
    </>
  );
}
