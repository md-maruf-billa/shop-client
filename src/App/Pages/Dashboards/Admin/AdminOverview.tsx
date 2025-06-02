// import AdminSelce from "@/App/Components/Customs/AdminSelce";
import AdminSelce from "@/App/Components/Customs/AdminSelce";
import { useSaleReportQuery } from "@/App/Redux/features/admin/admin.api";
import { selectUser } from "@/App/Redux/features/user/user.slice";
import { useAppSelector } from "@/App/Redux/hook";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import SaledProduct from "./SaledProduct";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loading from "@/App/Components/Customs/Loading";
import { AddExtraSectionModal } from "./AddExtraSectionModal";

const AdminOverview = () => {
      const { data, isLoading } = useSaleReportQuery({
            startDate: null,
            endDate: null,
      });
      const user = useAppSelector(selectUser)
      const [greeting, setGreeting] = useState("");
      useEffect(() => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                  setGreeting("Good Morning ☀️");
            } else if (hour >= 12 && hour < 18) {
                  setGreeting("Good Afternoon 🌤️");
            } else if (hour >= 18 && hour < 21) {
                  setGreeting("Good Evening 🌇");
            } else {
                  setGreeting("Good Night 🌙");
            }
      }, [])
      if (isLoading) return <Loading />;
      return (
            <div>
                  {/* nav */}
                  <div className="flex justify-between items-center mb-10 px-8">
                        <div>
                              <h2 className="text-xl md:text-3xl font-semibold"><span className="text-brandTextPrimary">{greeting}</span> <span className="text-brandTextTertiary italic">{user?.name}</span></h2>
                        </div>
                        <div className="flex items-center gap-3">
                             <AddExtraSectionModal/>
                              <Link to="add-flat-banner">
                                    <Button className="bg-brandTextPrimary">Add Top Banner</Button>
                              </Link>
                              <Link to="update-web-content">
                                    <Button className="bg-brandTextPrimary">Edit Content</Button>
                              </Link>
                        </div>
                  </div>

                  <AdminSelce totalOrders={data?.data?.totalOrders} totalRevenue={data?.data?.totalRevenue} totalShipmentCost={data?.data?.totalShipmentCost} />
                  <div className="my-4 px-8">
                        <h1 className="text-xl font-bold ml-4 text-brandTextPrimary">Top Sale Product</h1>
                        <Table>
                              <TableHeader>
                                    <TableRow>
                                          <TableHead className="w-[100px]">Product Id</TableHead>
                                          <TableHead>Product name</TableHead>
                                          <TableHead>Product Category</TableHead>
                                          <TableHead>Product Stock</TableHead>
                                          <TableHead className="text-right">Price</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>

                                    <TableRow key={data?.data?.topSaleProduct?._id} className="bg-green-200 hover:bg-green-200">
                                          <TableCell className="font-medium"><Link to={`/product-details/${data?.data?.topSaleProduct?._id}`}>{data?.data?.topSaleProduct?._id}</Link></TableCell>
                                          <TableCell>{data?.data?.topSaleProduct?.name}</TableCell>
                                          <TableCell>{data?.data?.topSaleProduct?.category?.name}</TableCell>
                                          <TableCell>{data?.data?.topSaleProduct?.stock}</TableCell>
                                          <TableCell className="text-right">{data?.data?.topSaleProduct?.price}</TableCell>
                                    </TableRow>

                              </TableBody>
                        </Table>
                  </div>
                  <div className="px-8">
                        <SaledProduct saleProducts={data?.data?.saleProducts?.slice(0,30)} />
                  </div>
            </div>
      );
};

export default AdminOverview;