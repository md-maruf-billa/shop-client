/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/App/Redux/hook";
import { addToCart, clearCart, decreaseQuantity, selectCart } from "@/App/Redux/cart.slice";
import { useLocation, useNavigate } from "react-router";
import { TCartProduct, TProduct, TResponse } from "@/Types";
import { useEffect, useState } from "react";
import { selectUser } from "@/App/Redux/features/user/user.slice";
import { toast } from "sonner";
import { useCreateOrderMutation } from "@/App/Redux/features/order/order.api";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api";
import { Minus, Plus } from "lucide-react";

const Checkout = () => {
      const { data: webDataFromDb } = useGetWebInfoQuery(undefined);
      const webData = webDataFromDb?.data?.webInfo;
      const navigate = useNavigate();
      const dispatch = useAppDispatch();
      const [createOrder] = useCreateOrderMutation();
      const [paymentType, setPaymentType] = useState<string>("card");
      const [shipmentCost, setShipmentCost] = useState<number>(0);
      const data = useAppSelector(selectCart);
      const user = useAppSelector(selectUser);
      const { state } = useLocation();
      const carts = state || data;

      const [selectedShippingTitle, setSelectedShippingTitle] = useState<string | undefined>(undefined);

      const { register, handleSubmit, formState: { errors } } = useForm({
            defaultValues: {
                  customerInfo: {
                        name: user?.name || "",
                        phone: user?.phone || "",
                        email: user?.email || "",
                        houseNo: "",
                        city: "",
                        region: "",
                        postalCode: "",
                        comment: ""
                  }
            }
      });

      useEffect(() => {
            if (webData?.shipping?.length) {
                  const defaultTitle = webData.shipping[0].title;
                  setSelectedShippingTitle(defaultTitle);
                  setShipmentCost(webData.shipping[0].fee);
            }
      }, [webData]);




      const total = carts?.reduce((acc: number, pd: TCartProduct) => {
            return acc + pd.price * pd?.quantity;
      }, 0);

      const grandTotal = total + shipmentCost;
      const handleAddtoCart = (payload: TProduct) => {
            dispatch(addToCart(payload))
      }

      const handleDecreaseQuantity = (id: TProduct) => {
            dispatch(decreaseQuantity(id))
      }
      const handleOrderSubmit: SubmitHandler<FieldValues> = async (orderPayload) => {


            if (!user?.email) {
                  toast.error("Login first please...");
                  return;
            }

            if (user?.role === "admin") {
                  return toast.error("You are admin, you can't place orders.");
            }

            const toastId = toast.loading("Order Creating...");

            const modifiedPayload = {
                  ...orderPayload,
                  paymentType,
                  shipmentCost,
                  productInfo: carts
            };

            try {
                  const res = await createOrder(modifiedPayload) as TResponse;
                  if (res?.data?.success) {
                        toast.success("Order created successfully!", { id: toastId });
                        dispatch(clearCart());
                        navigate("/verify-order", { state: res?.data?.data });
                  } else {
                        toast.error(JSON.stringify(res?.error?.data?.message), { id: toastId });
                  }
            } catch (error) {
                  toast.error("An error occurred. Please try again.", { id: toastId });
                  console.error(error);
            }
      };

      return (
            <div className="min-h-screen py-10 px-4">
                  <div className="max-w-7xl mx-auto">
                        <div className="bg-gradient-to-r from-brandPrimary to-brandSecondary p-6 rounded-lg text-center mb-8">
                              <h1 className="text-3xl font-bold">Shipping</h1>
                              <p className="text-gray-700">Home - Cart - Shipping</p>
                        </div>

                        <form onSubmit={handleSubmit(handleOrderSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <Card className="md:col-span-2">
                                    <CardHeader>
                                          <CardTitle>Customer Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                          {/* --- Customer info fields (no changes) --- */}
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                      <Label htmlFor="firstName">First Name*</Label>
                                                      <Input {...register("customerInfo.name", { required: "Name is required" })} id="firstName" readOnly placeholder="Enter your full name" />
                                                      {errors.customerInfo?.name && <p className="text-red-500 text-sm">{errors.customerInfo.name.message}</p>}
                                                </div>
                                                <div>
                                                      <Label htmlFor="lastName">Last Name (optional)</Label>
                                                      <Input id="lastName" placeholder="Enter your last name" />
                                                </div>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div>
                                                      <Label htmlFor="phone">Phone Number*</Label>
                                                      <Input {...register("customerInfo.phone", { required: "Phone number is required" })} id="phone" placeholder="Enter your phone number" />
                                                      {errors.customerInfo?.phone && <p className="text-red-500 text-sm">{errors.customerInfo.phone.message}</p>}
                                                </div>
                                                <div>
                                                      <Label htmlFor="email">Email Address*</Label>
                                                      <Input {...register("customerInfo.email", { required: "Email is required" })} readOnly id="email" placeholder="Enter your email address" />
                                                      {errors.customerInfo?.email && <p className="text-red-500 text-sm">{errors.customerInfo.email.message}</p>}
                                                </div>
                                          </div>

                                          <div className="mt-4">
                                                <Label htmlFor="houseNo">Building Number*</Label>
                                                <Input {...register("customerInfo.houseNo", { required: "House number is required" })} id="houseNo" placeholder="Enter your building number" />
                                                {errors.customerInfo?.houseNo && <p className="text-red-500 text-sm">{errors.customerInfo.houseNo.message}</p>}
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div>
                                                      <Label htmlFor="city">Zone*</Label>
                                                      <Input {...register("customerInfo.city", { required: "Zone is required" })} id="city" placeholder="Your Zone" />
                                                      {errors.customerInfo?.city && <p className="text-red-500 text-sm">{errors.customerInfo.city.message}</p>}
                                                </div>
                                                <div>
                                                      <Label htmlFor="region">State*</Label>
                                                      <Input {...register("customerInfo.region", { required: "State is required" })} id="region" placeholder="Your state" />
                                                      {errors.customerInfo?.region && <p className="text-red-500 text-sm">{errors.customerInfo.region.message}</p>}
                                                </div>
                                          </div>

                                          <div className="mt-4">
                                                <Label htmlFor="comment">Comment</Label>
                                                <Textarea {...register("customerInfo.comment")} id="comment" placeholder="Write your comment" />
                                          </div>

                                          {/* --- Shipping options --- */}
                                          <div className="mt-6">
                                                <h2 className="text-xl font-semibold mb-2">Shipping</h2>
                                                <RadioGroup
                                                      value={selectedShippingTitle}
                                                      onValueChange={value => {
                                                            setSelectedShippingTitle(value);
                                                            const selectedShipping = webData.shipping.find((sp: any) => sp.title === value);
                                                            if (selectedShipping) {
                                                                  setShipmentCost(selectedShipping.fee);
                                                            }
                                                      }}
                                                >
                                                      {webData?.shipping?.map((sp: any) => (
                                                            <label key={sp.title} htmlFor={sp.title} className="flex items-center justify-between border rounded-lg p-4 cursor-pointer">
                                                                  <div className="flex items-center gap-4">
                                                                        <RadioGroupItem value={sp.title} id={sp.title} />
                                                                        <div>
                                                                              <p className="font-medium">{sp.title}</p>
                                                                              <p className="text-sm text-gray-500">{sp.minDay} - {sp.maxDay}</p>
                                                                        </div>
                                                                  </div>
                                                                  <span className="font-medium">
                                                                        {sp.fee} {webData?.webInfo?.curr}
                                                                  </span>
                                                            </label>
                                                      ))}
                                                </RadioGroup>
                                          </div>
                                    </CardContent>
                              </Card>

                              {/* Sidebar */}
                              <div className="space-y-6">
                                    <Card>
                                          <CardHeader>
                                                <CardTitle>Selected Product</CardTitle>
                                          </CardHeader>
                                          <CardContent>
                                                {carts?.map((cart: TCartProduct) => (
                                                      <div key={cart._id} className="border flex justify-between mb-2 rounded-sm p-2 items-center">
                                                            <div className="flex gap-2">
                                                                  <img className="w-14 h-14" src={cart?.imageUrls} alt={cart?.name} />
                                                                  <div>
                                                                        <h2 className="font-bold text-brandTextSecondary">{cart?.name.slice(0, 20)}...</h2>
                                                                        <p className="text-sm text-brandTextTertiary">
                                                                              Price: <span className="text-brandSelect font-semibold text-base">{webData?.webInfo?.curr} {cart?.price * cart?.quantity}</span>
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                  <Button type="button" size="icon" variant="outline" onClick={() => handleDecreaseQuantity(cart)}>
                                                                        <Minus className="w-4 h-4" />
                                                                  </Button>
                                                                  <span className="px-2">{cart?.quantity}</span>
                                                                  <Button type="button" size="icon" variant="outline" onClick={() => handleAddtoCart(cart)}>
                                                                        <Plus className="w-4 h-4" />
                                                                  </Button>
                                                            </div>
                                                      </div>
                                                ))}
                                          </CardContent>
                                    </Card>

                                    {/* Payment Details */}
                                    <Card>
                                          <CardHeader>
                                                <CardTitle>Payment Details</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-3">
                                                <div className="flex justify-between"><span>Subtotal</span><span>{webData?.webInfo?.curr} {total}</span></div>
                                                <div className="flex justify-between"><span>Discount</span><span>{webData?.webInfo?.curr} 0</span></div>
                                                <div className="flex justify-between"><span>Shipment cost</span><span>{webData?.webInfo?.curr} {shipmentCost}</span></div>
                                                <Separator />
                                                <div className="flex justify-between font-semibold">
                                                      <span>Grand total</span>
                                                      <span>{webData?.webInfo?.curr} {grandTotal}</span>
                                                </div>
                                                <Separator />
                                                <div>
                                                      <span className="font-semibold">Payment Method</span>
                                                      <RadioGroup defaultValue="card" className="flex justify-between items-center mt-3" onValueChange={value => setPaymentType(value)}>
                                                            <Label htmlFor="r1" className={`flex items-center space-x-2 border p-2 rounded-md cursor-pointer ${paymentType == 'cash on delivery' && 'bg-brandSelect text-white'}`}>
                                                                  <RadioGroupItem value="cash on delivery" id="r1" className="hidden" />
                                                                  <span>Cash on Delivery</span>
                                                            </Label>
                                                            <Label htmlFor="r2" className={`flex items-center space-x-2 border p-2 rounded-md cursor-pointer ${paymentType == 'card' && 'bg-brandSelect text-white'}`}>
                                                                  <RadioGroupItem value="card" id="r2" className="hidden" />
                                                                  <span>Card</span>
                                                            </Label>
                                                      </RadioGroup>
                                                </div>
                                          </CardContent>
                                          <CardFooter>
                                                <Button type="submit" className="w-full">Confirm Order</Button>
                                          </CardFooter>
                                    </Card>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default Checkout;
