import type { GetServerSideProps, NextPage } from "next";
import Items from "../../components/Items";
import Search from "../../components/Search";
import axios from "../../utils/axios";
import { useState } from "react";

const StorePage: NextPage = ({ data }: any) => {
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <Items products={data} search={search} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`/product`);
  const data = res.data;

  return {
    props: {
      data,
    },
  };
};

export default StorePage;
