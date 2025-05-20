import { AppSidebar } from "@/App/Components/sidebar/app-sidebar"
import {
      Breadcrumb,
      BreadcrumbItem,
      BreadcrumbLink,
      BreadcrumbList,
      BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
      SidebarInset,
      SidebarProvider,
      SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link, Outlet, useLocation } from "react-router"

export default function RiderLayout() {
      const { pathname } = useLocation()
      const breadcrumbLinks = pathname?.split("/").filter(path => path.length > 0)
      return (
            <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                              <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator orientation="vertical" className="mr-2 h-4" />
                                    <Breadcrumb>
                                          <BreadcrumbList>
                                                {
                                                      breadcrumbLinks?.map((link, idx) =>
                                                            <>
                                                                  <BreadcrumbItem key={idx} className="">
                                                                        <BreadcrumbLink href="#">
                                                                              <Link to={link == "rider" ? "/rider" : link}> {link}</Link>
                                                                        </BreadcrumbLink>
                                                                  </BreadcrumbItem>
                                                                  <BreadcrumbSeparator className="" />
                                                            </>
                                                      )
                                                }

                                          </BreadcrumbList>
                                    </Breadcrumb>
                              </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                              <Outlet />
                        </div>
                  </SidebarInset>
            </SidebarProvider>
      )
}
