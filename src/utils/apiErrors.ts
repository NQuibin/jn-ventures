export interface HttpErrorResponseData {
  message: string;
  statusCode: number;
  errorCode: string;
}

export class HttpError extends Error {
  public statusCode: number;
  public errorCode: string;

  constructor(message: string, statusCode: number, errorCode: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, errorCode: string) {
    super(message, 400, errorCode);
  }
}
