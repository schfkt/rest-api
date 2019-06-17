import casual from "casual";
import {expect} from "chai";
import sinon from "sinon";
import * as errors from "../../../src/errors";
import {CreateLicenseKeyService, JwtService} from "../../../src/services";
import {createOpaApiClientStub} from "../helpers";

describe("CreateLicenseKeyService", () => {
  let opaApiClient: any;
  let jwtService: any;
  let createLicenseKeyService: CreateLicenseKeyService;

  beforeEach(() => {
    opaApiClient = createOpaApiClientStub();
    jwtService = sinon.createStubInstance(JwtService);
    createLicenseKeyService = new CreateLicenseKeyService({opaApiClient, jwtService});
  });

  it("Throws the specific error if no user found", async () => {
    const userId = casual.uuid;
    const findUserByIdCall = opaApiClient.users.findById.withArgs(userId).resolves(null);

    try {
      await createLicenseKeyService.createKeyForUser(userId, []);
      expect.fail();
    } catch (err) {
      expect(err).to.be.an.instanceOf(errors.UserNotFoundError);
    }

    expect(findUserByIdCall).to.have.been.calledOnce;
  });
});
