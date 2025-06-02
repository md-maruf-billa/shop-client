/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useCreateNewTopBannerMutation, useDeleteTopBannerMutation, useGetTopBannerQuery } from "@/App/Redux/features/admin/admin.api"
import { MdDeleteOutline } from "react-icons/md"
import Swal from "sweetalert2"


export default function AddFlatBannerForm() {
    const [createTopBanner] = useCreateNewTopBannerMutation()
    const [deleteTopBanner] = useDeleteTopBannerMutation()
    const { data } = useGetTopBannerQuery(undefined)
    const { register, handleSubmit, watch, setValue, reset } = useForm()
    const [previewImage, setPreviewImage] = React.useState<string>('');
    const selectedImage = watch('imageUrls') as FileList | null;
    React.useEffect(() => {
        if (selectedImage && selectedImage.length > 0) {
            const file = selectedImage[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [selectedImage]);

    const handleUploadBanner: SubmitHandler<FieldValues> = async (data) => {
        const id = toast.loading("Verifying information....")
        if (data?.imageUrls?.length == 0) {
            toast.error("Please select a image !!", { id })
            return
        }
        const formData = new FormData()
        formData.append("data", JSON.stringify({ bannerName: data?.bannerName }))
        formData.append("image", data?.imageUrls[0])
        const res = await createTopBanner(formData)
        if (res?.data?.success) {
            toast.success("Top Banner Created", { id })
            reset()
            setPreviewImage("")
        } else {
            toast.error("Server Error.", { id })
        }
    }
    const handleDeleteBanner = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteTopBanner(id)
                if (res?.data?.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Banner Deleted successful.",
                        icon: "success"
                    });
                } else {
                    toast.error("Internal server error")
                }

            }
        });
    }


    return (
        <div>
            <div className="flex justify-center items-center">
                <Card className="w-[350px]">
                    <CardHeader className="text-center">
                        <CardTitle>Create Banner</CardTitle>
                        <CardDescription>After complete submit this form.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(handleUploadBanner)}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Banner Name</Label>
                                    <Input {...register("bannerName", { required: "Banner name is required" })} required id="name" placeholder="Name of your project" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Image</Label>

                                    <div>
                                        {previewImage ?
                                            <div className="relative">
                                                <img
                                                    src={previewImage}
                                                    alt="preview"
                                                    className="w-full object-cover border border-gray-300 rounded"
                                                />
                                                <span onClick={() => { setPreviewImage(""); setValue("imageUrls", undefined) }} className="absolute -top-5 bg-red-600 w-8 h-8 flex justify-center items-center cursor-pointer text-white -right-5 rounded-full">X</span>
                                            </div> :

                                            <label
                                                htmlFor="dropzone-file"
                                                className="flex flex-col items-center justify-center w-full  p-5 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-20 text-gray-500"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                    />
                                                </svg>

                                                <h2 className="mt-1 font-medium tracking-wide text-gray-700 text-sm">Upload a new photo</h2>
                                                <input {...register('imageUrls')} id="dropzone-file" type="file" className="hidden" />

                                            </label>
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="flex justify-end mt-3">
                                <Button type="submit">Deploy</Button>

                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div>
                <h1 className="bg-gray-500 text-white px-3 py-2 mt-5">Active Top Banners:</h1>
                <div className="grid grid-cols-5 gap-4 mt-8">
                    {
                        data?.data?.map((banner: any) =>

                            <div className="flex justify-between items-center border rounded-md px-2">
                                <div>
                                    <img className="w-20 h-20" src={banner?.imageURL} alt="" />
                                </div>

                                <div className="w-2/3 p-4 md:p-4">
                                    <h1 className="text-xl font-bold text-gray-800 dark:text-white">{banner?.bannerName}</h1>
                                    <div className="flex justify-between mt-3 item-center">
                                        <Button onClick={() => handleDeleteBanner(banner?._id)} variant={"destructive"}>
                                            <MdDeleteOutline />
                                        </Button>
                                    </div>
                                </div>

                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}
