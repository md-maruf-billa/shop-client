import OfferStiker from "@/App/Components/Customs/OfferStiker";
import { useGetAllProductQuery } from "@/App/Redux/features/product/product.api";
import { useAppSelector } from "@/App/Redux/hook";
import bar from "@/assets/bar.png"
import { TProduct } from "@/Types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const HomeFlasSell = () => {
      const { t } = useTranslation()
      const { language } = useAppSelector(state => state.language)
      const { data, isLoading } = useGetAllProductQuery([{ name: "isActive", value: true }, { name: "isDeleted", value: false }, { name: "isFlashDeals", value: true }])
      if (isLoading) return

      return (
            <div className="mt-20">
                  <div className="flex items-center justify-between">
                        <div>
                              <p className="flex items-center gap-2 text-brandSelect text-sm"><img src={bar} alt="" /> {t("EXCITING BEST PRICE")}</p>
                              <h1 className="text-4xl font-semibold text-brandTextPrimary mt-4">{t("Best Price")}</h1>
                        </div>
                  </div>
                  <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8   py-5">
                        {data?.data?.data?.slice(0, 4)?.map((product: TProduct) =>
                              <div key={product._id} className="border p-4 rounded-lg hover:border-brandSelect relative">
                                    <div className="flex justify-center items-center flex-col relative">
                                          <img className="rounded-sm h-[170px] w-full" src={product?.imageUrls} alt="" />
                                    </div>
                                    <div className="text-center space-y-2 mt-4">
                                          <h2 className="text-brandTextPrimary font-semibold text-xl hover:text-brandSelect"> <Link dir="auto" to={`/product-details/${product._id}`} >{language == "en" ? product?.name : product?.name_native}</Link></h2>
                                          <small dir="auto" className="text-[#888888]">{product?.category?.name}</small>
                                          <h3 dir="auto" className="text-brandSelect font-bold">{product.price} QAR</h3>
                                    </div>
                                    {
                                          product?.isInStock == false && <p className="absolute top-0 text-xs py-1 left-0 z-50 bg-brandSelect text-white px-2 rounded-md">Out Stock</p>
                                    }
                                    {
                                          product?.isFlashDeals == true && <OfferStiker offer={"10%"} />
                                    }

                              </div>)}

                  </div>

            </div >
      );
};

export default HomeFlasSell;