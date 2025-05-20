/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllAssignOrderQuery } from "@/App/Redux/features/order/order.api";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
import { FcViewDetails } from "react-icons/fc";
import Loading from "@/App/Components/Customs/Loading";

const TableSection = ({ title, orders, amount }: { title: string, orders: any[], amount: number }) => (
    <div className="mt-10">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl text-brandTextSecondary mb-2">{title}</h2>
            <div className="flex items-center gap-8">
                <p className="text-brandTextPrimary">Total Amount: <span className="font-bold text-xl text-purple-600-600">{amount}</span></p>
                <p className="text-brandTextPrimary">Total Count: <span className="font-bold text-xl text-red-600">{orders?.length}</span></p>
            </div>
        </div>
        <div className="overflow-x-auto border rounded shadow-sm mt-4">
            <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-brandPrimary  sticky top-0 z-10">
                        <tr>
                            <th className="p-2 w-[160px]">Order ID</th>
                            <th className="p-2">Customer Name</th>
                            <th className="p-2">Customer Phone</th>
                            <th className="p-2">Customer Email</th>
                            <th className="p-2">Method</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2 text-center">Action / Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order._id} className="border-b">
                                <td className="p-2">{order._id}</td>
                                <td className="p-2">{order.customerInfo?.name}</td>
                                <td className="p-2">{order.customerInfo?.phone}</td>
                                <td className="p-2">{order.customerInfo?.email}</td>
                                <td className="p-2">{order.paymentType}</td>
                                <td className="p-2">
                                    <span className={`${order.orderStatus == "On the way" ? "bg-violet-500" : order.orderStatus == "Rider Assigned" ? "bg-yellow-500" : "bg-green-500"}  px-2 py-1 text-white rounded-sm`}>
                                        {order.orderStatus}
                                    </span>
                                </td>
                                <td className="p-2">{order.totalCost || "-"}</td>
                                <td className="p-2 text-center">
                                    <Link to="/admin/order-details" state={order._id}>
                                        <Button variant="outline">
                                            <FcViewDetails className="text-2xl" />
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        {orders?.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center p-4 text-gray-500">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const RiderReport = () => {
    const { state } = useLocation();
    const { data, isFetching } = useGetAllAssignOrderQuery({
        riderId: state?._id,
        orderStatus: null,
    });

    const onTheWay = data?.data?.filter((dt: any) => dt.orderStatus === "On the way") || [];
    const totalOnTheWayAmount = onTheWay.reduce((a: any, b: any) => a + b.totalCost, 0)
    const assignDelivery = data?.data?.filter((dt: any) => dt.orderStatus === "Rider Assigned") || [];
    const totalDeliveryAmount = assignDelivery.reduce((a: any, b: any) => a + b.totalCost, 0)
    const shippedDelivery = data?.data?.filter((dt: any) => dt.orderStatus === "Shipped") || [];
    const totalShippedAmount = shippedDelivery.reduce((a: any, b: any) => a + b.totalCost, 0)

    return (
        <div className="px-10">
            <div className="border p-4 rounded-md shadow-sm bg-white">
                <h1 className="text-2xl text-brandTextSecondary">Rider Information</h1>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="mb-2"><strong>Name:</strong> {state?.name}</p>
                        <p className="mb-2"><strong>Email:</strong> {state?.email}</p>
                        <p className="mb-2"><strong>Phone:</strong> {state?.phone}</p>
                    </div>
                    <img
                        className="h-28 w-28 rounded-full object-cover"
                        src={
                            state?.profileImage ||
                            "https://th.bing.com/th/id/R.5022f5e0febca4def87ddf2ced32e067?rik=7sUIYVAa%2bBLEHw&pid=ImgRaw&r=0&sres=1&sresct=1"
                        }
                        alt="Profile"
                    />
                </div>
            </div>

            {isFetching ? (
                <Loading />
            ) : (
                <>
                    <TableSection amount={totalOnTheWayAmount} title="On-The-Way Deliveries" orders={onTheWay} />
                    <TableSection amount={totalDeliveryAmount} title="Assigned Deliveries" orders={assignDelivery} />
                    <TableSection amount={totalShippedAmount} title="Shipped Deliveries" orders={shippedDelivery} />
                </>
            )}
        </div>
    );
};

export default RiderReport;
