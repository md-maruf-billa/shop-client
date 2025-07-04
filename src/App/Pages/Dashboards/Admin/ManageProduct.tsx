/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/App/Components/Customs/Loading";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TCategory, TProduct } from "@/Types";
import { Avatar } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import { useDeleteBookMutation, useGetAllProductQuery, useUpdateProductFlashStatusMutation, useUpdateProductStatusMutation, useUpdateTopMutation } from "@/App/Redux/features/product/product.api";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2'
import {
      Menubar,
      MenubarContent,
      MenubarItem,
      MenubarMenu,
      MenubarSeparator,
      MenubarTrigger,
} from "@/components/ui/menubar"
import { ListX, PencilRuler, Search, ShieldMinus, ShieldPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "@/App/Redux/features/admin/admin.api";
import { IoIosMove, IoMdAdd } from "react-icons/io";
import { MdOutlinePlaylistRemove } from "react-icons/md";

const ManageBook = () => {
      const [offerFilter, setOfferFilter] = useState<string | undefined>();
      const [deletedFilter, setDeletedFilter] = useState<string | undefined>();
      const [statusFilter, setStatusFilter] = useState<string | undefined>();
      const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
      const [stockFilter, setStockFilter] = useState<string | undefined>();
      const [searchTerm, setSearchTerm] = useState<string>(""); // Stores user input
      const [queryParams, setQueryParams] = useState<{ name: string; value: any }[]>([]);
      const { data, isLoading, isFetching } = useGetAllProductQuery(queryParams);
      const { data: categories } = useGetAllCategoryQuery(undefined)
      const [deleteBook] = useDeleteBookMutation()
      const [updateStatus] = useUpdateProductStatusMutation()
      const [updateTop] = useUpdateTopMutation()
      const [updateFlashStatus] = useUpdateProductFlashStatusMutation()
      const [page, setPage] = useState<number>(1);
      const [limit, setLimit] = useState<number>(20);

      useEffect(() => {
            const newParams: { name: string; value: string | boolean | number | undefined }[] = [];
            if ((categoryFilter ?? "").length > 2) {
                  newParams.push({ name: "category", value: categoryFilter });
            }
            if (offerFilter) {
                  if (offerFilter == '1') {
                        newParams.push({ name: "isFlashDeals", value: true });
                  } else if (offerFilter == "0") {
                        newParams.push({ name: "isFlashDeals", value: false });
                  }
            }
            if (deletedFilter) {
                  if (deletedFilter == '1') {
                        newParams.push({ name: "isDeleted", value: true });
                  } else if (deletedFilter == "0") {
                        newParams.push({ name: "isDeleted", value: false });
                  }
            }
            if (statusFilter) {
                  if (statusFilter == '1') {
                        newParams.push({ name: "isActive", value: true });
                  } else if (statusFilter == "0") {
                        newParams.push({ name: "isActive", value: false });
                  }
            }
            if (stockFilter) {
                  if (stockFilter === '1') {
                        newParams.push({ name: "isInStock", value: true });
                  } else if (stockFilter === "0") {
                        newParams.push({ name: "isInStock", value: false });
                  }
            }
            if (searchTerm.length > 1) {
                  newParams.push({ name: "searchTerm", value: searchTerm })
            }
            newParams.push({ name: "page", value: page });
            newParams.push({ name: "limit", value: limit });
            setQueryParams(newParams);
      }, [categoryFilter, offerFilter, stockFilter, deletedFilter, statusFilter, searchTerm, page, limit]);


      const handleBookDelete = async (id: string) => {
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
                        const res = await deleteBook(id);  // Await here works now
                        if (res?.data?.success) {
                              Swal.fire({
                                    title: "Deleted!",
                                    text: "Product has been deleted.",
                                    icon: "success"
                              });
                        } else {
                              toast.error("Something went wrong !!");
                        }
                  }
            });
      };
      // handle status
      const handleProductStatus = async (id: string, status: boolean) => {
            const toasId = toast.loading("Updating......")
            const payload = { productId: id, status: !status }
            const res = await updateStatus(payload)
            if (res.data) {
                  toast.success("Product status updated.", { id: toasId })
            } else {
                  toast.error("Something went wrong!!", { id: toasId })

            }
      }
      const handleTop = async (id: string, status: boolean) => {
            const toasId = toast.loading("Updating......")
            const payload = { productId: id, status }
            const res = await updateTop(payload)
            if (res.data) {
                  toast.success("Position updated.", { id: toasId })
            } else {
                  toast.error("Something went wrong!!", { id: toasId })

            }
      }
      const handleProductFlashStatus = async (id: string) => {
            const toasId = toast.loading("Updating......")
            const payload = { productId: id, status: false }
            const res = await updateFlashStatus(payload)
            if (res.data) {
                  toast.success("Flash Deals status updated.", { id: toasId })
            } else {
                  toast.error("Something went wrong!!", { id: toasId })

            }
      }

      if (isLoading) return <Loading />;
      return (
            <div>
                  <div className="flex items-center justify-end mb-2">
                        <Link to="add-product"><Button>Add New Product</Button></Link>
                  </div>
                  <div className="flex flex-wrap justify-between items-center bg-green-200 rounded-md px-4">
                        <h1 className="my-8 text-3xl text-brandTextPrimary font-semibold">
                              Product's
                        </h1>
                        <div className="flex items-center gap-3">
                              <Select
                                    onValueChange={value => setOfferFilter(value)}
                              >
                                    <SelectTrigger className="w-[170px]">
                                          <SelectValue placeholder="Filter Flash sale" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Filter using flash sale</SelectLabel>
                                                <SelectItem value="1">Active Flash Sale</SelectItem>
                                                <SelectItem value="0">In Active Flash Sale</SelectItem>
                                                <SelectItem value=" ">All</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>

                              <Select
                                    onValueChange={value => setDeletedFilter(value)}
                              >
                                    <SelectTrigger className="w-[170px]">
                                          <SelectValue placeholder="Filter Deleted" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Filter Deleted product</SelectLabel>
                                                <SelectItem value="1">Deleted</SelectItem>
                                                <SelectItem value="0">Running</SelectItem>
                                                <SelectItem value=" ">All</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>

                              <Select
                                    onValueChange={value => setStatusFilter(value)}
                              >
                                    <SelectTrigger className="w-[150px]">
                                          <SelectValue placeholder="Filter Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Filter using Product status</SelectLabel>
                                                <SelectItem value="1">Active</SelectItem>
                                                <SelectItem value="0">In Active</SelectItem>
                                                <SelectItem value=" ">All</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              <Select
                                    onValueChange={value => setStockFilter(value)}
                              >
                                    <SelectTrigger className="w-[150px]">
                                          <SelectValue placeholder="Filter Stock" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Filter using Product status</SelectLabel>
                                                <SelectItem value="1">In Stock</SelectItem>
                                                <SelectItem value="0">Out of Stock</SelectItem>
                                                <SelectItem value=" ">All</SelectItem>
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              <Select
                                    onValueChange={setCategoryFilter}
                              >
                                    <SelectTrigger className="w-[170px]">
                                          <SelectValue placeholder="Filter Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          <SelectGroup>
                                                <SelectLabel>Filter with Category</SelectLabel>
                                                <SelectItem value=" ">All</SelectItem>
                                                {categories?.data?.map((category: TCategory) => (
                                                      <SelectItem key={category._id} value={category?._id}>
                                                            {category?.name}
                                                      </SelectItem>
                                                ))}
                                          </SelectGroup>
                                    </SelectContent>
                              </Select>
                              <div className="relative max-w-xs w-full  hidden md:block">
                                    <Input
                                          value={searchTerm}
                                          onChange={(e) => setSearchTerm(e.target.value)}
                                          placeholder="Search here"
                                          className="rounded-full bg-brandSecondary"
                                    />
                                    <p className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full ">
                                          <Search />
                                    </p>
                              </div>
                        </div>
                  </div>
                  <div className="w-full">
                        {
                              isFetching ? <Loading /> :
                                    <Table >
                                          <TableHeader>
                                                <TableRow>
                                                      <TableHead className="w-[100px]">Cover</TableHead>
                                                      <TableHead>Name</TableHead>
                                                      <TableHead>Flash Deals</TableHead>
                                                      <TableHead>Product Status</TableHead>
                                                      <TableHead>Category</TableHead>
                                                      <TableHead>Price</TableHead>
                                                      <TableHead>Stock</TableHead>
                                                      <TableHead>Weight</TableHead>
                                                      <TableHead className="text-right">Action</TableHead>
                                                </TableRow>
                                          </TableHeader>
                                          <TableBody className="overflow-hidden">
                                                {data?.data?.data?.map((product: TProduct) => (
                                                      <TableRow key={product._id}>
                                                            <TableCell className="font-medium">
                                                                  <Avatar>
                                                                        <AvatarImage src={product?.imageUrls} alt={product?.name} />
                                                                        <AvatarFallback>{product?.name?.charAt(0)}</AvatarFallback>
                                                                  </Avatar>
                                                            </TableCell>
                                                            <TableCell className="hover:underline hover:text-brandSelect"><Link dir="auto" to={`/product-details/${product?._id}`}>{product?.name}</Link></TableCell>
                                                            <TableCell>
                                                                  <p className={`${product?.isFlashDeals ? "bg-green-500" : "bg-red-500"} w-fit px-2 py-1 rounded-md text-white`}> {product?.isFlashDeals ? "Active" : "In Active"}</p>
                                                            </TableCell>
                                                            <TableCell>
                                                                  <p className={`${product?.isActive ? "bg-green-500" : "bg-red-500"} w-fit px-2 py-1 rounded-md text-white`}>    {product?.isActive ? "Active" : "In Active"}</p>
                                                            </TableCell>
                                                            <TableCell>{product?.category?.name}</TableCell>
                                                            <TableCell>{product?.price} {product?.currency}</TableCell>
                                                            <TableCell ><p className={`${product?.isInStock ? "bg-green-500" : "bg-red-500"} w-fit px-2 py-1 rounded-md text-white`}>{product?.isInStock ? "In stock" : "Out stock"}</p></TableCell>
                                                            <TableCell>{product?.weight} gm</TableCell>
                                                            <TableCell className="flex">
                                                                  <Menubar>
                                                                        <MenubarMenu>
                                                                              <MenubarTrigger >More...</MenubarTrigger>
                                                                              <MenubarContent>
                                                                                    <MenubarItem>
                                                                                          <Link to="update-product"
                                                                                                state={product}
                                                                                                className="flex items-center gap-2">
                                                                                                <PencilRuler />
                                                                                                Update Product
                                                                                          </Link>
                                                                                    </MenubarItem>
                                                                                    <MenubarItem>
                                                                                          {product?.isTop ?
                                                                                                <button
                                                                                                      onClick={() => handleTop(product?._id, false)}
                                                                                                      className="flex items-center gap-2">
                                                                                                      <MdOutlinePlaylistRemove />
                                                                                                      Remove to Top
                                                                                                </button> :
                                                                                                <button
                                                                                                      onClick={() => handleTop(product?._id, true)}
                                                                                                      className="flex items-center gap-2">
                                                                                                      <IoIosMove />
                                                                                                      Move Top
                                                                                                </button>
                                                                                          }
                                                                                    </MenubarItem>
                                                                                    <MenubarItem>
                                                                                          {
                                                                                                product?.isFlashDeals ?

                                                                                                      <button onClick={() => handleProductFlashStatus(product._id)}>
                                                                                                            <span className="flex items-center gap-2"><ListX /> Remove on Flash</span>
                                                                                                      </button> :
                                                                                                      <Link state={product?._id} className="flex items-center gap-2" to="/admin/manage-product/add-flash"><IoMdAdd /> Add On Flash</Link>
                                                                                          }
                                                                                    </MenubarItem>
                                                                                    <MenubarItem>
                                                                                          <button onClick={() => handleProductStatus(product._id, product.isActive)} >
                                                                                                {
                                                                                                      product?.isActive ?
                                                                                                            <span className="flex items-center gap-2"><ShieldMinus />De Active Product</span> :
                                                                                                            <span className="flex items-center gap-2"><ShieldPlus />Active Product</span>
                                                                                                }
                                                                                          </button>
                                                                                    </MenubarItem>
                                                                                    <MenubarSeparator />
                                                                                    <MenubarItem>
                                                                                          <Button onClick={() => handleBookDelete(product?._id)} className="bg-brandSelect text-white px-4 py-2 hover:bg-brandSelect/60 w-full">
                                                                                                Delete
                                                                                          </Button>
                                                                                    </MenubarItem>
                                                                              </MenubarContent>
                                                                        </MenubarMenu>
                                                                  </Menubar>
                                                            </TableCell>
                                                      </TableRow>
                                                ))}

                                          </TableBody>
                                    </Table>
                        }

                  </div>

                  {data?.data?.meta && data?.data?.meta.totalPage > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-10">
                              <button
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 border rounded disabled:opacity-50"
                              >
                                    Previous
                              </button>
                              <span className="text-sm text-gray-600">
                                    Page {data.data.meta.page} of {data.data.meta.totalPage}
                              </span>
                              <button
                                    onClick={() => setPage(prev => Math.min(prev + 1, data.data.meta.totalPage))}
                                    disabled={page === data.data.meta.totalPage}
                                    className="px-4 py-2 border rounded disabled:opacity-50"
                              >
                                    Next
                              </button>

                              <select
                                    value={limit}
                                    onChange={(e) => {
                                          setLimit(Number(e.target.value));
                                          setPage(1);
                                    }}
                                    className="px-3 py-2 border rounded bg-white text-gray-700"
                              >
                                    <option value={10}>10 / page</option>
                                    <option value={20}>20 / page</option>
                                    <option value={50}>50 / page</option>
                                    <option value={100}>100 / page</option>
                              </select>

                        </div>
                  )}
            </div >
      );
};

export default ManageBook;