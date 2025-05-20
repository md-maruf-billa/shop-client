import banner1 from "@/assets/images/shop-1.png"
const AboutBanner = () => {
      return (
            <div className="flex flex-col md:flex-row justify-between items-center py-10 gap-10">
                  <div className="md:w-[60%] lg:w-1/2 space-y-3">
                        <h1 className="md:text-3xl lg:text-4xl text-brandTextPrimary font-bold italic"><span className="text-brandSelect">" This Shop</span> 100% Trusted & Authentic Product Store..</h1>
                        <p className="text-brandTextSecondary text-justify">
                              Welcome to our shop, your ultimate destination for high-quality, reliable, and inspiring products. From cutting-edge technology to stylish essentials, we offer a carefully curated selection designed to elevate your lifestyle. Whether you're a tech enthusiast, a trendsetter, or someone looking for practical solutions, Our Shop is your trusted source for authentic and affordable goods. Shop with confidence and discover innovation, quality, and design that will resonate with your unique needs. Explore Our Shop and experience the future today!
                        </p>
                  </div>
                  <div className="md:w-2/5 lg:w-1/2"><img className="w-full" src={banner1} alt="" /></div>
            </div>
      );
};

export default AboutBanner;   