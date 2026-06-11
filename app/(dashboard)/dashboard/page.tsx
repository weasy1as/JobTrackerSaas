import { getJobs } from "@/lib/server/jobs";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const jobs = await getJobs();

  return <DashboardClient jobs={jobs} />;
}
