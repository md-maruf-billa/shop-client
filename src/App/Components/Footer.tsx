import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoTiktok } from "react-icons/io5";
import { Link } from "react-router";
const Footer = ({ web }: { web: any }) => {
      const year = new Date().getFullYear();
      return (
            <footer className=" footer-background mt-24 p-8 md:p-20">
                  <div className="grid grid-cols-3 gap-8 md:gap-0">
                        {/* start */}
                        <div className="col-span-3 md:col-span-1 ">
                              <div><img className="h-20 w-20 rounded-full" src={web?.webInfo?.logo} alt="" /></div>
                              <h1 className="text-2xl font-semibold text-brandSelect my-3">{web?.webInfo?.name}</h1>
                              <p className="text-brandTextSecondary">
                                    {web?.webInfo?.des}
                              </p>
                              <div className="flex items-center gap-10 mt-5">
                                    <a href={web?.footerNav?.fb}><FaFacebook className="text-3xl text-brandSelect" /></a>
                                    <a href={web?.footerNav?.ln}> <IoLogoTiktok className="text-3xl text-brandSelect" /></a>
                                    <a href={web?.footerNav?.x}><FaInstagram className="text-3xl text-brandSelect" /></a>
                                    <a href={web?.footerNav?.yt}><IoLogoYoutube className="text-3xl text-brandSelect" /></a>
                              </div>

                        </div>

                        {/* middle */}
                        <div className=" text-center">
                              <h2 className="text-brandSelect md:text-xl font-semibold">LINKS</h2>
                              <div className="space-y-3 text-sm md:text-base mt-4 flex flex-col justify-start">
                                    <Link to="/">Home</Link>
                                    <Link to="/about-us">About</Link>
                                    <Link to="/products">Products</Link>
                              </div>

                        </div>

                        {/* end */}
                        <div className=" text-end col-span-2 md:col-span-1">
                              <h2 className="text-brandSelect md:text-xl font-semibold">LATEST PROJECT</h2>
                        </div>
                  </div>

                  <div className="flex justify-between items-center mt-20">
                        <p>© {year} {web?.webInfo?.name}. All Rights Reserved.</p>
                        <p> Privacy | <Link to="/terms" className="text-brandSelect">Terms of Service</Link></p>
                  </div>
            </footer>
      );
};

export default Footer;