import Koa from "koa";
import {BaseError} from "../../../errors";
import {ENVS_TO_SHOW_STACKTRACE} from "./constants";
import {getStatusCodeForError} from "./helpers";

export interface IErrorBody {
  message: string;
  code?: string;
  meta?: any;
  stack?: string;
}

export const errorHandler = (): Koa.Middleware => {
  const env = process.env.NODE_ENV || "development";
  const showStackTraces = ENVS_TO_SHOW_STACKTRACE.has(env);

  return async (ctx: Koa.Context, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = getStatusCodeForError(err);

      let body: IErrorBody;
      if (err instanceof BaseError) {
        body = {
          message: err.message,
          code: err.code,
          meta: err.meta,
        };
      } else {
        body = {
          message: err.message,
        };
      }

      if (showStackTraces) {
        body.stack = err.stack;
      }

      ctx.body = body;
    }
  };
};
