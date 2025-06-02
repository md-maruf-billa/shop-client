import { useGetAllCategoryQuery, useGetExtraSectionQuery } from "@/App/Redux/features/admin/admin.api"
import { useAppSelector } from "@/App/Redux/hook"
import bar from "@/assets/bar.png"
import { TCategory } from "@/Types"
import { Link } from "react-router"

export type TSection = {
    _id: string,
    name: string,
    title: string,
    categoryId?: TCategory[]
}
export default function DaynamicSection() {
    const { data: categories } = useGetAllCategoryQuery(undefined)
    const { data } = useGetExtraSectionQuery(undefined)
    const { language } = useAppSelector(state => state.language)
    const allCategories = categories?.data;
    return (
        <div>
            {
                data?.data?.map((section: TSection) =>
                    <div key={section._id} className="my-20">
                        <div>
                            <p className="flex items-center gap-2 text-brandSelect text-sm"><img src={bar} alt="" /> {section?.title}</p>
                            <h1 className="text-4xl font-semibold text-brandTextPrimary mt-4">{section?.name}</h1>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 lg:gap-8 mt-14">
                            {
                                allCategories?.filter((ct: TCategory) => ct?.sectionId == section?._id).map((card: TCategory) =>
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
                    </div>
                )
            }

        </div>
    )
}
