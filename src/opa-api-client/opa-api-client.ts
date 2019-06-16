import {UserResource} from "./resources";

export interface IOpaClientDependencies {
  config: any; // todo: fix
}

export class OpaApiClient {
  public readonly users: UserResource;

  constructor({config}: IOpaClientDependencies) {
    this.users = new UserResource({config});
  }
}
