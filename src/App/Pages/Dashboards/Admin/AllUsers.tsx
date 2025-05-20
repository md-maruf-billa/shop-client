import Loading from "@/App/Components/Customs/Loading";
import { useBlockUserMutation, useGetAllUsersQuery } from "@/App/Redux/features/admin/admin.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table"
import { TResponse, TUser } from "@/Types";
import { toast } from "sonner";

const AllUsers = () => {
      const { data, isLoading } = useGetAllUsersQuery(undefined);
      const [changeStatusUser] = useBlockUserMutation();
      if (isLoading) return <Loading />;
      const handleBlockUser = async (email: string, status: "blocked" | "active") => {
            const toastId = toast.loading("Updating status...");
            const payload = {
                  email,
                  accountStatus: status === "active" ? "blocked" : "active"
            }
            const res = await changeStatusUser(payload) as TResponse;
            if (res.data?.success) {
                  toast.success("Update successfull", { id: toastId })
            } else {
                  toast.error(res?.error?.data?.message, { id: toastId })
            }
      }
      return (
            <div>
                  <h1 className="my-8 text-3xl text-brandTextPrimary font-semibold">All User's</h1>
                  <Table>
                        <TableHeader>
                              <TableRow>
                                    <TableHead className="w-[100px]">Photo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                              </TableRow>
                        </TableHeader>
                        <TableBody>
                              {data?.data?.map((user: TUser) => (
                                    <TableRow key={user?._id}>
                                          <TableCell >
                                                <Avatar>
                                                      <AvatarImage src={user?.profileImage} alt="@shadcn" />
                                                      <AvatarFallback>{user?.name[0]?.toLocaleUpperCase()}</AvatarFallback>
                                                </Avatar>

                                          </TableCell>
                                          <TableCell>{user?.name}</TableCell>
                                          <TableCell>{user?.email}</TableCell>
                                          <TableCell>{user?.phone}</TableCell>
                                          <TableCell>{user?.address}</TableCell>
                                          <TableCell className="flex gap-2 w-[300px] justify-end">
                                                <Popover>
                                                      <PopoverTrigger asChild>
                                                            <button className="bg-brandTextPrimary hover:bg-brandTextPrimary/60 text-white px-4 py-2 rounded-full">
                                                                  View Details
                                                            </button>
                                                      </PopoverTrigger>
                                                      <PopoverContent className="w-80">
                                                            <div className="grid gap-4">
                                                                  <div className="flex justify-center items-center">
                                                                        <div className="relative w-full max-w-md  rounded-2xl p-6 text-center">
                                                                              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
                                                                                    <img
                                                                                          src={user?.profileImage}
                                                                                          alt="User Profile"
                                                                                          className="w-full h-full object-cover"
                                                                                    />
                                                                              </div>
                                                                              <div className="mt-12">
                                                                                    <h2 className="text-xl font-semibold text-brandTextPrimary">{user?.name}</h2>
                                                                                    <p className="text-gray-500">{user?.email}</p>
                                                                                    <p className="mt-2 text-sm text-gray-600">
                                                                                          {user?.address}
                                                                                    </p>
                                                                                    <div className="mt-4 flex justify-center gap-6 text-gray-700">
                                                                                          <div className="text-center">
                                                                                                <span className="text-lg font-bold">--</span>
                                                                                                <p className="text-sm">Total Order's</p>
                                                                                          </div>
                                                                                          <div className="text-center">
                                                                                                <span className="text-lg font-bold">--</span>
                                                                                                <p className="text-sm">Recived</p>
                                                                                          </div>
                                                                                          <div className="text-center">
                                                                                                <span className="text-lg font-bold">--</span>
                                                                                                <p className="text-sm">Canceled</p>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>

                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </PopoverContent>
                                                </Popover>

                                                {
                                                      user?.accountStatus == "active" ? <button onClick={() => handleBlockUser(user?.email, user?.accountStatus!)} className=" bg-brandSelect hover:bg-brandSelect/60 text-white px-4 py-2 rounded-full">
                                                            Block Now
                                                      </button> : user?.accountStatus == "blocked" ? <button onClick={() => handleBlockUser(user?.email, user?.accountStatus!)} className=" bg-green-500 hover:bg-green-500/60 text-white px-4 py-2 rounded-full">
                                                            Unblock Now
                                                      </button> : ""
                                                }
                                          </TableCell>
                                    </TableRow>
                              ))}
                        </TableBody>
                  </Table>
            </div>
      );
};

export default AllUsers;