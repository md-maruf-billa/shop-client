
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetWebInfoQuery } from "@/App/Redux/features/admin/admin.api"
import { Link } from "react-router"

export function TeamSwitcher() {
  const { data } = useGetWebInfoQuery(undefined)
  const web = data?.data?.webInfo;
  return (
    <Link to="/">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Avatar>
                <AvatarImage src={web?.webInfo?.logo} alt="@shadcn" />
                <AvatarFallback>{web?.webInfo?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {web?.webInfo?.name}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Link>
  )
}
