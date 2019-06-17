export abstract class BaseError extends Error {
  // We need these 2 properties for TS compiler since it can't
  // Infer them on it's own from Object.defineProperties call
  public readonly code!: string;
  public readonly meta!: any;

  constructor(message: string, meta?: any) {
    super(message);

    const code = this.inferErrorCodeFromClassName();
    meta = meta || {};

    Object.defineProperties(this, {
      name: {get: () => this.constructor.name},
      message: {get: () => message},
      code: {get: () => code},
      meta: {get: () => meta},
    });

    Error.captureStackTrace(this, this.constructor);
  }

  private inferErrorCodeFromClassName() {
    return this.constructor.name.replace(/[a-z](?=[A-Z])/g, "$&_").toUpperCase();
  }
}
