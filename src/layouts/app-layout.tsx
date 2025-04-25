import Footer from "@/components/footer";
import { NavItems, TeamNavItems } from "@/components/items";
import NavBar from "@/components/nav-bar";
import PageBreadcrumbs from "@/components/page-breadcrumbs";
import { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar navItems={NavItems} teamNavItems={TeamNavItems} />
      <PageBreadcrumbs />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
