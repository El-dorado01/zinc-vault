import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";
import { SidebarInset } from "@/components/ui/sidebar";
// import { createSupabaseServerClient } from "@/utils/supabase/server";

export default async function Dashboard() {
  // const supabase = await createSupabaseServerClient();
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  const user = await verifySessionToken(sessionToken!);

  return (
    <>
      <SidebarInset>
        {/* Dashboard Breadcrumb */}
        <DashboardBreadcrumb />
        <div className="min-h-[100vh] flex flex-1 flex-col gap-4 p-4 shadow-sm rounded-lg mx-5 bg-sidebar md:min-h-min">
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to the Dashboard</h1>
            <p>Logged in as: {user!.email}</p>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50 border" />
              <div className="aspect-video rounded-xl bg-muted/50 border" />
              <div className="aspect-video rounded-xl bg-muted/50 border" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min border" />
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
