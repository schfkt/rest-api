import axios from "axios";
import {IRawOpaResource} from "./types";

export interface IUserResourceDependencies {
  config: any; // todo: fix
}

export interface IUser {
  licenseKey?: string;
  hasAccessToFeatures: string[];
}

export class UserResource {
  private config: any;

  constructor({config}: IUserResourceDependencies) {
    this.config = config;
  }

  public async findByid(id: string): Promise<IUser | null> {
    // TODO: handle http errors
    // TODO: retries (async-retry lib)
    const requestUrl = `${this.buildBaseUrl()}/data/users/${id}`;
    const {data} = await axios.get<IRawOpaResource<IUser>>(requestUrl);
    return data.result || null;
  }

  private buildBaseUrl(): string {
    return `${this.config.address}/${this.config.apiVersion}`;
  }
}
