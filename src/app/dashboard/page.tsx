import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  if (!sessionToken) {
    redirect("/auth/signin");
  }
  const session = await verifySessionToken(sessionToken); // Async, as per previous fix
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Dashboard</h1>
      <p>Logged in as: {session.email}</p>
    </div>
  );
}
