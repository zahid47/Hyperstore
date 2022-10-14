import type { NextPage } from "next";
import Hero from "../components/Hero";
import useUserStore from "../context/userStore";

const Home: NextPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <Hero user={user} />
    </div>
  );
};

export default Home;
