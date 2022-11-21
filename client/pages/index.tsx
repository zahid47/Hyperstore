import type { NextPage } from "next";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import useUserStore from "../context/userStore";

const Home: NextPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <NavBar />
      <Hero user={user} />
    </div>
  );
};

export default Home;
