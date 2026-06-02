import type { Job } from "./domain";

export type JobFormValues = Omit<Job, "id">;
