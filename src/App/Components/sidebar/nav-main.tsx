import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {

  // get last url path
  const { pathname } = useLocation()
  const segments = pathname.split("/");
  let lastSegment = segments[segments.length - 1];
  if (lastSegment == "admin" || lastSegment == "rider") {
    lastSegment = "/" + lastSegment
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Link to={item?.url} key={item.title} >
            <SidebarMenuItem >
              <SidebarMenuButton tooltip={item.title} className={`${lastSegment == item?.url && "bg-blue-500 text-white"}`}>
                {item.icon && <item.icon />}
                <span>{item?.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
