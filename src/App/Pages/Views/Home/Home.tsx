import ScrollToTop from "@/App/Components/Customs/ScrollTop";
import HomeBanner from "./HomeBanner";
import HomeFlasSell from "./HomeFlasSell";
import HomeNewProduct from "./HomeNewProduct";
import HomeTopCategories from "./HomeTopCategories";
const Home = () => {
      return (
            <div>
                  <ScrollToTop />
                  <HomeBanner />
                  <HomeTopCategories />
                  <HomeNewProduct />
                  <HomeFlasSell />
            </div>
      );
};

export default Home;