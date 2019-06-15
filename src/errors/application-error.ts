export interface IApplicationErrorParams {
  status?: number;
}

export class ApplicationError extends Error {
  public static readonly code = "ERR_APPLICATION";

  public readonly code: string;
  public readonly status: number;
  public readonly meta: any;

  protected readonly params: Record<string, any>;

  constructor(message: string, params?: IApplicationErrorParams) {
    super(message);

    this.params = {};

    this.status = this.params.status = 500;
    if (params && params.status != null) {
      this.status = this.params.status = params.status;
    }

    this.code = this.params.code = this.determineErrorCode();

    Object.defineProperties(this, {
      name: {get: () => this.constructor.name},
      message: {get: () => message, enumerable: true},
      code: {get: () => this.params.code},
      status: {get: () => this.params.status},
      meta: {get: () => this.getMetaData()},
    });

    Error.captureStackTrace(this, this.constructor);
  }

  protected getMetaData() {
    return {};
  }

  private determineErrorCode() {
    const childErrorCode = Reflect.get(this.constructor, "code");
    if (childErrorCode == null) {
      throw new Error(`${this.constructor.name} doesn't have static property "code" defined`);
    }
    return childErrorCode;
  }
}
