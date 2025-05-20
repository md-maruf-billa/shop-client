import { cn } from "@/lib/utils"
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
import { useUpdatePasswordMutation } from "@/App/Redux/features/user/user.api"
import { toast } from "sonner"
import { useAppDispatch } from "@/App/Redux/hook"
import { setUser } from "@/App/Redux/features/user/user.slice"

export function Password_Update_Form({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const dispatch = useAppDispatch()
  const [upDatePass] = useUpdatePasswordMutation()
  const { handleSubmit, register } = useForm()

  const updatePassword: SubmitHandler<FieldValues> = async (data) => {
    const res = await upDatePass(data)
    if (res?.data) {
      dispatch(setUser({ user: res.data?.data }));
      toast.success(res?.data?.message)
    } else {
      toast.error("Old password not match!!")
    }
  }
  return (
    <div className={cn("w-full flex  flex-col max-w-md gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Update Password</CardTitle>
          <CardDescription>
            Enter a secure password for future login. <br />
            If first time use old pass- 123456
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(updatePassword)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                  id="oldPassword"
                  {...register("oldPassword", { required: true })}
                  type="text"
                  placeholder="******"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  {...register("newPassword", { required: true })}
                  type="text"
                  placeholder="******"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Update
              </Button>

            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
