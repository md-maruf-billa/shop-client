import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TResponse } from '@/Types';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '../Redux/hook';
import { selectToken, setUser } from '../Redux/features/user/user.slice';
import { useUpdatePasswordMutation } from '../Redux/features/user/user.api';


import {
      Popover,
      PopoverContent,
      PopoverTrigger,
} from "@/components/ui/popover"

const UpdatePassword = () => {
      const [updatePassword] = useUpdatePasswordMutation()
      const dispatch = useAppDispatch()
      const token = useAppSelector(selectToken)
      const handleUpdatePassword: SubmitHandler<FieldValues> = async (data) => {
            const toastId = toast.loading("Password updating.......")
            data.preventDefault()
            const oldPassword = data.target.oldPassword.value;
            const newPassword = data.target.oldPassword.value;
            const payload = {
                  oldPassword,
                  newPassword
            }
            const res = await updatePassword(payload) as TResponse;
            if (res.data?.success) {
                  toast.success("Update successfull", { id: toastId })
                  dispatch(setUser({ user: res?.data?.data, token: token }));
            } else {
                  toast.error(res?.error?.data?.message, { id: toastId })
            }
      }

      return (
            <div>
                  <Popover>
                        <PopoverTrigger asChild>
                              <Button className=" bg-brandSelect hover:bg-brandSelect/60 text-white px-6 py-2 rounded-full">
                                    Update Passowrd
                              </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                              <form onSubmit={handleUpdatePassword} className="grid gap-4">
                                    <div className="space-y-2 text-center">
                                          <h4 className="leading-none text-center text-brandTextPrimary text-xl font-semibold">Update Your Pssword</h4>
                                    </div>

                                    <div className="space-y-2">
                                          <Label htmlFor="oldpass">Old Password</Label>
                                          <Input
                                                name="oldPassword"
                                                id="oldpass"
                                                className="col-span-2 h-8"
                                          />
                                    </div>

                                    <div className="space-y-2">
                                          <Label htmlFor="newpass">New Password</Label>
                                          <Input
                                                name="newPassword"
                                                id="newpass"
                                                className="col-span-2 h-8"
                                          />
                                    </div>
                                    <Button type="submit" className=" bg-brandSelect hover:bg-brandSelect/60 text-white px-6 py-2 rounded-full">
                                          Change Now
                                    </Button>

                              </form>
                        </PopoverContent>
                  </Popover>
            </div>
      );
};

export default UpdatePassword;