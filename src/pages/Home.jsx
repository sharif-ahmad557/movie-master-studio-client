import React from "react";
import HeroSection from "./HeroSection";
import StatisticsSection from "./StatisticsSection";
import TopRatedMovies from "./TopRatedMovies";
import RecentlyAdded from "./RecentlyAdded";
import GenreSection from "./GenreSection";
import AboutPlatform from "./AboutPlatform";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <TopRatedMovies />
      <RecentlyAdded />
      <GenreSection />
      <AboutPlatform />
    </div>
  );
};

export default Home;
