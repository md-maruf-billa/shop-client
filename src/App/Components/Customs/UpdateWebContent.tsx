/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetWebInfoQuery, useUpdateWebInfoMutation } from "@/App/Redux/features/admin/admin.api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import NewBanner from "./NewBanner"
import UpdateShippingFee from "./UpdateShippingFee"

export function UpdateWebContent() {
      const { data } = useGetWebInfoQuery(undefined)
      const webData = data?.data?.webInfo
      const [createWeb] = useUpdateWebInfoMutation();

      const { register, handleSubmit } = useForm()
      const handelAddNewBook: SubmitHandler<FieldValues> = async (data) => {
            const formData = new FormData()
            const toastId = toast.loading("Updating.....")
            const image = data?.bookImage[0]
            const modifiedData = {
                  ...data,
                  bookImage: null
            }
            // append all
            formData.append("image", image)
            formData.append("data", JSON.stringify(modifiedData))
            try {
                  const res = await createWeb(formData);
                  if (res?.data?.success) {
                        toast.success("Updated successful", { id: toastId })
                  }
            } catch (err) {
                  console.log(err)
                  toast.error("Something went wrong!!", { id: toastId })
            }
      }


      return (
            <div className=" px-10">
                  <div className="flex justify-between gap-20">
                        <div className="grid gap-4 w-1/2 border p-8 rounded-md">
                              <h1 className="text-2xl text-center font-semibold">Update Basic information</h1>
                              <form onSubmit={handleSubmit(handelAddNewBook)} className="space-y-8">
                                    <div className="flex flex-col md:flex-row items-center gap-4">
                                          <div className="flex items-center w-full gap-2">
                                                <div className="grid w-full  items-center gap-1.5">
                                                      <Label htmlFor="websiteName">Website Name</Label>
                                                      <Input
                                                            {...register("webInfo.name")}
                                                            type="text"
                                                            id="websiteName"
                                                            defaultValue={webData?.webInfo?.name}
                                                      />
                                                </div>
                                                <div className="grid w-full  items-center gap-1.5">
                                                      <Label htmlFor="currency">Website Currency</Label>
                                                      <Input
                                                            {...register("webInfo.curr")}
                                                            type="text"
                                                            id="currency"
                                                            defaultValue={webData?.webInfo?.curr}
                                                      />
                                                </div>

                                          </div>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                          <div className="grid w-full gap-1.5">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                      rows={5}
                                                      {...register("webInfo.des")}
                                                      defaultValue={webData?.webInfo?.des}
                                                      id="description"
                                                />
                                          </div>

                                          <div className="w-1/3">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-4 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                                      </svg>
                                                      <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200 text-sm">Upload Logo</h2>

                                                      <input {...register("bookImage")} id="dropzone-file" type="file" className="hidden" />
                                                </label>
                                          </div>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col md:flex-row items-center gap-2">
                                          <div className="flex items-center w-full gap-2">
                                                <div className="grid w-full  items-center gap-1.5">
                                                      <Label htmlFor="fb">FaceBook Account Link</Label>
                                                      <Input
                                                            {...register("footerNav.fb")}
                                                            type="text"
                                                            id="fb"
                                                            placeholder="Ex: https://www.facebook.com/"
                                                            defaultValue={webData?.footerNav?.fb}
                                                      />
                                                </div>

                                          </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center gap-2">
                                          <div className="flex items-center w-full gap-2">
                                                <div className="grid w-full  items-center gap-1.5">
                                                      <Label htmlFor="ln">TikTok Account Link</Label>
                                                      <Input
                                                            {...register("footerNav.ln")}
                                                            type="text"
                                                            id="ln"
                                                            placeholder="Ex: https://tiktok.com/"
                                                            defaultValue={webData?.footerNav?.ln}
                                                      />
                                                </div>

                                          </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center gap-2">
                                          <div className="flex items-center w-full gap-2">
                                                <div className="grid w-full  items-center gap-1.5">
                                                      <Label htmlFor="x">Instagram Account Link</Label>
                                                      <Input
                                                            {...register("footerNav.x")}
                                                            type="text"
                                                            id="x"
                                                            placeholder="Ex: https://twitter.com"
                                                            defaultValue={webData?.footerNav?.x}
                                                      />
                                                </div>

                                          </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center gap-2">
                                          <div className="flex items-center w-full gap-2">
                                                <div className="grid w-full  items-center gap-1.5">
                                                      <Label htmlFor="yt">YouTub Link</Label>
                                                      <Input
                                                            {...register("footerNav.yt")}
                                                            type="text"
                                                            id="yt"
                                                            placeholder="Ex: https://youtub.com"
                                                            defaultValue={webData?.footerNav?.yt}
                                                      />
                                                </div>

                                          </div>
                                    </div>
                                    <Button type="submit" className="bg-brandTextPrimary">Save changes</Button>
                              </form>
                        </div>
                        <NewBanner />
                  </div>
                  <UpdateShippingFee />

            </div>
      )
}
