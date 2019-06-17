import {FeatureNotFoundError, UserHasLicenseKeyError, UserNotFoundError} from "../errors";
import {OpaApiClient} from "../opa-api-client";
import {JwtService} from "./jwt-service";

export interface ICreateLicenseKeyServiceDependencies {
  opaApiClient: OpaApiClient;
  jwtService: JwtService;
}

export class CreateLicenseKeyService {
  private opaApiClient: OpaApiClient;
  private jwtService: JwtService;

  constructor(dependencies: ICreateLicenseKeyServiceDependencies) {
    this.opaApiClient = dependencies.opaApiClient;
    this.jwtService = dependencies.jwtService;
  }

  // TODO: Pessimistick locking to avoid concurrency issues
  public async createKeyForUser(userId: string, features: string[]): Promise<string> {
    const user = await this.findUser(userId);
    if (user.licenseKey != null) {
      throw new UserHasLicenseKeyError("User already has a license key created", {userId});
    }

    await this.checkThatFeaturesExist(features);

    const licenseKey = this.jwtService.sign({userId});
    await this.opaApiClient.users.setLicenseKey(userId, {licenseKey, features});
    // TODO: emit message to the queue

    return licenseKey;
  }

  private async findUser(userId: string) {
    const user = await this.opaApiClient.users.findById(userId);
    if (user == null) {
      throw new UserNotFoundError("Cannot find user by id passed", {userId});
    }

    return user;
  }

  private async checkThatFeaturesExist(featuresToAdd: string[]) {
    const existingFeatures = await this.opaApiClient.features.list();

    const missingFeatures = featuresToAdd.filter((featureToAdd) => existingFeatures[featureToAdd] == null);
    if (missingFeatures.length !== 0) {
      throw new FeatureNotFoundError("Cannot find features specified", {
        features: missingFeatures,
      });
    }
  }
}
