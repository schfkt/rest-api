import {asClass, createContainer} from "awilix";

import {config} from "./config";
import * as controllers from "./controllers";
import {OpaApiClient} from "./opa-api-client";
import * as services from "./services";

export const container = createContainer().register({
  LicenseKeysController: asClass(controllers.LicenseKeysController),

  createLicenseKeyService: asClass(services.CreateLicenseKeyService),

  opaApiClient: asClass(OpaApiClient).inject(() => ({config: config.opa})),
});
