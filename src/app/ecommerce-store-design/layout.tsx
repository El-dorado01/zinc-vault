import Footer from "@/components/footer";
import { NavItems, TeamNavItems } from "@/components/items";
import NavBar from "@/components/nav-bar";
import PageBreadcrumbs from "@/components/page-breadcrumbs";
import { ShoppingCart } from "lucide-react";
import { PropsWithChildren } from "react";

const ECommerceDesignLayout = ({ children }: PropsWithChildren) => {
  const iconColor = "#FF6F61";
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar
        navItems={NavItems}
        // skillNavItems={GameNavItems}
        teamNavItems={TeamNavItems}
        icon={ShoppingCart}
        iconColor={iconColor}
      />
      <PageBreadcrumbs iconColor={iconColor} />
      {children}
      <Footer />
    </div>
  );
};

export default ECommerceDesignLayout;
