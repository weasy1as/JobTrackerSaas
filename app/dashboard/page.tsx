import FloatingSidebar from "@/components/navigation/FloatingSidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import { getJobs } from "@/lib/supabase/jobs";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const jobs = await getJobs();

  return <DashboardClient jobs={jobs} />;
}
