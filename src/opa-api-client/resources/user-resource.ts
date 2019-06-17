import axios from "axios";
import {IOpaConfig} from "../../config";
import {IRawOpaResource} from "./types";

export interface IUserResourceDependencies {
  config: IOpaConfig;
}

export interface IUser {
  licenseKey?: string;
  hasAccessToFeatures: string[];
}

export interface ISetLicenseKeyPayload {
  licenseKey: string;
  features: string[];
}

export class UserResource {
  private config: IOpaConfig;

  constructor({config}: IUserResourceDependencies) {
    this.config = config;
  }

  public async findByid(userId: string): Promise<IUser | null> {
    // TODO: handle http errors
    // TODO: retries (async-retry lib)
    const requestUrl = `${this.buildBaseUrl()}/data/users/${userId}`;
    const {data} = await axios.get<IRawOpaResource<IUser>>(requestUrl);
    return data.result || null;
  }

  public async setLicenseKey(userId: string, payload: ISetLicenseKeyPayload) {
    const requestUrl = `${this.buildBaseUrl()}/data/users/${userId}`;

    const patchOperations = [
      {
        op: "add",
        path: "/licenseKey",
        value: payload.licenseKey,
      },
      {
        op: "add",
        path: "/hasAccessToFeatures",
        value: payload.features,
      },
    ];

    await axios.patch(requestUrl, patchOperations);
  }

  private buildBaseUrl(): string {
    return `${this.config.address}/${this.config.apiVersion}`;
  }
}
