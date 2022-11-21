import type { GetServerSideProps, NextPage } from "next";
import Items from "../../components/Items";
import Search from "../../components/Search";
import axios from "../../utils/axios";
import { useState } from "react";
import NavBarCustom from "../../components/NavBarCustom";

const StorePage: NextPage = ({ products }: any) => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <NavBarCustom />
      <div>
        {products.length ? (
          <>
            <Search search={search} setSearch={setSearch} />
            <Items products={products} search={search} />
          </>
        ) : (
          <h1 className="text-2xl text-center">404 Store Not Found</h1>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const store_slug = ctx.params?.store_slug;

  try {
    const res = await axios.get(`/product/slug?store_slug=${store_slug}`);
    if (res.data) {
      return {
        props: {
          products: res.data,
        },
      };
    }
  } catch {}

  return {
    props: {
      products: [],
    },
  };
};

export default StorePage;
