import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import Loading from "@/App/Components/Customs/Loading";
import NoData from "@/App/Components/Customs/NoData";
import { useAppDispatch, useAppSelector } from "@/App/Redux/hook";
import { addToCart, decreaseQuantity, selectCart } from "@/App/Redux/cart.slice";
import { useGetAllProductQuery } from "@/App/Redux/features/product/product.api";
import { TProduct } from "@/Types";
import ScrollToTop from "@/App/Components/Customs/ScrollTop";

import OfferStiker from "@/App/Components/Customs/OfferStiker";

const OfferedProduct = () => {
    const carts = useAppSelector(selectCart)
    const { language } = useAppSelector(state => state.language)
    const dispatch = useAppDispatch()
    const { data, isLoading, isFetching } = useGetAllProductQuery([{ name: "isActive", value: true }, { name: "isDeleted", value: false }, { name: "isFlashDeals", value: true }]);



    const handleAddtoCart = (payload: TProduct) => {
        dispatch(addToCart(payload))
    }

    const handleDecreaseQuantity = (id: TProduct) => {
        dispatch(decreaseQuantity(id))
    }
    const products = data?.data?.data

    return (
        <>
            <ScrollToTop />
            <div className="text-center py-8 space-y-2 mb-8">
                <h1 className="text-brandTextPrimary text-4xl font-semibold">Our Best Offered Product's</h1>
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
                                    <h3 dir="auto" className="text-brandSelect font-bold">{language == 'en' ? product.price : <span className="text-2xl">{product?.price_native}</span>} {product?.currency}</h3>
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
                                            <button
                                                onClick={() => handleAddtoCart(product)}
                                                className="border w-full px-8 py-2 rounded-full hover:bg-brandSelect hover:text-white transition-colors duration-500 flex items-center gap-2 justify-center"
                                            >
                                                <ShoppingCart /> Add to Cart
                                            </button>
                                        )
                                    }
                                </div>

                                {
                                    product?.isInStock == false && <p className="absolute top-0 text-xs py-1 left-0 z-50 bg-brandSelect text-white px-2 rounded-md">Out Stock</p>
                                }
                                {
                                    product?.isFlashDeals == true && <OfferStiker offer={"10%"} />
                                }
                            </div>
                        ))}
                    </div>
            }
        </>
    );
};

export default OfferedProduct;
