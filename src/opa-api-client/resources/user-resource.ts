import axios from "axios";
import {BaseResource} from "./base-resource";
import {IRawOpaResource} from "./types";

export interface IUser {
  licenseKey?: string;
  hasAccessToFeatures: string[];
}

export interface ISetLicenseKeyPayload {
  licenseKey: string;
  features: string[];
}

export class UserResource extends BaseResource {
  public async findById(userId: string): Promise<IUser | null> {
    const requestUrl = this.buildRequestUrl(`data/users/${userId}`);
    const {data} = await axios.get<IRawOpaResource<IUser>>(requestUrl);
    return data.result || null;
  }

  public async setLicenseKey(userId: string, payload: ISetLicenseKeyPayload) {
    const requestUrl = this.buildRequestUrl(`data/users/${userId}`);

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
}
