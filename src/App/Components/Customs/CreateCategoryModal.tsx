import { TSection } from "@/App/Pages/Views/Home/DaynamicSection"
import { useCreateCategoryMutation, useGetExtraSectionQuery } from "@/App/Redux/features/admin/admin.api"
import { Button } from "@/components/ui/button"
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export function CreateCategory() {
      const [modalOpen, setModalOpen] = useState<boolean>(false)
      const [createCategory] = useCreateCategoryMutation()
      const { data } = useGetExtraSectionQuery(undefined)
      const {
            register,
            handleSubmit,
            control,
            reset,
            formState: { errors },
      } = useForm()

      const handleCreateCategory: SubmitHandler<FieldValues> = async (data) => {
            console.log(data)
            const id = toast.loading("Creating......")
            const formData = new FormData()
            const img = data?.image[0]
            formData.append("image", img)
            formData.append("data", JSON.stringify({ name: data?.name, name_ar: data?.nameAr, sectionId: data?.sectionId }))

            const res = await createCategory(formData)
            if (res.data?.success) {
                  toast.success(res?.data?.message, { id })
                  setModalOpen(false)
                  reset()
            } else {
                  toast.error("Something went wrong", { id })
            }
      }

      return (
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                        <Button>Create Category</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                              <DialogTitle className="text-xl font-bold text-center text-brandTextPrimary">Create New Category</DialogTitle>
                              <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(handleCreateCategory)} className="grid gap-4 py-4">
                              <div className="space-y-2">
                                    <Label htmlFor="name">Category Name</Label>
                                    <Input
                                          {...register("name", { required: "Category name is required" })}
                                          id="name"
                                          placeholder="Ex: Electronic"
                                          className="col-span-3"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
                              </div>

                              <div className="space-y-2">
                                    <Label htmlFor="name-ar">Category Name (Native)</Label>
                                    <Input
                                          dir="rtl"
                                          {...register("nameAr", { required: "Category name (Native) is required" })}
                                          id="name-ar"
                                          placeholder="مثال: إلكترونيات"
                                          className="col-span-3"
                                    />
                                    {errors.nameAr && <p className="text-red-500 text-sm">{errors.nameAr.message as string}</p>}
                              </div>
                              <div className="space-y-2">
                                    <Label htmlFor="name-ar">Section For Category</Label>
                                    <Controller
                                          control={control}
                                          name="sectionId"
                                          render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                      <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Section" />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                            <SelectGroup>
                                                                  {data?.data?.map((section: TSection) => (
                                                                        <SelectItem key={section._id} value={section._id}>
                                                                              {section.name}
                                                                        </SelectItem>
                                                                  ))}
                                                            </SelectGroup>
                                                      </SelectContent>
                                                </Select>
                                          )}
                                    />
                              </div>

                              <div className="space-y-2">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-4 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500 dark:text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                          </svg>
                                          <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200 text-sm">Product photo</h2>
                                          <input {...register("image", { required: "Product image is required" })} id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                    {errors.image && <p className="text-red-500 text-sm text-center">{errors.image.message as string}</p>}
                              </div>

                              <DialogFooter>
                                    <Button type="submit">Create Now</Button>
                              </DialogFooter>
                        </form>
                  </DialogContent>
            </Dialog>
      )
}
