import {IOpaConfig} from "../config";
import {UserResource} from "./resources";

export interface IOpaClientDependencies {
  config: IOpaConfig;
}

export class OpaApiClient {
  public readonly users: UserResource;

  constructor({config}: IOpaClientDependencies) {
    this.users = new UserResource({config});
  }
}
