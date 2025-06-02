/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingCart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import Loading from "@/App/Components/Customs/Loading";
import NoData from "@/App/Components/Customs/NoData";
import { useAppDispatch, useAppSelector } from "@/App/Redux/hook";
import { addToCart, decreaseQuantity, selectCart } from "@/App/Redux/cart.slice";
import { useGetAllProductQuery } from "@/App/Redux/features/product/product.api";
import { TCategory, TProduct } from "@/Types";
import { useGetAllCategoryQuery, useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api";
import ScrollToTop from "@/App/Components/Customs/ScrollTop";
import OfferStiker from "@/App/Components/Customs/OfferStiker";
import { Button } from "@/components/ui/button";
import HomeTopCategories from "../Home/HomeTopCategories";
import { t } from "i18next";

function useQuery() {
      return new URLSearchParams(useLocation().search);
}

const Products = () => {
      const { data: webInfo } = useGetWebInfoQuery(undefined)
      const currency = webInfo?.data?.webInfo?.webInfo?.curr;
      const query = useQuery();
      const category = query.get("category");
      const carts = useAppSelector(selectCart)
      const { language } = useAppSelector(state => state.language)
      const dispatch = useAppDispatch()
      const { data: categories } = useGetAllCategoryQuery(undefined)
      // Local state for filters
      const [sort, setSort] = useState<string | undefined>();
      // const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
      const [searchTerm, setSearchTerm] = useState<string>(""); // Stores user input
      const [queryParams, setQueryParams] = useState<{ name: string; value: string | boolean | number | undefined }[]>([]);
      const { data, isLoading, isFetching } = useGetAllProductQuery(queryParams);

      // for pagination
      const [page, setPage] = useState<number>(1);
      const [limit, setLimit] = useState<number>(50);
      const navigate = useNavigate()


      // Update queryParams whenever filters change
      useEffect(() => {
            const newParams: { name: string; value: string | boolean | number | undefined }[] = [];
            newParams.push({ name: "isActive", value: true })
            // if ((categoryFilter ?? "").length > 2) {
            //       newParams.push({ name: "category", value: categoryFilter });
            // }
            if (category) {
                  newParams.push({ name: "category", value: category });
            }
            if (searchTerm?.length > 1) {
                  newParams.push({ name: "searchTerm", value: searchTerm });
            }
            if (sort && sort !== "all") {
                  newParams.push({ name: "sort", value: sort });
            }
            newParams.push({ name: "page", value: page });
            newParams.push({ name: "limit", value: limit });
            setQueryParams(newParams);
      }, [sort, searchTerm, category, page, limit]);


      const handleAddtoCart = (payload: TProduct) => {
            dispatch(addToCart(payload))
      }

      const handleDecreaseQuantity = (id: TProduct) => {
            dispatch(decreaseQuantity(id))
      }
      const products = data?.data?.data

      return (
            <>
                  <ScrollToTop isRefresh={isFetching} />
                  {/* <div className="text-center py-8 space-y-2 mb-8">
                        <h1 className="text-brandTextPrimary text-4xl font-semibold">New Release Product</h1>
                        <p className="text-brandTextTertiary">1000+ product are published by different brand and category every day.</p>
                  </div> */}

                  {/* Filter and search section */}
                  <div className="flex my-8 flex-wrap md:flex-nowrap justify-between gap-5 md:gap-0">
                        <div className="flex flex-wrap items-center gap-5">
                              
                              <Select onValueChange={setSort}>
                                    <SelectTrigger className="w-[130px] md:w-[180px]">
                                          <SelectValue placeholder={t("Sort By")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Sort By</SelectLabel>
                                                <SelectItem value="name">{t("Name A to Z")}</SelectItem>
                                                <SelectItem value="-name">{t("Name Z to A")}</SelectItem>
                                                <SelectItem value="price">{t("Price Low To high")}</SelectItem>
                                                <SelectItem value="-price">{t("Price High To Low")}</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>

                              {/* <Select defaultValue={category as string || " "} onValueChange={setCategoryFilter}> */}
                              <Select onValueChange={(value) => {
                                    if (value.trim() === "") {
                                          navigate("/products"); // remove all category filters
                                    } else {
                                          navigate(`/products?category=${value}`);
                                    }
                              }}>
                                    <SelectTrigger className="w-[130px] md:w-[180px]">
                                          <SelectValue placeholder={t("Filter With Category")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Select Category</SelectLabel>
                                                <SelectItem value=" ">All</SelectItem>
                                                {categories?.data?.map((category: TCategory) => (
                                                      <SelectItem key={category._id} value={category._id}>
                                                            {category.name}
                                                      </SelectItem>
                                                ))}
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>

                        </div>

                        <div className="relative w-full md:w-2/3 lg:w-1/3 h-fit">
                              <Input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={t("Search Product")}
                                    className="rounded-full"
                              />
                              <button

                                    className="absolute flex items-center gap-2 z-10  right-0 top-1/2 -translate-y-1/2 h-10 p-2 rounded-full "
                              >
                                    <Search />

                              </button>
                        </div>
                  </div>

                  {/* Books Display */}
                  {
                        isLoading || isFetching ? <Loading /> : products?.length <= 0 ? <NoData /> :


                              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-8">
                                    {products?.map((product: TProduct) => (
                                          <div key={product._id} className="border p-4 rounded-lg hover:border-brandSelect relative">
                                                <div className="flex justify-center items-center flex-col relative">
                                                      <img className="rounded-sm h-[170px] w-full" src={product?.imageUrls} alt="" />
                                                </div>
                                                <div className="text-center space-y-2 mt-4">
                                                      <h2 dir="auto" className="text-brandTextPrimary font-semibold text-xl hover:text-brandSelect"> <Link dir="auto" to={`/product-details/${product._id}`} >{language == "en" ? product?.name?.slice(0, 20) : product?.name_native?.slice(0, 20)} ...</Link></h2>
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

                                                <div className="flex items-center justify-center  mt-2">
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
                                          </div>
                                    ))}
                              </div>
                  }

                  {/* Pagination */}
                  {data?.data?.meta && data?.data?.meta.totalPage > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-10">
                              <button
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 border rounded disabled:opacity-50"
                              >
                                    {t("Previous")}
                              </button>
                              <span className="text-sm text-gray-600">
                                    {t("Page")} {data.data.meta.page} {t("in")} {data.data.meta.totalPage}
                              </span>
                              <button
                                    onClick={() => setPage(prev => Math.min(prev + 1, data.data.meta.totalPage))}
                                    disabled={page === data.data.meta.totalPage}
                                    className="px-4 py-2 border rounded disabled:opacity-50"
                              >
                                    {t("Next")}
                              </button>

                              <select
                                    value={limit}
                                    onChange={(e) => {
                                          setLimit(Number(e.target.value));
                                          setPage(1);
                                    }}
                                    className="px-3 py-2 border rounded bg-white text-gray-700"
                              >
                                    <option value={10}>10 / {t("Page")}</option>
                                    <option value={20}>20 / {t("Page")}</option>
                                    <option value={50}>50 / {t("Page")}</option>
                                    <option value={100}>100 / {t("Page")}</option>
                              </select>

                        </div>
                  )}

                  <HomeTopCategories />

            </>
      );
};

export default Products;
