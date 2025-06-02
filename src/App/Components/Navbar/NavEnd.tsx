import { Button } from '@/components/ui/button';
import { IoIosLogIn } from "react-icons/io";
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/App/Redux/hook';
import { logout, selectUser } from '@/App/Redux/features/user/user.slice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
      History,
      LogOut,
      User,
} from "lucide-react"

import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuGroup,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuShortcut,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner';
import CartComponents from '../CartComponents';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/App/Redux/features/languageSlice';
const NavEnd = () => {
      const { language } = useAppSelector(state => state.language)
      const user = useAppSelector(selectUser);
      const dispatch = useAppDispatch()
      const { t } = useTranslation();
      return (
            <div className='flex items-end gap-2 md:gap-4'>
                  <Select defaultValue={language} onValueChange={value => dispatch(setLanguage(value))}>
                        <SelectTrigger className="w-[90px]">
                              <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                              <SelectGroup>
                                    <SelectLabel>Language</SelectLabel>
                                    <SelectItem value="en">Englis</SelectItem>
                                    <SelectItem value="ar">عربي</SelectItem>
                              </SelectGroup>
                        </SelectContent>
                  </Select>
                  <CartComponents />
                  {
                        user?.email ?
                              <>
                                    {
                                          user?.role == "admin" ?
                                                <Link to={"/admin"}>
                                                      <Button className='uppercase'>{t("Dashboard")}</Button>
                                                </Link> :
                                                user?.role == "rider" ?
                                                      <Link to={"/rider"}>
                                                            <Button className='uppercase'>{t("Dashboard")}</Button>
                                                      </Link>
                                                      :
                                                      <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                  <Avatar className='cursor-pointer'>
                                                                        <AvatarImage src={user?.profileImage} />
                                                                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                                                                  </Avatar>
                                                                  {/* <Button variant="outline">Open</Button> */}
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent className="w-56 ">
                                                                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                                  <DropdownMenuSeparator />
                                                                  <DropdownMenuGroup>
                                                                        <Link to="/profile-settting">
                                                                              <DropdownMenuItem >
                                                                                    <User />
                                                                                    <span>Profile Setting</span>
                                                                              </DropdownMenuItem>
                                                                        </Link>
                                                                        <Link to="/orders"><DropdownMenuItem>
                                                                              <History />
                                                                              <span>Order History</span>
                                                                        </DropdownMenuItem></Link>
                                                                  </DropdownMenuGroup>
                                                                  <DropdownMenuSeparator />
                                                                  <DropdownMenuItem onClick={() => {
                                                                        dispatch(logout())
                                                                        toast.success("Logout Successfull...")
                                                                  }}>
                                                                        <LogOut />
                                                                        <span>Log out</span>
                                                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                                                  </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                      </DropdownMenu>
                                    }
                              </> :
                              <Link to="/login">
                                    <Button className='bg-brandTextTertiary hover:bg-brandTextTertiary/70 text-white text-base'>
                                          <IoIosLogIn />
                                          Login
                                    </Button>
                              </Link>
                  }
            </div>

      );
};

export default NavEnd;