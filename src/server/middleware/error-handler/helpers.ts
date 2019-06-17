import {ERROR_TO_STATUS_CODE_MAP} from "./constants";

export const getStatusCodeForError = (err: Error): number => {
  const statusCode = ERROR_TO_STATUS_CODE_MAP.get(err.constructor);
  return statusCode || 500;
};
