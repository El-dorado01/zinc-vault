import Footer from "@/components/footer";
import { NavItems, TeamNavItems } from "@/components/items";
import NavBar from "@/components/nav-bar";
import PageBreadcrumbs from "@/components/page-breadcrumbs";
import { BookOpenText } from "lucide-react";
import { PropsWithChildren } from "react";

const ContentWritingLayout = ({ children }: PropsWithChildren) => {
  const iconColor = "#4A90E2";
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar
        navItems={NavItems}
        // skillNavItems={GameNavItems}
        teamNavItems={TeamNavItems}
        icon={BookOpenText}
        iconColor={iconColor}
      />
      <PageBreadcrumbs iconColor={iconColor} />
      {children}
      <Footer />
    </div>
  );
};

export default ContentWritingLayout;
