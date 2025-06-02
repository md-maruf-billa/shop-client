
import { Button } from "@/components/ui/button";
import {
      Sheet,
      SheetContent,
      SheetHeader,
      SheetTitle,
      SheetTrigger,
} from "@/components/ui/sheet"
import { FaCartArrowDown } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { addToCart, decreaseQuantity, removeFromCart, selectCart } from "../Redux/cart.slice";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { toast } from "sonner";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useGetWebInfoQuery } from "../Redux/features/admin/admin.api";
import { TProduct } from "@/Types";
const CartComponents = () => {
      const { data } = useGetWebInfoQuery(undefined)
      const [openSheet, setOpenSheet] = useState(false);
      const { t } = useTranslation()
      const dispatch = useAppDispatch();
      const carts = useAppSelector(selectCart);
      const handleRemoveToCart = (id: string) => {
            dispatch(removeFromCart(id))
            toast.success("Product removed.")
      }
      const totalPrice = carts?.reduce((acc, next) => acc + ((next?.isFlashDeals ? next?.offerPrice as number : next?.price) * next?.quantity), 0)
      const handleAddtoCart = (payload: TProduct) => {
            dispatch(addToCart(payload))
      }

      const handleDecreaseQuantity = (id: TProduct) => {
            dispatch(decreaseQuantity(id))
      }

      return (
            <Sheet onOpenChange={setOpenSheet} open={openSheet} >
                  <SheetTrigger asChild>
                        <Button className='bg-transparent uppercase text-brandTextPrimary hover:bg-transparent text-xs lg:text-base border-r-2 rounded-none'>
                              <HiOutlineShoppingBag />
                              {t("Cart")}: {carts?.length || 0}
                        </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-scroll w-96">
                        <SheetHeader className="mb-8 mt-3 flex flex-row items-center justify-between">
                              <SheetTitle dir="auto">{t("Your Cart's")}</SheetTitle>
                              <h2 dir="auto" className="flex items-center gap-2">{t("Total")}-: <span className="text-brandSelect font-bold text-xl ">{totalPrice} {data?.data?.webInfo?.webInfo?.curr}</span></h2>
                        </SheetHeader>
                        {
                              carts?.map(cart =>
                                    <div key={cart._id} className="border flex justify-between mb-4 rounded-sm p-2 items-center">
                                          <div className="flex gap-2">
                                                <div >
                                                      <img className="w-20 h-full object-contain" src={cart?.imageUrls} alt="" />
                                                </div>
                                                <div>
                                                      <Link onClick={() => setOpenSheet(false)} to={`/product-details/${cart?._id}`} className="font-bold text-brandTextSecondary hover:underline cursor-pointer">{cart?.name?.slice(0, 20)} ..</Link>


                                                      <p className="text-xs"><span>{t("Categories")} -</span> <span className="italic text-brandTextPrimary">{cart?.category?.name}</span></p>
                                                      <h2 dir="auto" className="text-brandTextTertiary text-sm">{t("Price")}- <span className="text-brandSelect font-semibold text-base">{cart?.isFlashDeals ? cart?.offerPrice : cart?.price} {data?.data?.webInfo?.webInfo?.curr}</span></h2>

                                                      <div className="mt-3">
                                                            <button
                                                                  onClick={() => handleDecreaseQuantity(cart)}
                                                                  className="border px-4 py-1 rounded-l-full hover:bg-brandSelect hover:text-white transition-colors duration-500"
                                                            >
                                                                  -
                                                            </button>
                                                            <button className="border-t border-b px-4 py-1">
                                                                  {cart?.quantity}
                                                            </button>
                                                            <button
                                                                  onClick={() => handleAddtoCart(cart)}
                                                                  className="border px-4 py-1 rounded-r-full hover:bg-brandSelect hover:text-white transition-colors duration-500"
                                                            >
                                                                  +
                                                            </button>
                                                      </div>

                                                </div>
                                          </div>
                                          <button
                                                onClick={() => handleRemoveToCart(cart._id)}
                                                className="text-brandSelect text-xl p-2 rounded-full hover:bg-slate-200 transition-colors duration-200"><RiDeleteBack2Fill /></button>
                                    </div>
                              )
                        }
                        <hr className="my-5" />
                        <Link onClick={() => setOpenSheet(false)} to="/check-out">
                              <button dir="auto" className="w-full flex items-center justify-center gap-2 border cursor-pointer  px-8 py-2 rounded-full bg-brandTextPrimary hover:bg-brandTextPrimary/60 text-white hover:text-brandSecondary  transition-colors duration-500"><FaCartArrowDown />{t("Buy Now")} <span className="text-brandSelect font-bold">({totalPrice} {data?.data?.webInfo?.webInfo?.curr})</span></button>
                        </Link>
                  </SheetContent>
            </Sheet>
      );
};

export default CartComponents;