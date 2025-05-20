import Loading from "@/App/Components/Customs/Loading"
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "@/App/Redux/features/order/order.api"
import { selectUser } from "@/App/Redux/features/user/user.slice"
import { useAppSelector } from "@/App/Redux/hook"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router"
import { toast } from "sonner"

export default function ViewAllOrder() {
      const user = useAppSelector(selectUser)
      const [cancleOrder] = useUpdateOrderStatusMutation()
      const { data, isLoading } = useGetAllOrdersQuery(user?.email)
      if (isLoading) return <Loading />

      const handleOrderCancle = async (id: string) => {
            const res = await cancleOrder({ id, status: "Cancel" })
            if (res?.data?.success) {
                  toast.success("Order Cancled successfully")
            } else {
                  toast.error("Something went wrong!!!")
            }
      }

      return (
            <>
                  <h1 className="my-4 text-center text-3xl text-brandTextPrimary font-semibold">Your Order's</h1>

                  {/* Table for larger screens */}
                  <div className="hidden md:block">
                        <Table>
                              <TableCaption>A list of your recent orders.</TableCaption>
                              <TableHeader>
                                    <TableRow>
                                          <TableHead className="w-[100px]">Order Id</TableHead>
                                          <TableHead className="text-center">Status</TableHead>
                                          <TableHead className="text-center">Method</TableHead>
                                          <TableHead>Product Name's</TableHead>
                                          <TableHead>Amount</TableHead>
                                          <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {data?.data?.map((invoice: any, idx: number) => (
                                          <TableRow key={idx}>
                                                <TableCell className="font-medium hover:text-brandSelect">
                                                      <Link to="/verify-order" state={invoice}>{invoice?._id}</Link>
                                                </TableCell>
                                                <TableCell className={`${invoice?.orderStatus === "Shipped" ? "bg-green-300" : invoice?.orderStatus === "Rider Assigned" ? "bg-yellow-200" : invoice?.orderStatus === "Cancel" ? "bg-red-400" : "bg-brandPrimary"} text-center`}>
                                                      {invoice?.orderStatus}
                                                </TableCell>
                                                <TableCell className="text-center">{invoice?.paymentType}</TableCell>
                                                <TableCell>{invoice?.productInfo?.map((pd: any, idx: number) => (<p key={idx}>{pd?._id?.name}</p>))}</TableCell>
                                                <TableCell>{invoice?.totalCost}</TableCell>
                                                <TableCell className="text-right">
                                                      <Button
                                                            onClick={() => handleOrderCancle(invoice._id)}
                                                            disabled={invoice?.orderStatus === "Rider Assigned" || invoice?.orderStatus === "Cancel" || invoice?.orderStatus === "On the way" || invoice?.orderStatus === "Shipped"}
                                                            className="bg-brandTextPrimary hover:bg-brandTextPrimary/60">
                                                            Cancel
                                                      </Button>
                                                </TableCell>
                                          </TableRow>
                                    ))}
                              </TableBody>
                        </Table>
                  </div>

                  {/* Cards for mobile view */}
                  <div className="md:hidden">
                        {data?.data?.map((invoice: any, idx: number) => (
                              <div key={idx} className="my-4 p-4 border rounded-lg shadow-lg bg-white space-y-3">
                                    <h2 className="font-semibold text-brandTextPrimary">Order ID: {invoice?._id}</h2>
                                    <p className="font-semibold">Products:</p>
                                    <div className="">
                                          {invoice?.productInfo?.map((pd: any, idx: number) => (
                                                <p key={idx}>{idx + 1}. {pd?._id?.name}</p>
                                          ))}
                                    </div>
                                    <p >Payment Method: {invoice?.paymentType}</p>
                                    <p >Amount: {invoice?.totalCost}</p>
                                    <div className="flex justify-between items-center  mt-4">
                                          <p className={`text-sm text-center w-fit ${invoice?.orderStatus === "Shipped" ? "bg-green-300" : invoice?.orderStatus === "Rider Assigned" ? "bg-yellow-200" : invoice?.orderStatus === "Cancel" ? "bg-red-400" : "bg-brandPrimary"} p-2 rounded-md`}>
                                                Status: {invoice?.orderStatus}
                                          </p>
                                          <Button
                                                onClick={() => handleOrderCancle(invoice._id)}
                                                disabled={invoice?.orderStatus === "Rider Assigned" || invoice?.orderStatus === "Cancel" || invoice?.orderStatus === "On the way" || invoice?.orderStatus === "Shipped"}
                                                className="bg-brandTextPrimary hover:bg-brandTextPrimary/60">
                                                Cancel
                                          </Button>
                                    </div>
                              </div>
                        ))}
                  </div>
            </>
      )
}
