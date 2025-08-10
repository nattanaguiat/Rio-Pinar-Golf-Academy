import React from "react";
import Header from "../components/Header";
import LearnMoreMenu from "../components/LearnMoreMenu";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div>
      <Header />
      <Welcome />
      <LearnMoreMenu />
    </div>
  );
};

export default Home;
