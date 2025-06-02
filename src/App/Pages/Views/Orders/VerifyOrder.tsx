/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Link, useLocation } from "react-router";
import generatePDF from 'react-to-pdf';
import { useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api";

const VerifyOrder = () => {
      const { data } = useGetWebInfoQuery(undefined)
      const webData = data?.data?.webInfo?.webInfo
      // Ref for PDF generation
      const invoiceRef = useRef<HTMLDivElement>(null);
      const { state } = useLocation()
      return (
            <div className="flex flex-col items-center py-10 ">
                  <div ref={invoiceRef} className="rounded-lg p-6 w-full max-w-4xl">
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
                                    <p>Currency: {webData?.curr}</p>
                              </div>
                        </div>

                        {/* Company & Client Info */}
                        <div className="grid grid-cols-2 gap-4 my-6">
                              <div className="text-gray-700">
                                    <p className="font-semibold">Customer Name: {state?.customerInfo?.name}</p>
                                    <p >Customer Phone: {state?.customerInfo?.phone}</p>
                                    <p>Customer Email: {state?.customerInfo?.email}</p>
                              </div>
                              <div className="text-gray-700 text-right">
                                    <p className="font-semibold">Postal code: #{state?.customerInfo?.city}</p>
                                    <p>Building No : {state?.customerInfo?.houseNo}</p>
                                    <p>Zone : {state?.customerInfo?.city}</p>
                                    <p>State : {state?.customerInfo?.region}</p>
                              </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-brandPrimary px-3 py-4 rounded-md">
                              <p className="font-semibold">Payment Method : <span className="text-brandSelect">{state?.paymentType}</span></p>
                        </div>

                        {/* Items List */}
                        <table className="w-full border-collapse mt-8">
                              <thead>
                                    <tr className="bg-brandSecondary text-gray-700">
                                          <th className="p-2 text-left">Item</th>
                                          <th className="p-2 text-center">Quantity</th>
                                          <th className="p-2 text-center">Price</th>
                                          <th className="p-2 text-right">Amount</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {state?.productInfo?.map((item: any, index: number) => (
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
                                          <td className="p-2 text-right text-gray-700">{state?.shipmentCost} {webData?.curr}</td>
                                    </tr>
                              </tbody>
                        </table>

                        {/* Total Amount */}
                        <div className="flex justify-between mt-4 text-lg font-semibold">
                              <span>Total:</span>
                              <span>{state?.totalCost} {webData?.curr}</span>
                        </div>


                        {state?.riderInfo &&
                              <div className="mt-5">
                                    <hr />
                                    <h1 className="text-center py-2 font-bold text-brandTextPrimary text-xl">Rider</h1>
                                    <hr />
                                    <div>
                                          <h1><span className="font-semibold">Rider Name : </span>{state?.riderInfo?.name}</h1>
                                          <h1><span className="font-semibold">Rider Phone : </span>{state?.riderInfo?.phone}</h1>
                                    </div>
                              </div>
                        }
                        <div className="bg-gray-100 px-3 py-4 rounded-md mt-10">
                              <p className="font-semibold">Additional Note :</p>
                              <p className="mt-2 italic text-gray-700">{state?.customerInfo?.comment}</p>
                        </div>

                  </div>
                  <div className="flex items-center gap-5">
                        <Link to="/orders"><button className="mb-4 bg-brandTextPrimary text-white text-xs md:text-base px-2 md:px-4 py-2 rounded-lg hover:bg-brandTextPrimary/60 transition mt-8">View Orders</button></Link>
                        <button
                              onClick={() => generatePDF(invoiceRef, { filename: "order Invoice.pdf" })}
                              className="mb-4 bg-brandTextPrimary text-white text-xs md:text-base px-2 md:px-4 py-2 rounded-lg hover:bg-brandTextPrimary/60 transition mt-8"
                        >
                              Download PDF
                        </button>
                        <Link to="/"> <button className="mb-4 bg-brandTextPrimary text-white text-xs md:text-base px-2 md:px-4 py-2 rounded-lg hover:bg-brandTextPrimary/60 transition mt-8">Go Home</button></Link>
                  </div>
            </div>
      );
};

export default VerifyOrder;
