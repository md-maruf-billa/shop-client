import { CreateCategory } from "@/App/Components/Customs/CreateCategoryModal";
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from "@/App/Redux/features/admin/admin.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table"
import { TCategory } from "@/Types";
import { toast } from "sonner";
import Swal from "sweetalert2";


const ManageCategory = () => {
      const [deleteCategory] = useDeleteCategoryMutation()
      const { data, isLoading } = useGetAllCategoryQuery(undefined)

      const handelDeleteCategory = async (id: string) => {
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
                        const res = await deleteCategory(id)
                        console.log(res)
                        if (res.data?.success) {
                              Swal.fire({
                                    title: "Deleted!",
                                    text: "Category delete successful.",
                                    icon: "success"
                              });
                        } else {
                              if ('data' in (res.error as any)) {
                                    toast.error((res.error as any).data.message);
                              } else {
                                    toast.error("An unexpected error occurred.");
                              }

                        }

                  }
            });


      }


      if (isLoading) return
      return (
            <div>
                  <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-brandTextPrimary">Active Cateygories</h2>
                        <CreateCategory />
                  </div>

                  <div>
                        <Table >
                              <TableHeader>
                                    <TableRow>
                                          <TableHead >Category Image</TableHead>
                                          <TableHead>Name</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {data?.data?.map((category: TCategory) => (
                                          <TableRow key={category?._id}>
                                                <TableCell >
                                                      <Avatar>
                                                            <AvatarImage src={category?.categoryLogo} alt="@shadcn" />
                                                            <AvatarFallback>CN</AvatarFallback>
                                                      </Avatar>
                                                </TableCell>
                                                <TableCell>{category?.name} ({category?.name_ar})</TableCell>
                                                <TableCell><p className="border bg-green-400 w-fit px-2 py-1 rounded-lg">Active</p></TableCell>
                                                <TableCell className="text-right"><Button onClick={() => handelDeleteCategory(category._id)} variant="destructive">Delete</Button></TableCell>

                                          </TableRow>
                                    ))}
                              </TableBody>
                        </Table>
                  </div>

            </div>
      );
};

export default ManageCategory;