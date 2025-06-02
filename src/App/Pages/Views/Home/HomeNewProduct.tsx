import bar from "@/assets/bar.png"
import { Link } from "react-router";
import Loading from "@/App/Components/Customs/Loading";
import { useAppDispatch, useAppSelector } from "@/App/Redux/hook";
import { addToCart, decreaseQuantity, selectCart } from "@/App/Redux/cart.slice";
import { toast } from "sonner";
import { useGetAllProductQuery } from "@/App/Redux/features/product/product.api";
import { TProduct } from "@/Types";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import OfferStiker from "@/App/Components/Customs/OfferStiker";
import { Button } from "@/components/ui/button";
import { useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api";


const HomeNewProduct = () => {
      const { data: webInfo } = useGetWebInfoQuery(undefined)
      const currency = webInfo?.data?.webInfo?.webInfo?.curr;
      const { t } = useTranslation()
      const dispatch = useAppDispatch();
      const carts = useAppSelector(selectCart)
      const { language } = useAppSelector(state => state.language)
      const { data, isLoading } = useGetAllProductQuery([{ name: "isActive", value: true }])
      const handleAddtoCart = (payload: TProduct) => {
            dispatch(addToCart(payload))
            toast.success("Product added in cart.")
      }

      const handleDecreaseQuantity = (id: TProduct) => {
            dispatch(decreaseQuantity(id))
            toast.success("Quantity decreased!")
      }

      if (isLoading) return <Loading />;
      return (

            <div className="mt-16">
                  <div>
                        <p className="flex uppercase items-center gap-2 text-brandSelect text-sm"><img src={bar} alt="" /> {t("We have just arrived")}</p>
                        <h1 className="text-4xl font-semibold text-brandTextPrimary mt-4">{t("Our store's newest products")}</h1>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-8 mt-14">

                        {data?.data?.data?.slice(0, 12)?.map((product: TProduct) =>
                              <div key={product._id} className="border p-4 rounded-lg hover:border-brandSelect relative">
                                    <div className="flex justify-center items-center flex-col relative">
                                          <img className="rounded-sm h-[170px] w-full" src={product?.imageUrls} alt="" />
                                    </div>
                                    <div className="text-center space-y-2 mt-4">
                                          <h2 dir="auto" className="text-brandTextPrimary font-semibold text-xl hover:text-brandSelect"> <Link dir="auto" to={`/product-details/${product._id}`} >{language == "en" ? product?.name?.slice(0, 20) : product?.name_native?.slice(0, 20)}</Link></h2>
                                          <small dir="auto" className="text-[#888888]">{language == 'en' ? product?.category?.name : product?.category?.name_ar}</small>
                                          {
                                                product?.isFlashDeals ?
                                                      <div className="flex justify-center gap-1 pt-1">
                                                            <sup dir="auto" className="text-brandTextSecondary text-sm line-through">{product.price} {currency}</sup>
                                                            <h3 dir="auto" className="text-brandSelect font-bold">{product?.offerPrice} {currency}</h3>
                                                      </div> :
                                                      <h3 dir="auto" className="text-brandSelect font-bold">{product.price} {currency}</h3>
                                          }
                                    </div>

                                    <div className="flex items-center justify-center mt-2">
                                          {
                                                carts.find(cart => cart._id === product._id) ? (
                                                      <>
                                                            <button
                                                                  onClick={() => handleDecreaseQuantity(product)}
                                                                  className="border px-4 py-2 rounded-l-full hover:bg-brandSelect hover:text-white transition-colors duration-500"
                                                            >
                                                                  -
                                                            </button>
                                                            <span className="border-t border-b px-4 py-2">
                                                                  {carts.find(cart => cart._id === product._id)?.quantity
                                                                  }
                                                            </span>
                                                            <button
                                                                  onClick={() => handleAddtoCart(product)}
                                                                  className="border px-4 py-2 rounded-r-full hover:bg-brandSelect hover:text-white transition-colors duration-500"
                                                            >
                                                                  +
                                                            </button>
                                                      </>
                                                ) : (
                                                      <Button
                                                      dir="auto"
                                                            disabled={!product?.isInStock}
                                                            variant={"outline"}
                                                            onClick={() => handleAddtoCart(product)}
                                                            className="border w-full px-8 py-2 rounded-full hover:bg-brandSelect hover:text-white transition-colors duration-500 flex items-center gap-2 justify-center"
                                                      >
                                                            <ShoppingCart /> {t("Add to Cart")}
                                                      </Button>
                                                )
                                          }
                                    </div>

                                    {
                                          product?.isInStock == false && <p className="absolute top-0 text-xs py-1 left-0 z-50 bg-brandSelect text-white px-2 rounded-md">Out Stock</p>
                                    }
                                    {
                                          product?.isFlashDeals == true && <OfferStiker offer={product?.offer as number} />
                                    }
                              </div>)}
                  </div>
            </div>
      );
};

export default HomeNewProduct;