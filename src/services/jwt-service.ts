import jwt from "jsonwebtoken";
import {IJwtConfig} from "../config";

export interface IJwtServiceDeps {
  config: IJwtConfig;
}

export interface IJwtPayload {
  userId: string;
}

export class JwtService {
  private config: IJwtConfig;

  constructor({config}: IJwtServiceDeps) {
    this.config = config;
  }

  public sign(payload: IJwtPayload): string {
    return jwt.sign(payload, this.config.secret);
  }

  public async verify(token: string) {
    return jwt.verify(token, this.config.secret);
  }
}
