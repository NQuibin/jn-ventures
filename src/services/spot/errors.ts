export const ERROR_CODES = {
  duplicateGooglePlaceId: 'duplicate-google-place-id',
};

export class SpotServiceError extends Error {
  public errorCode: string;

  constructor(message: string, errorCode: string) {
    super(message);
    this.errorCode = errorCode;
  }
}

export class DuplicateGooglePlaceIdError extends SpotServiceError {
  constructor(googlePlaceId: string) {
    const message = `Google place id of:  ${googlePlaceId} already exists.`;
    const errorCode = ERROR_CODES.duplicateGooglePlaceId;
    super(message, errorCode);
  }
}
