import CustomButton from "@/App/Components/Customs/CustomButton";
import bar from "@/assets/bar.png"
import faq from "@/assets/images/faq.png"
import shop2 from "@/assets/images/shop-2.png"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router";
const AboutDeleverd = () => {
      return (
            <div className="mt-10">
                  <div className="flex flex-col md:flex-row gap-5 justify-between items-center  bg-brandSecondary pb-10 lg:py-0">
                        <div className="md:w-[40%] lg:w-1/2"><img src={shop2} className="w-full" alt="" /></div>
                        <div className="md:w-[60%] lg:w-1/2 px-4 md:px-10">
                              <h1 className="md:text-3xl lg:text-4xl text-brandTextPrimary font-bold italic">Curated Products, Limitless Possibilities – Delivered to You</h1>
                              <p className="text-brandTextSecondary py-5 text-justify">
                                    Discover the world of innovation with our Shop, where quality meets convenience. Our carefully selected range of products, from advanced tech gadgets to stylish everyday essentials, is designed to enhance your life. With fast, reliable delivery straight to your door, shopping with us is effortless. Whether you're upgrading your tech, seeking the latest trends, or finding practical solutions, Our Shop makes it simple to explore and enjoy the best in design and functionality.
                              </p>
                              <Link to="/products" >
                                    <CustomButton btnText="Buy Now" />
                              </Link>
                        </div>
                  </div>

                  {/*  */}

                  <div className="mt-28">
                        <div className="flex flex-col justify-center items-center ">
                              <p className="flex items-center gap-1 text-brandSelect text-sm tracking-[4px]"><img src={bar} alt="" />QUESTIONS</p>
                              <h1 className="text-3xl font-semibold text-brandTextPrimary">Discover More Details</h1>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center mt-16 gap-5">
                              <div className="md:w-[40%] lg:w-1/2">
                                    <img src={faq} alt="" />
                              </div>
                              <Accordion type="single" collapsible className="md:w-[60%] lg:w-1/2">
                                    <AccordionItem value="item-1">
                                          <AccordionTrigger>Why shop with us?</AccordionTrigger>
                                          <AccordionContent>
                                                We offer a seamless shopping experience with high-quality products, competitive pricing, and top-notch customer service. Enjoy fast shipping, exclusive deals, and a hassle-free return policy that makes us your trusted online store.
                                          </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                          <AccordionTrigger>What products do you offer?</AccordionTrigger>
                                          <AccordionContent>
                                                Our store features a wide range of products, including fashion, electronics, home essentials, beauty, and more. Whether you're looking for the latest trends or everyday essentials, we’ve got you covered!
                                          </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                          <AccordionTrigger>Do you offer discounts or promotions?</AccordionTrigger>
                                          <AccordionContent>
                                                Yes! We frequently run special promotions, discounts, and seasonal sales. Subscribe to our newsletter and follow us on social media to stay updated on exclusive offers.
                                          </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-4">
                                          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                                          <AccordionContent>
                                                Shipping times vary based on your location, but we aim to deliver orders within 3-7 business days. Expedited shipping options are available for faster delivery.
                                          </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-5">
                                          <AccordionTrigger>Can I return or exchange an item?</AccordionTrigger>
                                          <AccordionContent>
                                                Absolutely! We offer easy returns and exchanges. If you receive a damaged or incorrect item, simply contact our support team within 7 days for assistance.
                                          </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-6">
                                          <AccordionTrigger>How can I track my order?</AccordionTrigger>
                                          <AccordionContent>
                                                Once your order is shipped, you’ll receive a tracking number via email or SMS. Use it to track your package in real time and stay updated on its delivery status.
                                          </AccordionContent>
                                    </AccordionItem>
                              </Accordion>

                        </div>
                  </div>
            </div>
      );
};

export default AboutDeleverd;