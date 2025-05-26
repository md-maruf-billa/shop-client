import CustomButton from "@/App/Components/Customs/CustomButton";
import { useGetBookByIdQuery } from "@/App/Redux/features/product/product.api";
import { selectUser } from "@/App/Redux/features/user/user.slice";
import { useAppDispatch, useAppSelector } from "@/App/Redux/hook";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { TBookReview, TProduct, TResponse } from "@/Types";
import { Heart, ShoppingCart } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import Loading from "@/App/Components/Customs/Loading";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useGetReviewsQuery, useSendReviewMutation } from "@/App/Redux/features/user/user.api";
import { addToCart, selectCart, decreaseQuantity } from "@/App/Redux/cart.slice";
import { FaStar } from "react-icons/fa";
import ScrollToTop from "@/App/Components/Customs/ScrollTop";
import { useGetAllProductQuery } from "@/App/Redux/features/product/product.api";
import OfferStiker from "@/App/Components/Customs/OfferStiker";

interface QueryParam {
      name: string;
      value: string;
}

function getRating(rating: number) {
      switch (rating) {
            case 1:
                  return 'Very Bad';
            case 2:
                  return 'Bad';
            case 3:
                  return 'Good';
            case 4:
                  return 'Very good';
            case 5:
                  return 'Highly Recomended';
            default:
                  return 'None';
      }
}

