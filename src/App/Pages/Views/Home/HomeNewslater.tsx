import CustomButton from "@/App/Components/Customs/CustomButton";
import bar from "@/assets/bar.png"
import featuredbook from "@/assets/images/featuredbook.png"
const HomeNewslater = () => {
      return (

                  <div className="flex flex-col md:flex-row items-center justify-center md:gap-5 lg:gap-28 backround-liner mt-20">
                        <div className="md:w-1/2"><img className="w-full" src={featuredbook} alt="" /></div>

                        <div className="md:w-1/2 space-y-8 p-8">
                              <h1 className="text-brandTextTertiary font-bold text-5xl">Featured book</h1>
                              <div className="space-y-2">
                                    <img className="w-28 h-[0.5px]" src={bar} alt="" />
                                    <p className="text-[#888888]">BY TIMBUR HOOD</p>
                              </div>

                              <div className="space-y-4">
                                    <h1 className="text-brandTextTertiary font-bold text-3xl">Birds gonna be happy</h1>

                                    <p className="text-[#7A7A7A] text-xs">Birds Gonna Be Happy by Timbur Hood is a heartwarming and uplifting story about embracing freedom, joy, and the beauty of life's simple moments. Through the lens of vibrant birdlife.</p>

                                    <h2 className="text-brandSelect font-bold text-2xl">$ 40.00</h2>
                              </div>

                              <CustomButton btnText="VIEW MORE" />
                        </div>
                  </div>
      );
};

export default HomeNewslater;