import Koa from "koa";
import * as oddlog from "oddlog";
import {CreateLicenseKeyService} from "../services";

export interface ILicenseKeysControllerDependencies {
  logger: oddlog.ILogger;
  context: Koa.Context;
  createLicenseKeyService: CreateLicenseKeyService;
}

export class LicenseKeysController {
  private logger: oddlog.ILogger;
  private context: Koa.Context;
  private createLicenseKeyService: CreateLicenseKeyService;

  constructor(dependencies: ILicenseKeysControllerDependencies) {
    this.logger = dependencies.logger;
    this.context = dependencies.context;
    this.createLicenseKeyService = dependencies.createLicenseKeyService;
  }

  public async create() {
    const {userId, features} = this.context.request.body;
    const licenseKey = await this.createLicenseKeyService.createKeyForUser(userId, features);
    this.context.body = {licenseKey};
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
