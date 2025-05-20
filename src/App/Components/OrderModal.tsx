import {
      Dialog,
      DialogContent,
      DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "../Redux/hook";
import { selectUser } from "../Redux/features/user/user.slice";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../Redux/features/order/order.api";
import {  TProduct, TResponse } from "@/Types";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FaCartArrowDown } from "react-icons/fa";

const OrderModal = ({ product }: { product: TProduct }) => {
      // local state
      const [note, setNote] = useState<string>("")
      const [address, setAddress] = useState<string>("")
      const [selectedQuantity, setSelectedQuantity] = useState(1)

      const [createOrder] = useCreateOrderMutation()
      const user = useAppSelector(selectUser)
      const handleOrderSubmit = async () => {
            if (!user?.email) {
                  toast.error("Login first please...")
                  return
            }
            if (user && user?.role == "admin") return toast.error("You are admin, you can't plase order.")
            const toastId = toast.loading("Order Creating......")
            const orderPayload = {
                  email: user?.email,
                  name: user?.name,
                  product: product._id,
                  quantity: selectedQuantity,
                  price: product.price,
                  address: address || user?.address,
                  orderNote: note
            };

            try {
                  const res = await createOrder(orderPayload) as TResponse
                  if (res?.data?.success) {
                        toast.success("Order created successfully!", { id: toastId });
                        window.location.href = res?.data?.data
                  } else {
                        toast.error(JSON.stringify(res?.error?.data?.message), { id: toastId });
                  }
            } catch (error) {
                  toast.error("An error occurred. Please try again.", { id: toastId });
            }
      };
      return (
            <Dialog>
                  <DialogTrigger asChild>
                        <button className="border cursor-pointer  px-8 py-2 rounded-full bg-brandTextPrimary hover:bg-brandTextPrimary/60 text-white hover:text-brandSecondary  transition-colors duration-500 w-full">Buy Now</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                        <div className="grid gap-4">
                              <div className="space-y-2 text-center">
                                    <h4 className="font-semibold text-xl text-brandTextPrimary">Order Details</h4>
                                    <p className="text-sm text-muted-foreground">
                                          Please double check the order details
                                    </p>
                              </div>
                              <div className="grid gap-2">
                                    <div className="space-y-2">
                                          <Label htmlFor="productName">Product Name</Label>
                                          <Input

                                                readOnly
                                                id="productName"
                                                value={product?.name}
                                                className="col-span-2 h-8"
                                          />
                                    </div>
                                    <div className="flex items-center gap-4 justify-between">
                                          <div className="space-y-2">
                                                <Label htmlFor="price">product Price</Label>
                                                <Input
                                                      readOnly
                                                      id="price"
                                                      value={product?.price * selectedQuantity}
                                                      className="col-span-2 h-8"
                                                />
                                          </div>
                                          <div className="space-y-2">
                                                <Label htmlFor="productName">Quantity</Label>
                                                <div className="flex justify-between items-center gap-5 border rounded-full">
                                                      <button disabled={selectedQuantity == 1} onClick={() => setSelectedQuantity(selectedQuantity - 1)} title="Add to Cart" className="border p-1 rounded-full  hover:bg-brandSelect  hover:text-white transition-colors duration-500"><Minus /></button>
                                                      <h3>{selectedQuantity}</h3>
                                                      <button disabled={selectedQuantity == product?.stock} onClick={() => setSelectedQuantity(selectedQuantity + 1)} title="Add to Cart" className="border p-1 rounded-full  hover:bg-brandSelect  hover:text-white transition-colors duration-500"><Plus /></button>
                                                </div>
                                          </div>
                                    </div>
                                    <h3 className="text-center italic font-semibold mt-4 text-brandTextPrimary">Billing Info</h3>
                                    <hr />
                                    <div className="space-y-2">
                                          <Label htmlFor="name">Your Name</Label>
                                          <Input
                                                id="name"
                                                readOnly
                                                value={user?.name}
                                                className="col-span-2 h-8"
                                          />
                                    </div>
                                    <div className="space-y-2">
                                          <Label htmlFor="email">Email</Label>
                                          <Input
                                                id="email"
                                                value={user?.email}
                                                readOnly
                                                className="col-span-2 h-8"
                                          />
                                    </div>
                                    <div className="space-y-2">
                                          <Label htmlFor="address">Address</Label>
                                          <Input
                                                onChange={(e) => setAddress(e.target.value)}
                                                type="text"
                                                defaultValue={user?.address}
                                                className="col-span-2 h-8"
                                          />
                                    </div>
                                    <div className="space-y-2">
                                          <Label htmlFor="area">Additional info</Label>
                                          <Textarea onChange={(e) => setNote(e.target.value)} placeholder="Type anything..." />
                                    </div>

                              </div>
                        </div>
                        <div className="flex justify-center items-center mt-8 z-30">
                              <button onClick={handleOrderSubmit} className="w-full flex items-center justify-center gap-2 border cursor-pointer  px-8 py-2 rounded-full bg-brandTextPrimary hover:bg-brandTextPrimary/60 text-white hover:text-brandSecondary  transition-colors duration-500"><FaCartArrowDown />Buy Now <span className="text-brandSelect font-bold">(${product?.price})</span></button>
                        </div>
                  </DialogContent>
            </Dialog>
      );
};

export default OrderModal;