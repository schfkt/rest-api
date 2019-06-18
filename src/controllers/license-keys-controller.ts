import Koa from "koa";
import {NotImplementedError} from "../errors";
import {CreateLicenseKeyService} from "../services";

export interface ILicenseKeysControllerDependencies {
  context: Koa.Context;
  createLicenseKeyService: CreateLicenseKeyService;
}

export class LicenseKeysController {
  private context: Koa.Context;
  private createLicenseKeyService: CreateLicenseKeyService;

  constructor(dependencies: ILicenseKeysControllerDependencies) {
    this.context = dependencies.context;
    this.createLicenseKeyService = dependencies.createLicenseKeyService;
  }

  public async create() {
    const {userId, features} = this.context.request.body;
    const licenseKey = await this.createLicenseKeyService.createKeyForUser(userId, features);
    this.context.body = {licenseKey};
  }

  public async update() {
    throw new NotImplementedError(`${this.constructor.name}#update is not implemented`);
  }

  public async revoke() {
    throw new NotImplementedError(`${this.constructor.name}#revoke is not implemented`);
  }
}
