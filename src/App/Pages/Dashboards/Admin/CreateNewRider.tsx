import { useRegisterMutation } from "@/App/Redux/features/user/user.api"
import { Button } from "@/components/ui/button"
import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const CreateNewRider = () => {
      const navigate = useNavigate()
      const [createRider] = useRegisterMutation()
      const { register, handleSubmit, formState: { errors } } = useForm()

      // create a rider
      const handleCreateRider: SubmitHandler<FieldValues> = async (data) => {
            const modifiedPayload = {
                  ...data,
                  needPasswordChange: true,
                  role: "rider",
            }
            try {
                  const res = await createRider(modifiedPayload).unwrap()
                  if (res?.success) {
                        toast.success("Account create successfull..")
                        navigate("/admin/manage-riders")
                  }
            } catch (error) {
                  toast.error("Rider email already exist..!!")
            }
      }

      return (
            <div className="flex justify-center items-center mt-20">
                  <form onSubmit={handleSubmit(handleCreateRider)}>
                        <Card className="w-[500px]">
                              <CardHeader>
                                    <CardTitle className="text-center text-3xl">Add New Rider </CardTitle>
                                    <CardDescription className="text-center">Please fill the (*) marked input box.</CardDescription>
                              </CardHeader>
                              <CardContent>
                                    <div className="grid w-full items-center gap-4">
                                          <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">Rider Name *</Label>
                                                <Input {...register('name', { required: "Rider name is required" })} id="name" placeholder="Name of your rider" />
                                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
                                          </div>
                                          <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="email">Rider Email *</Label>
                                                <Input {...register('email', {
                                                      required: "Email is required",
                                                      pattern: {
                                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                            message: "Invalid email address"
                                                      }
                                                })} id="email" placeholder="Email of your rider" />
                                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
                                          </div>
                                          <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="phone1">Rider Phone *</Label>
                                                <Input {...register('phone', {
                                                      required: "Phone number is required",
                                                })} id="phone1" placeholder="Phone Number of your rider" />
                                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
                                          </div>
                                          <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="area">Rider Area *</Label>
                                                <Input {...register('address', { required: "Rider area is required" })} id="area" placeholder="Area of your rider" />
                                                {errors.address && <p className="text-red-500 text-sm">{errors.address.message as string}</p>}
                                          </div>
                                          <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="password">Default Password *</Label>
                                                <Input {...register('password', { required: "Password is required" })} id="password" type="password" placeholder="Default password-> 123456" />
                                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
                                          </div>
                                    </div>
                              </CardContent>
                              <CardFooter className="flex justify-end">
                                    <Button type="submit">Add Now</Button>
                              </CardFooter>
                        </Card>
                  </form>
            </div>
      )
}

export default CreateNewRider
