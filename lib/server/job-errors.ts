export type JobServiceErrorCode =
  | "unauthorized"
  | "not_found"
  | "database";

export class JobServiceError extends Error {
  constructor(
    public readonly code: JobServiceErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "JobServiceError";
  }
}

export function jobServiceErrorStatus(error: unknown): number {
  if (!(error instanceof JobServiceError)) return 500;
  if (error.code === "unauthorized") return 401;
  if (error.code === "not_found") return 404;
  return 500;
}

export function safeJobServiceError(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof JobServiceError) return error.message;
  return fallback;
}