const ProductDetails = () => {
      const { language } = useAppSelector(state => state.language)
      const dispatch = useAppDispatch()
      const carts = useAppSelector(selectCart)
      const { bookId } = useParams();
      const [createReview] = useSendReviewMutation()
      const { data, isLoading } = useGetBookByIdQuery(bookId);
      const { data: reviews } = useGetReviewsQuery(bookId, { skip: isLoading })
      const user = useAppSelector(selectUser);
      const [rating, setRating] = useState(0);
      const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
      const { data: relatedProducts } = useGetAllProductQuery(queryParams);

      const { register, handleSubmit } = useForm();

      useEffect(() => {
            if (data?.data?.category?._id) {
                  setQueryParams([{ name: "category", value: data.data.category._id }]);
            }
      }, [data?.data?.category?._id]);

      const handelSubmitReview: SubmitHandler<FieldValues> = async (data) => {
            const toastId = toast.loading("Review Submitting......");
            if (!user?.email) return toast.error("Please Login First", { id: toastId })
            if (rating == 0 || data?.feedBack.length == 0) return toast.error("Please provide feedback", { id: toastId })
            const reviewPayload = {
                  bookId,
                  reviewerPhoto: user?.profileImage,
                  reviewerName: user?.name,
                  reviewerEmail: user?.email,
                  empression: getRating(rating),
                  feedBack: data.feedBack,
                  rating: rating
            }
            const res = await createReview(reviewPayload) as TResponse
            if (res.data?.success) {
                  toast.success("Review successfully submitted ........!!", { id: toastId })
            } else {
                  toast.error("Something went wrong!! Please provide valid information", { id: toastId })
            }
      }

      // handle order

      if (isLoading) return <Loading />;
      const { imageUrls, name, name_native, price_native, description, isInStock, category, availableColors, specification, keyFeatures, price, weight, stock, offer, currency, offerPrice, isFlashDeals } = data?.data as TProduct;

      const handleAddtoCart = (payload: TProduct) => {
            dispatch(addToCart(payload))
      }

      const handleDecreaseQuantity = (id: TProduct) => {
            dispatch(decreaseQuantity(id))
      }

      return (
            <div>
                  <ScrollToTop />
                  <div className="flex flex-col lg:flex-row items-center gap-6  lg:p-8">
                        <div className="w-full lg:w-1/2 relative flex justify-center items-center  rounded-md">
                              <img className=" h-[460px]" src={imageUrls} alt="" />
                              {!isInStock && <span className=" absolute top-10 right-0 p-2 bg-brandSelect text-white rounded-sm">Out of Stock</span>}
                              {isFlashDeals && <OfferStiker offer={offer as number} />}

                        </div>
                        <div className="w-full lg:w-1/2 space-y-6 bg-white rounded-md  p-8">
                              <h1 dir="auto" className="text-2xl font-semibold text-brandTextPrimary">{language == 'en' ? name : name_native}</h1>
                              <div className="flex justify-between items-center flex-wrap gap-4 lg:gap-0">
                                    <h3 className="bg-brandPrimary flex items-center gap-2 w-fit px-2 lg:px-4 py-2 rounded-full text-xs lg:text-sm font-bold"><FaStar className="text-yellow-500" />{reviews?.data.length} Ratings</h3>
                                    <h3 className="bg-brandPrimary flex items-center gap-2 w-fit px-2 lg:px-4 py-2 rounded-full text-xs lg:text-sm ">({reviews?.data.length})+ Reviews</h3>
                                    <h3 className="bg-brandPrimary flex items-center gap-2 w-fit px-2 lg:px-4 py-2 rounded-full text-xs lg:text-sm ">({reviews?.data.length})+ Sold</h3>
                                    <h3 className="bg-brandPrimary flex items-center gap-2 w-fit px-2 lg:px-4 py-2 rounded-full text-xs lg:text-sm ">Category: {category?.name}</h3>
                              </div>
                              <hr />
                              <div className="flex justify-between items-center">

                                    {
                                          isFlashDeals ?
                                                <div className="flex justify-center gap-1 pt-1">
                                                      <sup dir="auto" className="text-brandTextSecondary text-sm line-through">{price} {currency}</sup>
                                                      <h3 dir="auto" className="text-brandSelect text-2xl font-bold">{offerPrice} {currency}</h3>
                                                </div> :
                                                <h2 className="font-bold text-2xl text-brandTextTertiary">Price: {language == 'en' ? price : price_native} {currency}</h2>
                                    }
                                    <h2><span className="text-brandTextTertiary">Weight:</span> {weight} gm</h2>
                              </div>
                              <hr />
                              {/* color section */}
                              <div>
                                    <h2><span className="text-gray-500">Available colors:</span></h2>
                                    <div className="flex items-center gap-2 mt-4">
                                          {availableColors?.map((color, index) => (
                                                <button
                                                      key={index}
                                                      className={`w-8 h-8 rounded-sm `}
                                                      style={{ backgroundColor: color }}
                                                      title={`Color: ${color}`}
                                                />
                                          ))}
                                    </div>
                              </div>

                              <div className="flex items-center justify-between">
                                    <h3 className="text-gray-500">Quantity: <span className="text-brandTextPrimary font-bold">{stock}</span></h3>
                                    <h3 className="text-gray-500">Stock Status: <span className={`${isInStock ? "text-green-600" : "text-red-700"}`}>{isInStock ? "In Stock" : "Out of Stock"}</span></h3>
                              </div>
                              <hr />

                              <div className="flex items-center justify-between gap-5">
                                    <button title="Bookmark" className="border p-2 rounded-full hover:bg-brandTextPrimary  hover:text-white transition-colors duration-500"><Heart /></button>

                                    {stock !== 0 ?
                                          <Link to="/check-out" state={[{ ...data?.data, quantity: 1 }]}> <button className="border cursor-pointer  px-8 py-2 rounded-full bg-brandTextPrimary hover:bg-brandTextPrimary/60 text-white hover:text-brandSecondary  transition-colors duration-500 w-full">Buy Now</button></Link>
                                          :
                                          <p className="border  px-8 py-2 rounded-full bg-brandSelect  text-white hover:text-brandSecondary  transition-colors duration-500">Out of Stock</p>}

                                    <button onClick={() => handleAddtoCart(data?.data)} title="Add to Cart" className="border p-2 rounded-full  hover:bg-brandTextPrimary  hover:text-white transition-colors duration-500"><ShoppingCart /></button>

                              </div>
                        </div>
                  </div>
                  {/* description */}
                  <div className="mt-8 lg:mt-0">
                        <div className="text-[#888] text-justify">
                              <span className="italic text-brandTextSecondary font-bold">Descriptions,</span> <br />
                              <h3 dir="auto" className="text-black font-bold  my-2">{name}</h3>
                              {description}
                        </div>
                        <div>
                              <h2 className="text-black font-bold mt-4 mb-2">Key Features</h2>
                              {
                                    keyFeatures?.map((ft, indx) => <p key={indx} className="text-gray-500">-{ft}</p>)
                              }
                        </div>
                        <div>
                              <h2 className="text-black font-bold mt-4 mb-2">Specification</h2>
                              <div>
                                    {Object.entries(specification).map(([key, value], idx) => <p key={idx} className="text-gray-500"><span className="font-bold text-brandTextPrimary">{key}:</span> {value}</p>)}
                              </div>

                        </div>


                  </div>


                  <hr className="mt-10" />
                  <div className="flex flex-col md:flex-row justify-between gap-10 mt-10">
                        <div className="h-[500px] overflow-y-auto scroll-smooth w-full md:w-auto lg:w-full">
                              <h1>Reviews & Retings</h1>

                              {
                                    reviews?.data.map((review: TBookReview, idx: number) =>
                                          <div key={idx} className="flex items-center gap-5 border-b py-2 mb-4">
                                                <div>
                                                      <Avatar>
                                                            <AvatarImage src={review.reviewerPhoto} alt="@shadcn" />
                                                            <AvatarFallback>{review.reviewerName[0].toLocaleUpperCase()}</AvatarFallback>
                                                      </Avatar>
                                                </div>
                                                <div className="space-y-1">
                                                      <Rating
                                                            style={{ maxWidth: 100 }}
                                                            value={review.rating}
                                                            readOnly
                                                      />
                                                      <h3 className="font-semibold text-brandTextPrimary italic">{review.empression}</h3>
                                                      <h3 className="text-sm text-gray-500"><span className="text-brandTextSecondary italic">Reviewer-</span> {review.reviewerName}</h3>
                                                      <p className="text-gray-500 italic">"{review.feedBack} "</p>
                                                </div>

                                          </div>)
                              }

                        </div>
                        <form onSubmit={handleSubmit(handelSubmitReview)} className="w-full md:w-1/2 lg:w-1/3 border h-fit p-4">
                              <h1 className="tracking-[4px] text-brandTextTertiary font-semibold text-xl text-center">GIVE YOUR REVIEW</h1>

                              <div className="mt-10 mb-4">
                                    <Rating style={{ maxWidth: 200, width: "100%" }} value={rating} onChange={setRating} />
                                    <div>
                                          <div className="text-sm text-brandTextTertiary">{`Selected: ${getRating(rating)}`}</div>
                                    </div>
                              </div>
                              <Textarea {...register("feedBack")} placeholder="Your Custom Feed Back" />
                              <div className="w-full mt-10 flex justify-center items-center"><CustomButton btnText="Submit Review" /></div>
                        </form>
                  </div>


                  <div>
                        <h1 className="text-2xl font-semibold text-brandTextPrimary my-4">Related Products</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-8">
                              {relatedProducts?.data?.data?.slice(0, 20)?.map((product: TProduct) => (
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
                                                                  <sup dir="auto" className="text-brandTextSecondary text-sm line-through">{product.price} {product?.currency}</sup>
                                                                  <h3 dir="auto" className="text-brandSelect font-bold">{product?.offerPrice} {product?.currency}</h3>
                                                            </div> :
                                                            <h3 dir="auto" className="text-brandSelect font-bold">{product.price} {product?.currency}</h3>
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
                                                product?.isFlashDeals && <OfferStiker offer={product?.offer as number} />
                                          }
                                    </div>
                              ))}
                        </div>

                  </div>
            </div>
      );
};

export default ProductDetails;
