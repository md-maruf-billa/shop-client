/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import NavEnd from "./Navbar/NavEnd";
import { Link, NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import CustomFavIcon from "./CustomFavIcon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";


const Navbar = ({ web }: { web: any }) => {
      const [sheetOpen, setSheetOpen] = useState(false)
      const { t } = useTranslation();
      return (
            <div className=" flex justify-between items-center py-4 border-b">
                  <div className="hidden md:flex items-center lg:gap-5">
                        {/* nav start */}
                        <Link to="/">
                              <div className='w-10 h-10'>
                                    <img className='w-full h-full' src={web?.webInfo?.logo} alt='' />
                                    <CustomFavIcon faviconUrl={web?.webInfo?.logo} />
                              </div>
                        </Link>

                        {/* Main nav */}
                        <div className="flex justify-center items-center">
                              <div className="flex items-center gap-0">
                                    <Button className='bg-transparent text-[#000000] hover:bg-transparent text-xs lg:text-base border-r md:px-4 lg:px-8 border-[#d1d1d175] rounded-none'>
                                          <NavLink className="" to={"/"}>{t("HOME")}</NavLink>
                                    </Button>
                                    <Button className='bg-transparent text-[#000000] hover:bg-transparent text-xs lg:text-base border-r md:px-4 lg:px-8 border-[#d1d1d175] rounded-none'>
                                          <NavLink to={"/products"}>{t("PRODUCTS")}</NavLink>
                                    </Button>
                                    <Button className='bg-transparent text-[#000000] hover:bg-transparent text-xs lg:text-base border-r md:px-4 lg:px-8 border-[#d1d1d175] rounded-none'>
                                          <NavLink to={"/offered-product"}>{t("BEST PRICE")}</NavLink>
                                    </Button>
                                    <Button className='bg-transparent text-[#000000] hover:bg-transparent text-xs lg:text-base  md:px-4 lg:px-8 border-[#d1d1d175] rounded-none'>
                                          <NavLink to={"/about-us"}>{t("ABOUT US")}</NavLink>
                                    </Button>
                              </div>
                        </div>
                  </div>
                  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild className="block md:hidden">
                              <Menu />
                        </SheetTrigger>
                        <SheetContent side="left">
                              <div className="flex flex-col gap-3">
                                    <Link to="/" className="mb-5">
                                          <div className='w-10 h-10 lg:w-16  lg:h-16'>
                                                <img className='w-full h-full' src={web?.webInfo?.logo} alt='' />
                                                <CustomFavIcon faviconUrl={web?.webInfo?.logo} />
                                          </div>
                                    </Link>
                                    <NavLink onClick={() => setSheetOpen(false)} to={"/"}>{t("HOME")}</NavLink>
                                    <NavLink onClick={() => setSheetOpen(false)} to={"/products"}>{t("PRODUCTS")}</NavLink>
                                    <NavLink onClick={() => setSheetOpen(false)} to={"/offered-product"}>{t("BEST PRICE")}</NavLink>
                                    <NavLink onClick={() => setSheetOpen(false)} to={"/about-us"}>{t("ABOUT US")}</NavLink>
                              </div>
                        </SheetContent>
                  </Sheet>
                  <NavEnd />
            </div>
      );
};

export default Navbar;