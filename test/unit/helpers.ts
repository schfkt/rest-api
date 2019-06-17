import sinon from "sinon";
import {FeatureResource, UserResource} from "../../src/opa-api-client/resources";

export const createOpaApiClientStub = () => {
  return {
    users: sinon.createStubInstance(UserResource),
    features: sinon.createStubInstance(FeatureResource),
  };
};
