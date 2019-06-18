import * as errors from "../../../errors";

export const ENVS_TO_SHOW_STACKTRACE = new Set(["test", "development"]);

// TODO: Find proper type instead of any
export const ERROR_TO_STATUS_CODE_MAP = new Map<any, number>([
  [errors.FeatureNotFoundError, 404],
  [errors.UserHasLicenseKeyError, 400],
  [errors.UserNotFoundError, 404],
  [errors.NotImplementedError, 500],
]);
