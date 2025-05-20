/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/App/Components/Customs/Loading";
import NoData from "@/App/Components/Customs/NoData";
import { useGetAllOrdersForAdminQuery } from "@/App/Redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";
import { IoIosOptions } from "react-icons/io";
import { Link } from "react-router";

const ManageOrder = () => {
      const [search, setSearch] = useState<string | undefined>()
      const [filterStatus, setFilterStatus] = useState<string | undefined>()
      const [filterMethod, setFilterMethod] = useState<string | undefined>()
      const { data, isLoading, isFetching } = useGetAllOrdersForAdminQuery({
            searchTerm: search,
            orderStatus: filterStatus,
            paymentMethod: filterMethod
      });
      if (isLoading) return <Loading />;

      return (
            <div>
                  <div className="flex flex-wrap justify-between items-center bg-green-200 rounded-md px-4">
                        <h1 className="my-8 text-3xl text-brandTextPrimary font-semibold">
                              Orders
                        </h1>
                        <div className="flex items-center gap-8">
                              <Select onValueChange={value => setFilterStatus(value)}>
                                    <SelectTrigger className="w-[200px]">
                                          <SelectValue placeholder="Filter Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Filter using Order status</SelectLabel>
                                                <SelectItem value=" ">All</SelectItem>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Cancel">Cancel</SelectItem>
                                                <SelectItem value="Rider Assigned">Rider Assigned</SelectItem>
                                                <SelectItem value="On the way">On the way</SelectItem>
                                                <SelectItem value="Shipped">Shipped</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              <Select onValueChange={value => setFilterMethod(value)}>
                                    <SelectTrigger className="w-[220px]">
                                          <SelectValue placeholder="Filter Method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Filter with payment method</SelectLabel>
                                                <SelectItem value=" ">All</SelectItem>
                                                <SelectItem value="cash on delivery">Cash on delivery</SelectItem>
                                                <SelectItem value="card">Card</SelectItem>
                                                <SelectItem value="bank">Bank</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              <div className="relative w-full  hidden md:block">
                                    <Input
                                          onChange={e => setSearch(e.target.value)}
                                          placeholder="Search here"
                                          className="rounded-full bg-brandSecondary"
                                    />
                                    <Button className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-brandTextPrimary">
                                          <Search /> Search
                                    </Button>
                              </div>
                        </div>
                  </div>
                  <div>
                        {
                              isFetching ? <Loading /> :
                                    <Table>
                                          <TableHeader>
                                                <TableRow className="bg-brandSecondary">
                                                      <TableHead >Order Id</TableHead>
                                                      <TableHead>Customer Name</TableHead>
                                                      <TableHead>Customer Phone</TableHead>
                                                      <TableHead>Customer Email</TableHead>
                                                      <TableHead>Product Count</TableHead>
                                                      <TableHead>Method</TableHead>
                                                      <TableHead>Status</TableHead>
                                                      <TableHead>Amount</TableHead>
                                                      <TableHead className="text-center">Action / Status</TableHead>
                                                </TableRow>
                                          </TableHeader>
                                          {
                                                data?.data?.length > 0 ? <TableBody>
                                                      {data?.data?.map((order: any) => (
                                                            <TableRow key={order._id}>
                                                                  <TableCell className="font-medium">{order?._id}</TableCell>
                                                                  <TableCell>{order?.customerInfo?.name}</TableCell>
                                                                  <TableCell>{order?.customerInfo?.phone}</TableCell>
                                                                  <TableCell>{order?.customerInfo?.email}</TableCell>
                                                                  <TableCell className="text-center">
                                                                        {order?.productInfo?.length}
                                                                  </TableCell>
                                                                  <TableCell>{order?.paymentType}</TableCell>
                                                                  <TableCell >
                                                                        <span className={`${order?.orderStatus == "Pending" ? "text-yellow-600" : order?.orderStatus == "Rider Assigned" ? "text-pink-800" : order?.orderStatus == "On the way" ? "text-purple-600" : order?.orderStatus == "Shipped" ? "text-green-600" : "text-red-600"}`}>
                                                                              {order?.orderStatus}
                                                                        </span>
                                                                  </TableCell>
                                                                  <TableCell>{order?.totalCost}</TableCell>
                                                                  <TableCell className="flex justify-end">
                                                                        {/* <OrderInvoice order={order} /> */}
                                                                        <Link state={order._id} to={"/admin/order-details"}><Button variant={"outline"}><IoIosOptions className="text-xl" /></Button></Link>
                                                                  </TableCell>
                                                            </TableRow>
                                                      ))}
                                                </TableBody> : <TableCell colSpan={6}><NoData /></TableCell>
                                          }
                                    </Table>
                        }

                  </div>
            </div>
      );
};

export default ManageOrder;
