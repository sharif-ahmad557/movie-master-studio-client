import React from "react";
import HeroSection from "./HeroSection";
import StatisticsSection from "./StatisticsSection";
import TopRatedMovies from "./TopRatedMovies";
import RecentlyAdded from "./RecentlyAdded";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <TopRatedMovies />
      <RecentlyAdded />
    </div>
  );
};

export default Home;
