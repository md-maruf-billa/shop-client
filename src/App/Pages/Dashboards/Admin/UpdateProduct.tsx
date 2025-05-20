/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useGetAllCategoryQuery } from '@/App/Redux/features/admin/admin.api';
import { useUpdateBookMutation } from '@/App/Redux/features/product/product.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectLabel,
      SelectTrigger,
      SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

interface ProductFormData {
      name: string;
      name_native: string;
      category: string;
      stock: string;
      price: string;
      price_native: string;
      weight: string;
      description: string;
      imageUrls: FileList | null;
}

const UpdateProduct = () => {
      const location = useLocation();
      const navigate = useNavigate()
      const product = location.state;
      const [updateBook] = useUpdateBookMutation();
      const { data: categories } = useGetAllCategoryQuery(undefined);
      const [previewImage, setPreviewImage] = useState<string>(product?.imageUrls || '');
      const {
            register,
            control,
            handleSubmit,
            reset,
            watch
      } = useForm({
            defaultValues: {
                  name: '',
                  name_native: '',
                  category: '',
                  stock: '',
                  price: '',
                  price_native: '',
                  weight: '',
                  description: '',
                  imageUrls: null
            }
      });

      useEffect(() => {
            if (product) {
                  reset({
                        name: product.name,
                        name_native: product.name_native,
                        category: product.category?._id || '',
                        stock: product.stock,
                        price: product.price,
                        price_native: product.price_native,
                        weight: product.weight,
                        description: product.description,
                        imageUrls: null,
                  });
            }
      }, [product, reset]);

      const handleUpdateProduct = async (data: ProductFormData) => {
            const toastId = toast.loading('Book updating...');
            try {
                  const formData = new FormData();

                  if (data.imageUrls && data.imageUrls.length > 0) {
                        formData.append('image', data.imageUrls[0]);
                  }

                  const payload = {
                        ...data,
                        price: Number(data.price),
                        stock: Number(data.stock),
                        weight: Number(data.weight),
                        imageUrls: '', // placeholder on backend
                        bookId: product?._id
                  };

                  formData.append('data', JSON.stringify(payload));

                  const res = await updateBook(formData);
                  if (res?.data?.success) {
                        toast.success('Product updated successfully!', { id: toastId });
                        navigate("/admin/manage-product")

                  } else {
                        toast.error('Error updating the Product!', { id: toastId });
                  }
            } catch (err: any) {
                  toast.error('Error updating the Product!', { id: toastId });
            }
      };

      const selectedImage = watch('imageUrls') as FileList | null;

      useEffect(() => {
            if (selectedImage && selectedImage.length > 0) {
                  const file = selectedImage[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                        setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
            }
      }, [selectedImage]);

      return (
            <div className="flex justify-center items-center">
                  <div className="max-w-screen-md w-full">
                        <h1 className="text-center text-3xl text-brandTextPrimary">Update Product</h1>
                        <form className="space-y-8 mt-4" onSubmit={handleSubmit(handleUpdateProduct)}>
                              <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input {...register('name')} type="text" id="name" placeholder="Ex: Pride and Prejudice" />
                              </div>
                              <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="name_native">Product Name (Native)</Label>
                                    <Input dir='rtl' {...register('name_native')} type="text" id="name_native" placeholder="Ex: Pride and Prejudice" />
                              </div>

                              <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="category">Product Category</Label>
                                    <Controller
                                          name="category"
                                          control={control}
                                          render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                      <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a category" />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                            <SelectGroup>
                                                                  <SelectLabel>Select Category</SelectLabel>
                                                                  {categories?.data?.map((category: any) => (
                                                                        <SelectItem key={category._id} value={category._id}>
                                                                              {category.name} ({category.name_ar})
                                                                        </SelectItem>
                                                                  ))}
                                                            </SelectGroup>
                                                      </SelectContent>
                                                </Select>
                                          )}
                                    />
                              </div>

                              <div className="flex flex-col md:flex-row gap-4">
                                    <div className="grid w-full gap-1.5">
                                          <Label htmlFor="stock">Stock</Label>
                                          <Input {...register('stock')} type="number" id="stock" placeholder="Ex: 10" />
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                          <Label htmlFor="price">Price</Label>
                                          <Input {...register('price')} type="number" id="price" placeholder="Ex: 25" />
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                          <Label htmlFor="price">Price (Native)</Label>
                                          <Input {...register('price_native')} type="text" id="price" placeholder="Ex: 25" />
                                    </div>
                                    <div className="grid w-full gap-1.5">
                                          <Label htmlFor="weight">Weight (gm)</Label>
                                          <Input {...register('weight')} type="text" id="weight" placeholder="Ex: 30" />
                                    </div>
                              </div>

                              <div className="grid gap-1.5">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea rows={6} {...register('description')} placeholder="Type a short overview..." />
                              </div>

                              <div className="grid grid-cols-2 ">
                                    <div>
                                          <Label>Current Image</Label>
                                          {previewImage && (
                                                <img
                                                      src={previewImage}
                                                      alt="preview"
                                                      className="w-48 h-48 object-cover border border-gray-300 rounded"
                                                />
                                          )}
                                    </div>
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
                                                className="w-6 h-6 text-gray-500"
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
                              </div>

                              <Button type="submit" className="bg-brandSelect hover:bg-brandSelect/60 text-white w-full py-2">
                                    Update Now
                              </Button>
                        </form>
                  </div>
            </div>
      );
};

export default UpdateProduct;
