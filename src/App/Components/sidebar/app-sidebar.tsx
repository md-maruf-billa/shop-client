import * as React from "react"
import {
  Bug,
  Car,
  CarTaxiFront,
  ChartBarStacked,
  ChartColumn,
  LayoutPanelTop,
  PanelTopOpen,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  User2Icon,
} from "lucide-react"

import { NavMain } from "@/App/Components/sidebar/nav-main"
import { NavUser } from "@/App/Components/sidebar/nav-user"
import { TeamSwitcher } from "@/App/Components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAppSelector } from "@/App/Redux/hook"
import { selectUser } from "@/App/Redux/features/user/user.slice"

// This is sample data.
const data = {
  navAdmin: [
    {
      title: "Overview",
      url: "/admin",
      icon: ChartColumn,
    },
    {
      title: "Manage Products",
      url: "manage-product",
      icon: ShoppingBasket,
    },
    {
      title: "Manage Orders",
      url: "manage-orders",
      icon: PanelTopOpen,
    },
    {
      title: "Manage Users",
      url: "manage-users",
      icon: User2Icon,

    },
    {
      title: "Manage Riders",
      url: "manage-riders",
      icon: CarTaxiFront,

    },
    {
      title: "Manage Category",
      url: "manage-category",
      icon: ChartBarStacked,

    },
    {
      title: "Manage Extra Section",
      url: "manage-extra-section",
      icon: LayoutPanelTop,

    },
    {
      title: "Sales Report",
      url: "sales-report",
      icon: Bug,

    },
  ],
  navRider: [
    {
      title: "Overview/Pending-Orders",
      url: "/rider",
      icon: ChartColumn,
    },
    {
      title: "Piked Order's",
      url: "received-orders",
      icon: ShoppingCart,
    },
    {
      title: "Delivered Order's",
      url: "delivered-orders",
      icon: Car,
    },
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
    },

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(selectUser);
  const refienUser = {
    name: user?.name!,
    email: user?.email!,
    avatar: user?.profileImage!
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.role == 'admin' ? data.navAdmin : user?.role == 'rider' ? data.navRider : []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={refienUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
