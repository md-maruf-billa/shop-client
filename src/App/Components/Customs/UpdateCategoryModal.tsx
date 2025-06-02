/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateCategoryMutation } from "@/App/Redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TCategory } from "@/Types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UpdateCategoryFormValues = {
    name: string;
    name_ar: string;
    imageUrls: File;
    isTop: string;
};

export function UpdateCategoryModal({ category }: { category: TCategory }) {
    const [updateCategory] = useUpdateCategoryMutation();
    const [previewImage, setPreviewImage] = useState<string>(category?.categoryLogo || "");
    const [openModal, setOpenModal] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<UpdateCategoryFormValues>({
        defaultValues: {
            name: category?.name || "",
            name_ar: category?.name_ar || "",
            isTop: category?.isTop ? "true" : "false",
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setValue("imageUrls", file as File);
        }
    };

    const handleUpdateCategory = async (data: UpdateCategoryFormValues) => {
        const id = toast.loading("Updating...");

        const formData = new FormData();
        const payload = {
            name: data.name,
            name_ar: data.name_ar,
            isTop: data.isTop === "true",
        };

        if (data.imageUrls) {
            formData.append("image", data.imageUrls);
        }

        formData.append("data", JSON.stringify(payload));

        try {
            const res: any = await updateCategory({ id: category?._id, payload: formData });

            if (res?.data?.success) {
                toast.success(res?.data?.message || "Update successful", { id });
                setOpenModal(false);
            } else {
                toast.error(res?.data?.message || "Update failed", { id });
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong", { id });
        }
    };

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Edit Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleUpdateCategory)} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" {...register("name", { required: "Name is required" })} />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name_ar">Name (Native)</Label>
                        <Input id="name_ar" {...register("name_ar", { required: "Native name is required" })} />
                        {errors.name_ar && <span className="text-red-500 text-sm">{errors.name_ar.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Show in Top</Label>
                        <Select
                            onValueChange={(value) => setValue("isTop", value)}
                            defaultValue={watch("isTop")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">Default</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Current Image</Label>
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover mt-2 border rounded"
                                />
                            )}
                        </div>

                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full p-4 text-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer"
                        >
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 19.5A4.5 4.5 0 015.34 10.72a5.25 5.25 0 0110.22-2.33 3 3 0 013.76 3.85A3.75 3.75 0 0118 19.5H6.75z" />
                            </svg>
                            <span className="text-sm mt-2">Upload a new photo</span>
                            <input
                                id="dropzone-file"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
