export interface IJwtConfig {
  secret: string;
}

export interface IOpaConfig {
  address: string;
  apiVersion: string;
}

export interface IAppConfig {
  jwt: IJwtConfig;
  opa: IOpaConfig;
}
