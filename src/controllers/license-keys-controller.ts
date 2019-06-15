import Koa from "koa";
import * as oddlog from "oddlog";

export interface ILicenseKeysControllerDependencies {
  logger: oddlog.ILogger;
  context: Koa.Context;
}

export class LicenseKeysController {
  private logger: oddlog.ILogger;
  private context: Koa.Context;

  constructor(dependencies: ILicenseKeysControllerDependencies) {
    this.logger = dependencies.logger;
    this.context = dependencies.context;
  }

  public async create() {
    this.logger.info(`${this.constructor.name}#create called`);
    this.context.body = {result: "ok"};
  }

  public async update() {
    this.logger.info(`${this.constructor.name}#update called`);
    this.context.body = {result: "ok"};
  }

  public async revoke() {
    this.logger.info(`${this.constructor.name}#revoke called`);
    this.context.body = {result: "ok"};
  }
}
