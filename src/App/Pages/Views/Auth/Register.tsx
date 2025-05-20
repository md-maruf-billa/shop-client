import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation, useRegisterMutation } from '@/App/Redux/features/user/user.api';
import { TResponse } from '@/Types';
import { toast } from 'sonner';
import { useAppDispatch } from '@/App/Redux/hook';
import { setUser } from '@/App/Redux/features/user/user.slice';

const Register = () => {
      const navigate = useNavigate();
      const [createUser] = useRegisterMutation();
      const [logingUser] = useLoginMutation();
      const dispatch = useAppDispatch()
      const { register, handleSubmit } = useForm();
      const handleRegister: SubmitHandler<FieldValues> = async (data) => {
            const toastId = toast.loading("Creating your account......!")
            const payload = {
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  role: "user"
            }
            const res = await createUser(payload) as TResponse;
            if (res.data?.success) {
                  toast.success("Successfully creted your account.....!! wait we redirecting..", { id: toastId })
                  const logingRes = await logingUser({ email: data.email, password: data.password })
                  dispatch(setUser({ user: logingRes.data?.data?.user, token: logingRes.data?.data?.accessToken as string }));
                  toast.success("Successfully Login.....!", { id: toastId })
                  navigate("/")
            } else {
                  toast.error("Something went wrong!! Please provide valid information", { id: toastId })
            }
      }
      return (
            <div className="register">
                  <div className="border w-[400px] p-8 rounded-lg  backdrop-blur-md bg-brandPrimary/40">
                        {/* <div className="flex justify-center items-center mb-4"><img className='w-1/2' src={logo} alt="" /></div> */}
                        <h1 className="text-3xl text-center font-bold text-brandTextSecondary">WELLCOM & REGISTER </h1>
                        <form onSubmit={handleSubmit(handleRegister)}>

                              <div className="mt-8">
                                    <label htmlFor="name" className="font-semibold tracking-[4px] text-brandTextTertiary">NAME</label>
                                    <input {...register("name")} placeholder='Ex: Done Dou' type="text" id="name" className="w-full border border-brandTextSecondary p-2 rounded-lg bg-transparent outline-none mt-2" />
                              </div>
                              <div className="mt-4">
                                    <label htmlFor="email" className="font-semibold tracking-[4px] text-brandTextTertiary">EMAIL</label>
                                    <input {...register("email")} placeholder='Ex: user@example.com' type="email" id="email" className="w-full border border-brandTextSecondary p-2 rounded-lg bg-transparent outline-none mt-2" />
                              </div>

                              <div className="mt-4">
                                    <label htmlFor="password" className="font-semibold tracking-[4px] text-brandTextTertiary">PASSWORD</label>
                                    <input {...register("password")} placeholder='Ex: ******' type="password" id="password" className="w-full border border-brandTextSecondary p-2 rounded-lg bg-transparent outline-none mt-2" />
                              </div>

                              <Button type="submit" className="w-full mt-8 bg-brandTextSecondary hover:bg-brandTextSecondary/70">Register Now</Button>

                              <div className="mt-4 flex justify-center items-center flex-col">
                                    <p className="text-center text-brandTextTertiary">Have an account? <Link to="/login" className="text-[#510039] font-semibold">Login now</Link></p>
                                    <Link className="text-center text-blue-600 hover:underline" to="/">Go Home</Link>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default Register;