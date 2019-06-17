import {IOpaConfig} from "../config";
import {FeatureResource, UserResource} from "./resources";

export interface IOpaClientDependencies {
  config: IOpaConfig;
}

export class OpaApiClient {
  public readonly users: UserResource;
  public readonly features: FeatureResource;

  constructor({config}: IOpaClientDependencies) {
    this.users = new UserResource({config});
    this.features = new FeatureResource({config});
  }
}
