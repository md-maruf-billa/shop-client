/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel"
import { useGetTopBannerQuery } from "@/App/Redux/features/admin/admin.api";

const HomeTopBanner = () => {
    const { data } = useGetTopBannerQuery(undefined)
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {data?.data?.map((banner: any) => (
                    <CarouselItem className="h-[250px] md:h-[50vh]" key={banner._id}>
                        <div className="w-full h-full">
                            <img
                                className="w-full h-full object-cover"
                                src={banner?.imageURL}
                                alt={banner?.title || "Carousel banner"}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>


        </Carousel>
    );
};

export default HomeTopBanner;