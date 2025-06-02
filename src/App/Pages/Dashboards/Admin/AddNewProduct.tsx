
import { Button } from "@/components/ui/button";
import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
      FieldValues,
      SubmitHandler,
      useFieldArray,
      useForm,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useCreateNewProductMutation, useGetAllCategoryQuery, useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api";
import { TCategory } from "@/Types";

export default function AddNewProduct() {
      //local state and fetched data
      const { data } = useGetAllCategoryQuery(undefined)
      const { data: webData } = useGetWebInfoQuery(undefined)
      const [createProduct] = useCreateNewProductMutation()

      const form = useForm({
            defaultValues: {
                  name: "",
                  description: "",
                  price: "",
                  category: "",
                  stock: "",
                  weight: "",
                  availableColors: [{ value: "" }],
                  keyFeatures: [{ value: "" }],
                  specification: [{ key: "", value: "" }],
                  photo: "",
                  name_native: "",
                  currency: webData?.data?.webInfo?.webInfo?.curr
            },
      });

      const {
            formState: { isSubmitting },
      } = form;

      const { append: appendColor, fields: colorFields } = useFieldArray({
            control: form.control,
            name: "availableColors",
      });

      const addColor = () => {
            appendColor({ value: "" });
      };

      const { append: appendFeatures, fields: featureFields } = useFieldArray({
            control: form.control,
            name: "keyFeatures",
      });

      const addFeatures = () => {
            appendFeatures({ value: "" });
      };

      const { append: appendSpec, fields: specFields } = useFieldArray({
            control: form.control,
            name: "specification",
      });

      const addSpec = () => {
            appendSpec({ key: "", value: "" });
      };

      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
            const availableColors = data.availableColors.map(
                  (color: { value: string }) => color.value
            );

            const keyFeatures = data.keyFeatures.map(
                  (feature: { value: string }) => feature.value
            );

            const specification: { [key: string]: string } = {};
            data.specification.forEach(
                  (item: { key: string; value: string }) =>
                        (specification[item.key] = item.value)
            );

            // console.log({ availableColors, keyFeatures, specification });
            const image = data?.photo
            const modifiedData = {
                  ...data,
                  availableColors,
                  keyFeatures,
                  specification,
                  price: parseFloat(data.price),
                  stock: parseInt(data.stock),
            };
            const formData = new FormData();
            formData.append("data", JSON.stringify(modifiedData));
            formData.append("image", image);


            // send data in database
            try {
                  const res = await createProduct(formData)
                  console.log(res)
                  if (res?.data?.success) {
                        toast.success("Product created successfull")
                        form.reset()
                  } else {
                        toast.error("Please check all field again!!")
                  }
            } catch (err) {
                  toast.error(JSON.stringify(err))
            }


      };

      return (
            <div className="flex justify-center items-center">
                  <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 ">
                        <div className="flex items-center mb-5 justify-center">
                              <h1 className="text-2xl font-bold text-brandTextPrimary ">Add Product</h1>
                        </div>
                        <Form {...form} >
                              <form onSubmit={form.handleSubmit(onSubmit)} >
                                    <div className="flex justify-between items-center border-t border-b py-3 my-5">
                                          <p className="text-primary font-bold text-xl">Basic Information</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                          <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Product Name</FormLabel>
                                                            <FormControl>
                                                                  <Input {...field} value={field.value || ""} />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />

                                          <div className="flex justify-between items-center gap-5">
                                                <FormField
                                                      control={form.control}
                                                      name="price"
                                                      render={({ field }) => (
                                                            <FormItem>
                                                                  <FormLabel>Price</FormLabel>
                                                                  <FormControl>
                                                                        <Input {...field} value={field.value || ""} />
                                                                  </FormControl>
                                                                  <FormMessage />
                                                            </FormItem>
                                                      )}
                                                />
                                          </div>
                                          {/* Native */}
                                          <FormField
                                                control={form.control}
                                                name="name_native"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Product Name (Native)</FormLabel>
                                                            <FormControl>
                                                                  <Input {...field} value={field.value || ""} dir="rtl" />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />

                                          <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Category</FormLabel>
                                                            <Select
                                                                  onValueChange={field.onChange}
                                                                  defaultValue={field.value}

                                                            >
                                                                  <FormControl>
                                                                        <SelectTrigger>
                                                                              <SelectValue placeholder="Select Product Category" />
                                                                        </SelectTrigger>
                                                                  </FormControl>
                                                                  <SelectContent>
                                                                        {data?.data?.map((category: TCategory) => (
                                                                              <SelectItem key={category?._id} value={category?._id}>
                                                                                    {category?.name} ( {category?.name_ar} )
                                                                              </SelectItem>
                                                                        ))}
                                                                  </SelectContent>
                                                            </Select>

                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />

                                          <FormField
                                                control={form.control}
                                                name="stock"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Stock</FormLabel>
                                                            <FormControl>
                                                                  <Input {...field} value={field.value || ""} />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          <FormField
                                                control={form.control}
                                                name="weight"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Weight</FormLabel>
                                                            <FormControl>
                                                                  <Input {...field} value={field.value || ""} />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                          <FormField
                                                control={form.control}
                                                name="photo"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Product Image</FormLabel>
                                                            <FormControl>
                                                                  <Input
                                                                        type="file"
                                                                        onChange={(e) => {
                                                                              const file = e.target.files ? e.target.files[0] : null;
                                                                              if (file) {
                                                                                    field.onChange(file); // Update react-hook-form field
                                                                              }
                                                                        }}
                                                                  />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                    </div>

                                    <div className="my-5">
                                          <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                      <FormItem>
                                                            <FormLabel>Description</FormLabel>
                                                            <FormControl>
                                                                  <Textarea
                                                                        className="h-36 resize-none"
                                                                        {...field}
                                                                        value={field.value || ""}

                                                                  />
                                                            </FormControl>
                                                            <FormMessage />
                                                      </FormItem>
                                                )}
                                          />
                                    </div>

                                    <div>
                                          <div className="flex justify-between items-center border-t border-b py-3 my-5">
                                                <p className="text-primary font-bold text-xl">Available Colors</p>
                                                <Button
                                                      variant="outline"
                                                      className="size-10"
                                                      onClick={addColor}
                                                      type="button"
                                                >
                                                      <Plus className="text-primary" />
                                                </Button>
                                          </div>

                                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {colorFields.map((colorField, index) => (
                                                      <div key={colorField.id}>
                                                            <FormField
                                                                  control={form.control}
                                                                  name={`availableColors.${index}.value`}
                                                                  render={({ field }) => (
                                                                        <FormItem>
                                                                              <FormLabel>Color {index + 1}</FormLabel>
                                                                              <FormControl>
                                                                                    <Input {...field} value={field.value || ""} type="color" />
                                                                              </FormControl>
                                                                              <FormMessage />
                                                                        </FormItem>
                                                                  )}
                                                            />
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    <div>
                                          <div className="flex justify-between items-center border-t border-b py-3 my-5">
                                                <p className="text-primary font-bold text-xl">Key Features</p>
                                                <Button
                                                      onClick={addFeatures}
                                                      variant="outline"
                                                      className="size-10"
                                                      type="button"
                                                >
                                                      <Plus className="text-primary" />
                                                </Button>
                                          </div>

                                          <div className="my-5">
                                                {featureFields.map((featureField, index) => (
                                                      <div key={featureField.id}>
                                                            <FormField
                                                                  control={form.control}
                                                                  name={`keyFeatures.${index}.value`}
                                                                  render={({ field }) => (
                                                                        <FormItem>
                                                                              <FormLabel>Key Feature {index + 1}</FormLabel>
                                                                              <FormControl>
                                                                                    <Input {...field} value={field.value || ""} />
                                                                              </FormControl>
                                                                              <FormMessage />
                                                                        </FormItem>
                                                                  )}
                                                            />
                                                      </div>
                                                ))}
                                          </div>
                                    </div>

                                    <div>
                                          <div className="flex justify-between items-center border-t border-b py-3 my-5">
                                                <p className="text-primary font-bold text-xl">Specification</p>
                                                <Button
                                                      onClick={addSpec}
                                                      variant="outline"
                                                      className="size-10"
                                                      type="button"
                                                >
                                                      <Plus className="text-primary" />
                                                </Button>
                                          </div>

                                          {specFields.map((specField, index) => (
                                                <div
                                                      key={specField.id}
                                                      className="grid grid-cols-1 gap-4 md:grid-cols-2 my-5"
                                                >
                                                      <FormField
                                                            control={form.control}
                                                            name={`specification.${index}.key`}
                                                            render={({ field }) => (
                                                                  <FormItem>
                                                                        <FormLabel>Feature name {index + 1}</FormLabel>
                                                                        <FormControl>
                                                                              <Input {...field} value={field.value || ""} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                  </FormItem>
                                                            )}
                                                      />
                                                      <FormField
                                                            control={form.control}
                                                            name={`specification.${index}.value`}
                                                            render={({ field }) => (
                                                                  <FormItem>
                                                                        <FormLabel>Feature Description {index + 1}</FormLabel>
                                                                        <FormControl>
                                                                              <Input {...field} value={field.value || ""} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                  </FormItem>
                                                            )}
                                                      />
                                                </div>
                                          ))}
                                    </div>

                                    <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
                                          {isSubmitting ? "Adding Product....." : "Add Product"}
                                    </Button>
                              </form>
                        </Form>
                  </div>
            </div>
      );
}