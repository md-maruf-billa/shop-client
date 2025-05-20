/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateNewBannerMutation, useDeleteBannerMutation, useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api";
import { useGetAllProductQuery } from "@/App/Redux/features/product/product.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Swal from "sweetalert2";

const NewBanner = () => {
      const [productId, setProductId] = useState<string>()
      const { data, refetch } = useGetWebInfoQuery(undefined)
      const { data: productData } = useGetAllProductQuery(undefined)
      const productInfo = (productData?.data?.data)
      const web = data?.data?.banner
      const [createBanner] = useCreateNewBannerMutation();
      const [deleteBanner] = useDeleteBannerMutation();
      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm();


      const createNewBanner: SubmitHandler<FieldValues> = async (data) => {
            const formData = new FormData();
            const toastId = toast.loading("Banner Creating...");

            // Get the file from FileList
            const image = data.bannerImage?.[0];

            if (!image) {
                  toast.error("Banner image is required", { id: toastId });
                  return;
            }

            const modifiedData = {
                  ...data,
                  photoUrl: null,
                  productLink: productId
            };

            formData.append("image", image);
            formData.append("data", JSON.stringify(modifiedData));

            try {
                  const res = await createBanner(formData);
                  if (res?.data?.success) {
                        toast.success("Banner created successfully!", { id: toastId });
                        await refetch()
                  }
            } catch (err) {
                  toast.error("Something went wrong!", { id: toastId });
            }
      };
      const handleBannerDelete = async (id: string) => {
            Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {  // Mark this as async to use await
                  if (result.isConfirmed) {
                        const res = await deleteBanner(id);  // Await here works now
                        if (res?.data?.success) {
                              Swal.fire({
                                    title: "Deleted!",
                                    text: "Banner has been deleted.",
                                    icon: "success"
                              });
                        } else {
                              toast.error("Something went wrong !!");
                        }
                  }
            });
      }

      return (
            <Card className="w-1/2">
                  <CardHeader>
                        <CardTitle className="text-center">Create New Banner</CardTitle>
                  </CardHeader>
                  <CardContent>
                        <form onSubmit={handleSubmit(createNewBanner)}>
                              <div className="grid w-full items-center gap-4">
                                    {/* Banner Title */}
                                    <div className="flex flex-col space-y-1.5">
                                          <Label htmlFor="name">Banner Title</Label>
                                          <Input
                                                {...register("title", { required: "Title is required" })}
                                                id="name"
                                                placeholder="Ex: New offer or anything..."
                                          />
                                          {errors.title?.message && (
                                                <span className="text-red-500 text-sm">{String(errors.title.message)}</span>
                                          )}
                                    </div>

                                    {/* Banner Description */}
                                    <div className="flex flex-col space-y-1.5">
                                          <Label htmlFor="disc">Description</Label>
                                          <Input
                                                {...register("description", { required: "Description is required" })}
                                                id="disc"
                                                placeholder="Ex: New offer or anything..."
                                          />
                                          {errors.description?.message && (
                                                <span className="text-red-500 text-sm">{String(errors.description.message)}</span>
                                          )}
                                    </div>
                                    {/* Banner Description */}
                                    <div className="flex flex-col space-y-1.5">
                                          <Select onValueChange={value => setProductId(value)}>
                                                <SelectTrigger className="w-full">
                                                      <SelectValue placeholder="Select a Product" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                      <SelectGroup>
                                                            <SelectLabel>Select Product Name</SelectLabel>
                                                            {
                                                                  productInfo?.map((pd: any) => <SelectItem value={pd?._id} key={pd?._id}>{pd?.name}</SelectItem>)
                                                            }
                                                      </SelectGroup>
                                                </SelectContent>
                                          </Select>
                                    </div>
                              </div>

                              {/* Banner Image Upload */}
                              <div className="flex flex-col space-y-1.5 mt-4">
                                    <Label htmlFor="bannerIMG">Banner Image</Label>
                                    <div className="w-1/3">
                                          <label
                                                htmlFor="bannerIMG"
                                                className="flex flex-col items-center w-full max-w-lg p-4 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
                                          >
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth="1.5"
                                                      stroke="currentColor"
                                                      className="w-8 h-8 text-gray-500 dark:text-gray-400"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                      />
                                                </svg>
                                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200 text-sm">
                                                      Upload banner
                                                </h2>
                                                <input
                                                      {...register("bannerImage", { required: "Banner image is required" })}
                                                      id="bannerIMG"
                                                      type="file"
                                                      className="hidden"
                                                />
                                          </label>
                                          {errors.bannerImage?.message && (
                                                <span className="text-red-500 text-sm">{String(errors.bannerImage.message)}</span>
                                          )}
                                    </div>
                              </div>

                              {/* Submit Button */}
                              <div className="flex justify-end mt-4">
                                    <Button type="submit" className="bg-brandTextPrimary">
                                          Create Now
                                    </Button>
                              </div>
                        </form>

                        <hr className="mt-4" />
                        <div>
                              <h2 className="text-xl font-semibold my-4 text-center">Active Banner's</h2>
                              <div className="h-[300px] overflow-y-scroll">
                                    {
                                          web?.map((ban: any, idx: number) =>
                                                <div key={idx} className="flex w-full overflow-x-scroll justify-between bg-white rounded-lg shadow-lg dark:bg-gray-800 mt-2 items-center gap-5">
                                                      <div className="w-20">
                                                            <img src={ban?.photoUrl} alt="" />
                                                      </div>
                                                      <div>
                                                            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{ban?.title}</h1>
                                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{ban?.description}</p>
                                                      </div>
                                                      <Button onClick={() => handleBannerDelete(ban?._id)}>Delete</Button>

                                                </div>
                                          )
                                    }
                              </div>
                        </div>
                  </CardContent>
            </Card>
      );
};

export default NewBanner;
