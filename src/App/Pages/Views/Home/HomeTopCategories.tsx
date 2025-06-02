import { useGetAllCategoryQuery, useGetExtraSectionQuery } from "@/App/Redux/features/admin/admin.api";
import { useAppSelector } from "@/App/Redux/hook";
import bar from "@/assets/bar.png"
import { Button } from "@/components/ui/button";
import { TCategory } from "@/Types";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { TSection } from "./DaynamicSection";

const HomeTopCategories = () => {
      const [category, setCategory] = useState<number>(14)
      const { t } = useTranslation()
      const { language } = useAppSelector(state => state.language)
      const { data: sections } = useGetExtraSectionQuery(undefined)
      const { data, isLoading } = useGetAllCategoryQuery(undefined)

      if (isLoading) return

      const sectionIds = sections?.data?.map((sec: TSection) => sec._id) || [];
      const filteredData = data?.data?.filter((dt: TCategory) => !sectionIds.includes(dt.sectionId));


      return (
            <div className="mt-16">

                  <div >
                        <p className="flex items-center gap-2 text-brandSelect text-sm uppercase"><img src={bar} alt="" />{t("Categories")}</p>
                        <h2 className="text-4xl font-semibold text-brandTextPrimary mt-4">{t("Top Categories")}</h2>
                  </div>


                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 lg:gap-8 mt-14">

                        {
                              filteredData.slice(0, category)
                                    ?.map((card: TCategory) => (
                                          <Link to={`/products?category=${card?._id}`} key={card?._id} className="border p-4 rounded-lg hover:border-brandSelect text-brandTextPrimary hover:text-brandSelect cursor-pointer ">
                                                <div className="flex justify-center items-center"><img className="h-[100px] w-fit" src={card?.categoryLogo} alt="" /></div>
                                                <div >
                                                      <h2 className="font-semibold text-center mt-3" dir="auto">
                                                            {language == "en" ? card?.name : card?.name_ar}
                                                      </h2>
                                                </div>
                                          </Link>
                                    ))
                        }

                  </div>

                  <div className={`flex justify-end items-center mt-10 ${data?.data?.length < category ? "hidden" : "flex"}`}>
                        <Button variant={"outline"} className={`${category > data?.data?.length || data?.data?.length == 0 ? "hidden" : "flex"}`} onClick={() => setCategory(category + 7)}>{t("View more")}</Button>
                        <Button variant={"outline"} className={`${category < data?.data?.length || data?.data?.length == 0 ? "hidden" : "flex"}`} onClick={() => setCategory(category - 7)}>{t("View Less")}</Button>
                  </div>
            </div>
      );
};

export default HomeTopCategories;