import { JOB_SOURCES, JOB_STATUSES } from "./constants";
import { JobFormValues } from "./types/forms";
import { JobSource, JobStatus } from "./types/domain";

export type JobFieldErrors = Partial<
  Record<keyof JobFormValues, string>
>;

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors: JobFieldErrors };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(
  input: Record<string, unknown>,
  field: keyof JobFormValues,
  errors: JobFieldErrors,
): string {
  const value = input[field];
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") {
    errors[field] = "Must be text.";
    return "";
  }
  return value.trim();
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function parseJobFormValues(
  input: unknown,
): ValidationResult<JobFormValues> {
  if (!isRecord(input)) {
    return {
      success: false,
      error: "Invalid job data.",
      fieldErrors: {},
    };
  }

  const fieldErrors: JobFieldErrors = {};
  const company = stringValue(input, "company", fieldErrors);
  const title = stringValue(input, "title", fieldErrors);
  const location = stringValue(input, "location", fieldErrors);
  const url = stringValue(input, "url", fieldErrors);
  const contactName = stringValue(input, "contactName", fieldErrors);
  const contactEmail = stringValue(input, "contactEmail", fieldErrors);
  const notes = stringValue(input, "notes", fieldErrors);
  const dateApplied = stringValue(input, "dateApplied", fieldErrors);
  const jobDescription = stringValue(
    input,
    "jobDescription",
    fieldErrors,
  );

  if (!company) fieldErrors.company = "Company is required.";
  if (!title) fieldErrors.title = "Job title is required.";

  const status = input.status;
  if (
    typeof status !== "string" ||
    !JOB_STATUSES.includes(status as JobStatus)
  ) {
    fieldErrors.status = "Choose a valid status.";
  }

  const source = input.source;
  if (
    typeof source !== "string" ||
    !JOB_SOURCES.includes(source as JobSource)
  ) {
    fieldErrors.source = "Choose a valid source.";
  }

  if (dateApplied && !isValidDate(dateApplied)) {
    fieldErrors.dateApplied = "Enter a valid date.";
  }
  if (url && !isValidHttpUrl(url)) {
    fieldErrors.url = "Enter a valid http or https URL.";
  }
  if (
    contactEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)
  ) {
    fieldErrors.contactEmail = "Enter a valid email address.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: "Check the highlighted fields.",
      fieldErrors,
    };
  }

  return {
    success: true,
    data: {
      company,
      title,
      status: status as JobStatus,
      source: source as JobSource,
      location,
      url,
      contactName,
      contactEmail,
      notes,
      dateApplied,
      jobDescription,
    },
  };
}

export function parseJobStatusUpdate(
  input: unknown,
): ValidationResult<Pick<JobFormValues, "status">> {
  if (
    !isRecord(input) ||
    Object.keys(input).length !== 1 ||
    typeof input.status !== "string" ||
    !JOB_STATUSES.includes(input.status as JobStatus)
  ) {
    return {
      success: false,
      error: "Choose a valid status.",
      fieldErrors: { status: "Choose a valid status." },
    };
  }

  return {
    success: true,
    data: { status: input.status as JobStatus },
  };
}

export function isValidJobId(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}
