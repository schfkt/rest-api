import {OpaApiClient} from "../opa-api-client";

export interface ICreateLicenseKeyServiceDependencies {
  config: any; // TODO: fix
  opaApiClient: OpaApiClient;
}

export class CreateLicenseKeyService {
  // private config: any;
  private opaApiClient: OpaApiClient; // TODO: implement it

  constructor(dependencies: ICreateLicenseKeyServiceDependencies) {
    // this.config = dependencies.config.jwt;
    this.opaApiClient = dependencies.opaApiClient;
  }

  public async createKeyForUser(userId: string): Promise<string> {
    // TODO: the logic is the following
    // Check that user exists
    // Create a JWT token for it
    // Update OPA record for the user
    // Return the key
    // Emit a message
    const user = await this.opaApiClient.users.findByid(userId);
    if (user == null) {
      // TODO: proper domain error
      throw new Error("User doesn't exist");
    }

    return user.licenseKey || "42";
  }
}
