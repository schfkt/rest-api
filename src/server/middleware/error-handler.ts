import Koa from "koa";
import {ApplicationError} from "../../errors";

const SHOW_STACKTRACE_ENVS = ["test", "development"];

export interface IErrorBody {
  message: string;
  code?: string;
  meta?: any;
  stack?: string;
}

export const errorHandler = (): Koa.Middleware => {
  const env = process.env.NODE_ENV || "development";
  const showStackTraces = SHOW_STACKTRACE_ENVS.includes(env);

  return async (ctx: Koa.Context, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;

      let body: IErrorBody;
      if (err instanceof ApplicationError) {
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
