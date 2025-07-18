/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllAssignOrderQuery } from "@/App/Redux/features/order/order.api";
import { selectUser } from "@/App/Redux/features/user/user.slice";
import { useAppSelector } from "@/App/Redux/hook";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";

const ReceivedOrders = () => {
      const user = useAppSelector(selectUser);
      const { data, refetch } = useGetAllAssignOrderQuery({ riderId: user?._id, orderStatus: "On the way" });
      const location = useLocation();

      useEffect(() => {
            refetch();
      }, [location, refetch]);
      return (
            <div>
                  {/* Table for larger screens */}
                  <div className="hidden md:block">
                        <Table>
                              <TableCaption>A list of your recent orders.</TableCaption>
                              <TableHeader>
                                    <TableRow className="bg-brandSecondary">
                                          <TableHead className="w-[100px]">Order Id</TableHead>
                                          <TableHead>Customer Name</TableHead>
                                          <TableHead>Customer Phone</TableHead>
                                          <TableHead>Customer Email</TableHead>
                                          <TableHead>Method</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead>Amount</TableHead>
                                          <TableHead className="text-center">Action / Status</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {data?.data?.map((order: any) => (
                                          <TableRow key={order._id}>
                                                <TableCell className="font-medium">{order?._id}</TableCell>
                                                <TableCell>{order?.customerInfo?.name}</TableCell>
                                                <TableCell>{order?.customerInfo?.phone}</TableCell>
                                                <TableCell>{order?.customerInfo?.email}</TableCell>
                                                <TableCell>{order?.paymentType}</TableCell>
                                                <TableCell>
                                                      <span className="bg-violet-500 px-2 py-1 text-white rounded-sm">{order?.orderStatus}</span>
                                                </TableCell>
                                                <TableCell>{order?.totalCost}</TableCell>
                                                <TableCell className="justify-end">
                                                      <Link to="/rider/order-details" state={order}>
                                                            <Button>Details</Button>
                                                      </Link>
                                                </TableCell>
                                          </TableRow>
                                    ))}
                              </TableBody>
                        </Table>
                  </div>

                  {/* Cards for smaller screens */}
                  <div className="md:hidden flex flex-col gap-4">
                        {data?.data?.map((order: any) => (
                              <div key={order._id} className="border rounded-lg p-4 shadow-md bg-white">
                                    <p className="text-sm text-gray-600"><strong>Order ID:</strong> {order?._id}</p>
                                    <p className="text-sm"><strong>Customer:</strong> {order?.customerInfo?.name}</p>
                                    <p className="text-sm"><strong>Phone:</strong> {order?.customerInfo?.phone}</p>
                                    <p className="text-sm"><strong>Email:</strong> {order?.customerInfo?.email}</p>
                                    <p className="text-sm">
                                          <strong>Products:</strong>{" "}
                                          {order?.productInfo?.map((pd: any, idx: number) => (
                                                <span key={idx}>{pd?._id?.name}{idx !== order?.productInfo.length - 1 ? ", " : ""}</span>
                                          ))}
                                    </p>
                                    <p className="text-sm"><strong>Payment:</strong> {order?.paymentType}</p>
                                    <p className={`text-sm px-2 py-1 rounded-md w-fit ${order?.orderStatus === "Shipped" ? "bg-green-300" : order?.orderStatus === "Rider Assigned" ? "bg-yellow-200" : order?.orderStatus === "Cancel" ? "bg-red-400" : "bg-brandPrimary"}`}>
                                          <strong>Status:</strong> {order?.orderStatus}
                                    </p>
                                    <p className="text-sm"><strong>Amount:</strong> ${order?.totalCost}</p>
                                    <div className="mt-2">
                                          <Link to="/rider/order-details" state={order}>
                                                <Button className="w-full">View Details</Button>
                                          </Link>
                                    </div>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default ReceivedOrders;
