export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const param = (value: string | string[]): string =>
  Array.isArray(value) ? value[0] : value;
