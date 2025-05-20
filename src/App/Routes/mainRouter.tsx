import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Views/Home/Home";
import Login from "../Pages/Views/Auth/Login";
import Register from "../Pages/Views/Auth/Register";
import AdminOverview from "../Pages/Dashboards/Admin/AdminOverview";
import Allbooks from "../Pages/Views/AllProducts/Products";
import ProductDetails from "../Pages/Views/ProductDetails/ProductDetails";
import Error from "../Pages/Views/Error";
import VerifyOrder from "../Pages/Views/Orders/VerifyOrder";
import ViewAllOrder from "../Pages/Views/Orders/ViewAllOrder";
import Auth from "../Pages/Views/Auth/Auth";
import UserProfileSetting from "../Pages/Dashboards/User/UserProfileSetting";
import AllUsers from "../Pages/Dashboards/Admin/AllUsers";
import ManageOrder from "../Pages/Dashboards/Admin/ManageOrder";
import AboutUs from "../Pages/Views/AboutUs/AboutUs";
import ManageBook from "../Pages/Dashboards/Admin/ManageProduct";
import AdminLayout from "../Layouts/AdminLayout";
import ManageCategory from "../Pages/Dashboards/Admin/ManageCategory";
import AddNewProduct from "../Pages/Dashboards/Admin/AddNewProduct";
import RiderLayout from "../Layouts/RiderLayout";
import RiderHome from "../Pages/Dashboards/Rider/RiderHome/RiderHome";
import ManageRider from "../Pages/Dashboards/Admin/ManageRider";
import CreateNewRider from "../Pages/Dashboards/Admin/CreateNewRider";
import ReceivedOrders from "../Pages/Dashboards/Rider/PendingOrders/ReceivedOrders";
import Checkout from "../Pages/Views/Checkout/Checkout";
import PickOrder from "../Pages/Dashboards/Rider/PickOrder/PickOrder";
import { UpdateWebContent } from "../Components/Customs/UpdateWebContent";
import UpdateProduct from "../Pages/Dashboards/Admin/UpdateProduct";
import Rider_Settings from "../Pages/Dashboards/Rider/Setting/Rider_Settings";
import DeliverdOrders from "../Pages/Dashboards/Rider/DeliverdOrder/DeliverdOrder";
import OrderDetails from "../Pages/OrderDetails/OrderDetails";
import { OrderInvoice } from "../Components/Customs/OrderInvoice";
import RiderReport from "../Pages/Dashboards/Admin/manage_rider's_with_info/RiderReport";
import OfferedProduct from "../Pages/Views/OfferProduct/OfferProduct";
import SalesReport from "../Pages/Dashboards/Admin/SalesReport/SalesReport";

const MainRouter = createBrowserRouter([
      {
            path: "/",
            element: <MainLayout />,
            errorElement: <Error />,
            children: [
                  {
                        index: true,
                        element: <Home />
                  },
                  {
                        path: "products",
                        element: <Allbooks />
                  },
                  {
                        path: "product-details/:bookId",
                        element: <ProductDetails />
                  },
                  {
                        path: "verify-order",
                        element: <Auth access="user"><VerifyOrder /></Auth>
                  },
                  {
                        path: "check-out",
                        element: <Auth access="user"><Checkout /></Auth>
                  },
                  {
                        path: "orders",
                        element: <Auth access="user"><ViewAllOrder /></Auth>
                  },
                  {
                        path: "profile-settting",
                        element: <Auth access="user"><UserProfileSetting /></Auth>
                  },
                  {
                        path: "about-us",
                        element: <AboutUs />
                  },
                  {
                        path: "/offered-product",
                        element: <OfferedProduct />
                  }
            ]

      },
      {
            path: "/rider",
            element: <Auth access="rider"><RiderLayout /></Auth>,
            errorElement: <Error />,
            children: [
                  {
                        index: true,
                        element: <RiderHome />
                  },
                  {
                        path: "received-orders",
                        element: <ReceivedOrders />
                  },
                  {
                        path: "pick-orders",
                        element: <PickOrder />
                  },
                  {
                        path: "settings",
                        element: <Rider_Settings />
                  },
                  {
                        path: "delivered-orders",
                        element: <DeliverdOrders />
                  },
                  {
                        path: "order-details",
                        element: <OrderDetails />
                  }
            ]
      },
      {
            path: "/admin",
            element: <Auth access="admin"> <AdminLayout /></Auth>,
            errorElement: <Error />,
            children: [
                  {
                        index: true,
                        element: <AdminOverview />
                  },
                  {
                        path: "manage-users",
                        element: <AllUsers />
                  },
                  {
                        path: "manage-orders",
                        element: <ManageOrder />
                  },
                  {
                        path: "manage-product",
                        element: <ManageBook />
                  },
                  {
                        path: "sales-report",
                        element: <SalesReport />
                  },
                  {
                        path: "manage-product/add-product",
                        element: <AddNewProduct />
                  },
                  {
                        path: "manage-product/update-product",
                        element: <UpdateProduct />
                  },
                  {
                        path: "manage-category",
                        element: <ManageCategory />
                  },
                  {
                        path: "manage-riders",
                        element: <ManageRider />
                  },
                  {
                        path: "manage-riders/create-new-rider",
                        element: <CreateNewRider />
                  },
                  {
                        path: "update-web-content",
                        element: <UpdateWebContent />
                  },
                  {
                        path: "order-details",
                        element: <OrderInvoice />
                  },
                  {
                        path: "rider-report",
                        element: <RiderReport />
                  }
            ]

      },
      {
            path: "/login",
            element: <Login />
      },
      {
            path: "/register",
            element: <Register />
      }
])

export default MainRouter;