import { useGetAllRiderQuery } from "@/App/Redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table"
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { TUser } from "@/Types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoIosOptions } from "react-icons/io";
const ManageRider = () => {
      const { data, isLoading } = useGetAllRiderQuery(undefined)
      if (isLoading) return
      return (
            <div>
                  <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-brandTextPrimary">Your all Rider's</h1>
                        <Link to="create-new-rider"> <Button>Add New Rider</Button></Link>
                  </div>

                  <Table>
                        <TableCaption>A list of your recent riders.</TableCaption>
                        <TableHeader>
                              <TableRow>
                                    <TableHead className="w-[100px]">Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Mobile</TableHead>
                                    <TableHead>Area</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              {data?.data?.map((rider: TUser) => (
                                    <TableRow key={rider._id}>
                                          <TableCell className="font-medium">
                                                <Avatar>
                                                      <AvatarImage src={rider?.profileImage} alt={rider?.name} />
                                                      <AvatarFallback>{rider?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                          </TableCell>
                                          <TableCell>{rider?.name}</TableCell>
                                          <TableCell>{rider?.email}</TableCell>
                                          <TableCell>{rider?.phone}</TableCell>
                                          <TableCell>{rider?.address}</TableCell>
                                          <TableCell>
                                                <DropdownMenu>
                                                      <DropdownMenuTrigger asChild>
                                                            <button className="text-2xl"><IoIosOptions /></button>
                                                      </DropdownMenuTrigger>
                                                      <DropdownMenuContent>
                                                            <DropdownMenuLabel></DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                                                            <DropdownMenuItem><Link state={rider} to={"/admin/rider-report"}>View Report's</Link></DropdownMenuItem>
                                                            <DropdownMenuItem>Block Account</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-500">Delete Account</DropdownMenuItem>
                                                      </DropdownMenuContent>
                                                </DropdownMenu>
                                          </TableCell>
                                    </TableRow>
                              ))}
                        </TableBody>
                  </Table>
            </div>
      );
};

export default ManageRider;