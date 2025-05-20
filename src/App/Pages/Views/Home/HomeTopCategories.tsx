import { useGetAllCategoryQuery } from "@/App/Redux/features/admin/admin.api";
import { useAppSelector } from "@/App/Redux/hook";
import bar from "@/assets/bar.png"
import { Button } from "@/components/ui/button";
import { TCategory } from "@/Types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const HomeTopCategories = () => {
      const [category, setCategory] = useState<number>(14)
      const { t } = useTranslation()
      const { language } = useAppSelector(state => state.language)
      const { data, isLoading } = useGetAllCategoryQuery(undefined)

      if (isLoading) return
      return (
            <div className="mt-16">

                  <div >
                        <p className="flex items-center gap-2 text-brandSelect text-sm"><img src={bar} alt="" />{t("CATEGORIES")}</p>
                        <h2 className="text-4xl font-semibold text-brandTextPrimary mt-4">{t("Explore our Top Categories")}</h2>
                  </div>


                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 lg:gap-8 mt-14">
                        {
                              data?.data?.slice(0, category)?.map((card: TCategory) =>
                                    <Link to={`/products?category=${card?._id}`} key={card?._id} className="border p-4 rounded-lg hover:border-brandSelect text-brandTextPrimary hover:text-brandSelect cursor-pointer ">
                                          <div className="flex justify-center items-center"><img className="h-[100px] w-fit" src={card?.categoryLogo} alt="" /></div>
                                          <div >
                                                <h2 className="  font-semibold  text-center mt-3" dir="auto">
                                                      {language == "en" ?
                                                            card?.name :
                                                            card?.name_ar
                                                      }
                                                </h2>
                                          </div>
                                    </Link>
                              )
                        }

                  </div>
                  <div className={`flex justify-end items-center mt-10 ${data?.data?.length < category ? "hidden" : "flex"}`}>
                        <Button variant={"outline"} className={`${category > data?.data?.length || data?.data?.length == 0 ? "hidden" : "flex"}`} onClick={() => setCategory(category + 7)}>Show More</Button>
                        <Button variant={"outline"} className={`${category < data?.data?.length || data?.data?.length == 0 ? "hidden" : "flex"}`} onClick={() => setCategory(category - 7)}>Show Less</Button>
                  </div>
            </div>
      );
};

export default HomeTopCategories;