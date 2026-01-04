import React from "react";
import HeroSection from "./HeroSection";
import StatisticsSection from "./StatisticsSection";
import TopRatedMovies from "./TopRatedMovies";
import RecentlyAdded from "./RecentlyAdded";
import GenreSection from "./GenreSection";
import AboutPlatform from "./AboutPlatform";
import Newsletter from "./Newsletter";
import FAQSection from "./FAQSection";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <TopRatedMovies />
      <RecentlyAdded />
      <GenreSection />
      <AboutPlatform />
      <Newsletter />
      <FAQSection />
      <Testimonials />
    </div>
  );
};

export default Home;
