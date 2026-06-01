import { JobStatus } from "../kanban/types";

interface JobFormValues {
  company: string;
  title: string;
  source: string;
  status: JobStatus;
  location: string;
  url: string;
  contactName: string;
  contactEmail: string;
  notes: string;
}
export const initialJobFormValues: JobFormValues = {
  company: "",
  title: "",
  source: "job_post",
  status: "Applied",
  location: "",
  url: "",
  contactName: "",
  contactEmail: "",
  notes: "",
};
