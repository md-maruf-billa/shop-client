/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useUpdateOrderStatusMutation } from "@/App/Redux/features/order/order.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api";
import Swal from "sweetalert2";

const OrderDetails = () => {
    const { data } = useGetWebInfoQuery(undefined)
    const webData = data?.data?.webInfo?.webInfo
    const navigate = useNavigate()
    const [updateOrder] = useUpdateOrderStatusMutation()
    // Ref for PDF generation
    const invoiceRef = useRef<HTMLDivElement>(null);
    const { state } = useLocation()

    const handlePickOrder = async (status: string) => {
        if (status == "Shipped") {
            const res = await updateOrder({ id: state?._id, status })
            if (res.data?.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Order Delivery successful.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/rider/received-orders")
            } else {
                toast.error("Something went wrong!!")
            }
        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Cancel it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await updateOrder({ id: state?._id, status })
                    if (res.data?.success) {
                        Swal.fire({
                            title: "Canceled !",
                            text: "Pick up reject successfully.",
                            icon: "success",
                            timer: 1500
                        });
                        navigate("/rider")
                    }

                }
            });
        }

    }
    return (
        <div className="flex flex-col items-center py-10 ">
            <div ref={invoiceRef} className=" rounded-lg p-6 w-full max-w-3xl">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-brandTextPrimary">Invoice of {webData?.name}</h1>
                    <h3 className="text-lg italic text-gray-600 mt-2 mb-6">
                        Please store the invoice for future reference.
                    </h3>
                </div>

                {/* Invoice Header */}
                <div className="flex justify-between items-center border-b pb-4">
                    <img src={webData?.logo} alt="Company logo" className="w-20" />
                    <div className="text-right text-gray-600">
                        <p className="font-semibold text-brandSelect">Order Id #: {state?.orderId}</p>
                        <p>Created: {state?.createdAt}</p>
                        <p>Currency: QAR</p>
                    </div>
                </div>

                {/* Company & Client Info */}
                <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="text-gray-700">
                        <p className="font-semibold">Cusotmer Name: {state?.customerInfo?.name}</p>
                        <p >Cusotmer Phone: {state?.customerInfo?.phone}</p>
                        <p>Customar Email: {state?.customerInfo?.email}</p>
                    </div>
                    <div className="text-gray-700 text-right">
                        <p className="font-semibold">Postal code: #{state?.customerInfo?.city}</p>
                        <p>Building : {state?.customerInfo?.houseNo}</p>
                        <p>Zone : {state?.customerInfo?.city}</p>
                        <p>State : {state?.customerInfo?.region}</p>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-brandPrimary p-3 rounded-md mb-4">
                    <p className="font-semibold">Payment Method : {state?.paymentType}</p>
                    <p className="text-gray-700">Order Status : {state?.orderStatus}</p>
                </div>

                {/* Items List */}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-brandSecondary text-gray-700">
                            <th className="p-2 text-left">Item</th>
                            <th className="p-2 text-right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state?.productInfo?.map((item: any, index: number) => (
                            <tr className="border-b" key={index}>
                                <td className="p-2 text-gray-700">{item?._id?.name}</td>
                                <td className="p-2 text-right text-gray-700">{item?._id?.price}</td>
                            </tr>
                        ))}

                        {/* shipment cost */}
                        <tr className="border-b font-semibold bg-brandSecondary">
                            <td className="p-2 text-gray-700">Shipment Cost</td>
                            <td className="p-2 text-right text-gray-700">{state?.shipmentCost}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Total Amount */}
                <div className="flex justify-between mt-4 text-lg font-semibold">
                    <span>Total:</span>
                    <span>{state?.totalCost}</span>
                </div>



            </div>
            <div className="flex items-center gap-5">
                <Button disabled onClick={() => handlePickOrder("Reject to Customer")} variant={"destructive"}>Customer Not Received</Button>
                <Button className="bg-green-600" onClick={() => handlePickOrder("Shipped")} >Delivery Done</Button>
            </div>
        </div>
    );
};
// state?.orderStatus == "Rider Assigned" ||
export default OrderDetails;
