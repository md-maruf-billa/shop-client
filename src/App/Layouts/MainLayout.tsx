import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useGetWebInfoQuery } from "../Redux/features/admin/admin.api";
import { Helmet } from "react-helmet";

const MainLayout = () => {
      const { data } = useGetWebInfoQuery(undefined)
      const web = data?.data?.webInfo
      return (
            <div className="container mx-auto font-inter px-4">
                  <Helmet>
                        <title>{web?.webInfo?.name}</title>
                  </Helmet>
                  <Navbar web={web} />
                  <Outlet />
                  <Footer web={web} />
            </div>
      );
};

export default MainLayout;