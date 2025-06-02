import ScrollToTop from "@/App/Components/Customs/ScrollTop";
import HomeBanner from "./HomeBanner";
import HomeFlasSell from "./HomeFlasSell";
import HomeNewProduct from "./HomeNewProduct";
import HomeTopCategories from "./HomeTopCategories";
import HomeTopBanner from "./HomeTopBanner";
import DaynamicSection from "./DaynamicSection";
const Home = () => {
      return (
            <div>
                  <ScrollToTop />
                  <HomeTopBanner />
                  <HomeTopCategories />
                  <DaynamicSection />
                  <p className="my-10"></p>
                  <HomeBanner />
                  <HomeNewProduct />
                  <HomeFlasSell />
            </div>
      );
};

export default Home;