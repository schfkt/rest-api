import {IOpaConfig} from "../../config";

export interface IBaseResourceDeps {
  config: IOpaConfig;
}

export class BaseResource {
  protected config: IOpaConfig;

  constructor(deps: IBaseResourceDeps) {
    this.config = deps.config;
  }

  protected buildRequestUrl(path: string): string {
    return `${this.config.address}/${this.config.apiVersion}/${path}`;
  }
}
