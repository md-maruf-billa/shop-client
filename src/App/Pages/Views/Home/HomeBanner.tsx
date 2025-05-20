/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
      Carousel,
      CarouselContent,
      CarouselItem
} from "@/components/ui/carousel"
import { useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api";

const HomeBanner = () => {
      const { data } = useGetWebInfoQuery(undefined)
      const bannerData = data?.data?.banner
      const plugin = React.useRef(
            Autoplay({ delay: 2000, stopOnInteraction: true })
      )
      const { t } = useTranslation()
      return (
            <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
            >
                  <CarouselContent>
                        {bannerData?.map((banner: any) => (
                              <CarouselItem key={banner._id}>
                                    <div className="hidden  lg:flex flex-col-reverse md:flex-row justify-between items-center rounded-xl mt-4 p-6 lg:p-20 bg-[#7a7a7a0c]">
                                          <div className="text-center md:text-left lg:w-1/2">
                                                <h1 dir="auto" className="text-2xl lg:text-5xl font-bold lg:leading-[64px] text-brandTextPrimary">
                                                      {/* {t("Don't Miss Out on These Unbeatable Black Friday Deals!")} */}
                                                      {banner?.title}
                                                </h1>
                                                <p dir="auto" className="my-4">
                                                      {/* {t("Save big this Black Friday with unbeatable deals on tech, home essentials, fashion, and more! Limited stock.")} */}
                                                      {banner?.description}
                                                </p>
                                                <Link to={`product-details/${banner?.productLink}`}><Button>{t("View Product")}</Button></Link>

                                          </div>
                                          <div className="flex justify-center items-center w-[409px]  lg:h-[457px] overflow-hidden">
                                                <img className="w-full" src={banner?.photoUrl} alt="" />
                                          </div>
                                    </div>


                                    <div
                                          className="md:hidden relative flex justify-center items-center h-[250px] rounded-xl mt-4 bg-[#7a7a7a0c] text-white"
                                          style={{
                                                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url('${banner?.photoUrl}')`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                          }}
                                    >
                                          {/* Content */}
                                          <div className="text-center">
                                                <h1 dir="auto" className="text-2xl font-bold text-white">
                                                      {banner?.title}
                                                </h1>
                                                <Link to={`product-details/${banner?.productLink}`}>
                                                      <Button>{t("View Product")}</Button>
                                                </Link>
                                          </div>
                                    </div>

                              </CarouselItem>
                        ))}
                  </CarouselContent>
            </Carousel>
      );
};

export default HomeBanner;