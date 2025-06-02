/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import generatePDF from 'react-to-pdf';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetAllRiderQuery, useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api"
import { useRef, useState } from "react"
import { toast } from "sonner"
import { useAssignRidersMutation, useUpdateOrderStatusMutation, useVerifyOrderQuery } from "@/App/Redux/features/order/order.api"
import { useLocation } from "react-router";
import { ListPlus } from "lucide-react";
import Loading from "./Loading";

export function OrderInvoice() {
      const location = useLocation();
      const { data: fetchData, isLoading, isFetching, refetch } = useVerifyOrderQuery(location?.state)
      const order = fetchData?.data
      console.log(order)
      const invoiceRef = useRef<HTMLDivElement>(null);
      const { data: data1 } = useGetWebInfoQuery(undefined)
      const webData = data1?.data?.webInfo?.webInfo
      // local state 
      const [updateOrder] = useUpdateOrderStatusMutation()
      const [orderInfo, setOrderInfo] = useState<{ id: string, rider: string }>()
      const { data } = useGetAllRiderQuery(undefined);
      const [assignRider] = useAssignRidersMutation()
      if (isLoading || isFetching) return <Loading />
      const handleAssignRider = async () => {
            if (!orderInfo) {
                  toast.error("Please select a rider!!")
                  return
            }
            try {
                  const res = await assignRider(orderInfo)
                  if (res?.data?.success) {
                        toast.success("Rider Assign Successful")
                        await refetch()
                  }
            } catch (err) {
                  toast.error(JSON.stringify(err))
            }

      }
      const changeOrderStatus = async (status: string) => {
            const res = await updateOrder({ id: order?._id, status })
            if (res.data?.success) {
                  toast.success(`Order successfully ${status}`)
                  await refetch()
            } else {
                  toast.error("Something went wrong!!")
            }
      }
      const dt = (d: string) => new Date(d).toLocaleString()
      return (
            <div className="flex justify-between p-4 items-start gap-8">
                  <div className="w-full max-w-4xl">
                        <div ref={invoiceRef} className="px-4 py-8 rounded-md border">
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
                                          <p className="font-semibold text-brandSelect">Order Id #: {order?.orderId}</p>
                                          <p>Created: {dt(order?.createdAt)}</p>
                                          <p>Currency: {webData?.curr}</p>
                                    </div>
                              </div>

                              {/* Company & Client Info */}
                              <div className="grid grid-cols-2 gap-4 my-6">
                                    <div className="text-gray-700">
                                          <p className="font-semibold">Customer Name: {order?.customerInfo?.name}</p>
                                          <p >Customer Phone: {order?.customerInfo?.phone}</p>
                                          <p>Customer Email: {order?.customerInfo?.email}</p>
                                    </div>
                                    <div className="text-gray-700 text-right">
                                          <p className="font-semibold">Postal code: #{order?.customerInfo?.city}</p>
                                          <p>Building No : {order?.customerInfo?.houseNo}</p>
                                          <p>Zone : {order?.customerInfo?.city}</p>
                                          <p>State : {order?.customerInfo?.region}</p>
                                    </div>
                              </div>

                              {/* Payment Method */}
                              <div className="bg-brandPrimary px-3 py-4 rounded-md">
                                    <p className="font-semibold">Payment Method : <span className="text-brandSelect">{order?.paymentType}</span></p>
                              </div>

                              {/* Items List */}
                              <table className="w-full border-collapse mt-8">
                                    <thead>
                                          <tr className="bg-brandSecondary text-gray-700">
                                                <th className="p-2 text-left">Product Name</th>
                                                <th className="p-2 text-center">Quantity</th>
                                                <th className="p-2 text-center">Price</th>
                                                <th className="p-2 text-right">Amount</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {order?.productInfo?.map((item: any, index: number) => (
                                                <tr className="border-b" key={index}>
                                                      <td className="p-2 text-gray-700">{item?._id?.name}</td>
                                                      <td className="p-2 text-gray-700 text-center">{item?.quantity}</td>
                                                      <td className="p-2 text-gray-700 text-center">{item?._id?.isFlashDeals ? item?._id?.offerPrice : item?._id?.price}</td>
                                                      <td className="p-2 text-right text-gray-700">{(item?._id?.isFlashDeals ? item?._id?.offerPrice : item?._id?.price) * item?.quantity} {webData?.curr}</td>
                                                </tr>
                                          ))}

                                          {/* shipment cost */}
                                          <tr className="border-b font-semibold">
                                                <td className="p-2 text-gray-700">Shipment Cost</td>
                                                <td className="p-2 text-gray-700"></td>
                                                <td className="p-2 text-gray-700"></td>
                                                <td className="p-2 text-right text-gray-700">{order?.shipmentCost} {webData?.curr}</td>
                                          </tr>
                                    </tbody>
                              </table>

                              {/* Total Amount */}
                              <div className="flex justify-between mt-4 text-lg font-semibold bg-brandPrimary p-2 rounded-lg">
                                    <span>Total :</span>
                                    <span>{order?.totalCost} {webData?.curr}</span>
                              </div>

                              <div className="bg-gray-100 px-3 py-4 rounded-md mt-10">
                                    <p className="font-semibold">Additional Note :</p>
                                    <p className="mt-2 italic text-gray-700">{order?.customerInfo?.comment}</p>
                              </div>
                        </div>
                        <button
                              onClick={() => generatePDF(invoiceRef, { filename: "order Invoice.pdf" })}
                              className="mb-4 w-fit bg-brandTextPrimary text-white text-xs md:text-base px-2 md:px-4 py-2 rounded-lg hover:bg-brandTextPrimary/60 transition mt-8"
                        >
                              Download PDF
                        </button>


                  </div>

                  <div className="border w-1/2 py-8 px-4 rounded-md">
                        <div className="flex flex-col items-center gap-3 mb-6">
                              <h1 className="text-center font-bold text-brandTextPrimary text-xl">Order Activities</h1>
                              <h2 className={`text-center w-fit text-sm text-white px-4 py-1 rounded-md ${order?.orderStatus == "Pending" ? "bg-yellow-600" : order?.orderStatus == "Rider Assigned" ? "bg-pink-800" : order?.orderStatus == "On the way" ? "bg-purple-600" : order?.orderStatus == "Shipped" ? "bg-green-600" : "bg-red-600"}`}>
                                    {order?.orderStatus}
                              </h2>
                        </div>

                        <hr />

                        <div className="p-4 rounded-md mt-4 border ">
                              <h3 className="font-bold">Add Rider For delivery</h3>
                              <div className="flex justify-between items-end mt-4 gap-10">
                                    <Select onValueChange={value => setOrderInfo({ id: order?._id, rider: value })}>
                                          <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Riders" />
                                          </SelectTrigger>
                                          <SelectContent>
                                                <SelectGroup>
                                                      <SelectLabel>Rider's</SelectLabel>
                                                      {
                                                            data?.data?.map((rider: any) => <SelectItem value={rider?._id} key={rider?._id}>{rider?.name}</SelectItem>)
                                                      }
                                                </SelectGroup>
                                          </SelectContent>
                                    </Select>

                                    <Button disabled={order?.orderStatus == "Cancel" || order?.orderStatus == "On the way" || order?.orderStatus == "Shipped"} className="bg-green-500" onClick={handleAssignRider}><ListPlus /> Add Now</Button>
                              </div>
                        </div>

                        <div className="p-4 rounded-md mt-4 border ">
                              <h3 className="font-bold mb-4">Assigned Rider Information</h3>
                              <h1><span className="font-semibold">Rider Name : </span>{order?.riderInfo?.name}</h1>
                              <h1><span className="font-semibold">Rider Phone : </span>{order?.riderInfo?.phone}</h1>
                              <h1><span className="font-semibold">Rider Email : </span>{order?.riderInfo?.email}</h1>
                        </div>

                        <div className="p-4 rounded-md mt-4 border ">
                              <h3 className="font-bold mb-4">Change Order Status:</h3>

                              <Button onClick={() => changeOrderStatus("Cancel")} disabled={order?.orderStatus == "Shipped"} variant={"destructive"}>Canceled</Button>

                              <Button onClick={() => changeOrderStatus("Shipped")} disabled={order?.orderStatus == "Shipped" || order?.orderStatus == "Cancel"} className="bg-green-500 ml-4">Shipped</Button>

                              <Button onClick={() => changeOrderStatus("On the way")} disabled={order?.orderStatus == "Shipped" || order?.orderStatus == "Cancel" || order?.orderStatus == "On the way"} className="bg-green-500 ml-4">Pick Order</Button>


                        </div>



                  </div>
            </div>

      )
}
