export interface ErrorDetails {
  statusCode?: number;
  message: string;
  retry?: number;
}

export class ApiError extends Error {
  statusCode?: number;
  retry?: number; // počet sekund do odbklování

  constructor(details: ErrorDetails) {
    super(details.message);
    this.statusCode = details.statusCode;
    this.retry = details.retry;
  }
}
