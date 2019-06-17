import casual from "casual";
import {expect} from "chai";
import nock from "nock";
import {config} from "../../../src/config";
import {OpaApiClient} from "../../../src/opa-api-client";
import {existingUserResponse, nonExistingUserResponse} from "./fixtures";

describe("OpaApiClient", () => {
  const opaConfig = config.opa;
  let opaApiClient: OpaApiClient;

  beforeEach(() => {
    opaApiClient = new OpaApiClient({config: opaConfig});
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("UserResource", () => {
    describe("#findById", () => {
      it("Retrieves an existing user data from OPA service", async () => {
        const userId = "catz";

        nock(opaConfig.address)
          .get(`/${opaConfig.apiVersion}/data/users/${userId}`)
          .reply(200, existingUserResponse);

        const existingUser = await opaApiClient.users.findByid(userId);

        expect(existingUser).to.exist;
        expect(existingUser).to.have.property("licenseKey");
        expect(existingUser).to.have.property("hasAccessToFeatures");
      });

      it("Returns null for a non existing user", async () => {
        const userId = "cant-find-me";

        nock(opaConfig.address)
          .get(`/${opaConfig.apiVersion}/data/users/${userId}`)
          .reply(200, nonExistingUserResponse);

        const nonExistingUser = await opaApiClient.users.findByid(userId);

        expect(nonExistingUser).to.not.exist;
      });
    });

    describe("#setLicenseKey", () => {
      it("Sets the license key and features for a specific user", async () => {
        const userId = "fake-user-id";
        const payload = {
          licenseKey: casual.string,
          features: ["makeFreddoEspresso"],
        };

        nock(opaConfig.address)
          .patch(`/${opaConfig.apiVersion}/data/users/${userId}`, [
            {
              op: "add",
              path: "/licenseKey",
              value: payload.licenseKey,
            },
            {
              op: "add",
              path: "/hasAccessToFeatures",
              value: payload.features,
            },
          ])
          .reply(200, "");

        await opaApiClient.users.setLicenseKey(userId, payload);
      });
    });
  });
});
