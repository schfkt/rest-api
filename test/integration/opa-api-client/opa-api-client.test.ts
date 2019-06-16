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
        nock(opaConfig.address)
          .get(`/${opaConfig.apiVersion}/data/users/catz`)
          .reply(200, existingUserResponse);

        const existingUser = await opaApiClient.users.findByid("catz");

        expect(existingUser).to.exist;
        expect(existingUser).to.have.property("licenseKey");
        expect(existingUser).to.have.property("hasAccessToFeatures");
      });

      it("Returns null for a non existing user", async () => {
        nock(opaConfig.address)
          .get(`/${opaConfig.apiVersion}/data/users/cant-find-me`)
          .reply(200, nonExistingUserResponse);

        const existingUser = await opaApiClient.users.findByid("cant-find-me");

        expect(existingUser).to.not.exist;
      });
    });
  });
});
