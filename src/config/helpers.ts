import fs from "fs";
import path from "path";
import {IAppConfig} from "./types";

export const loadConfig = (): IAppConfig => {
  const configPath = path.resolve(__dirname, "../../config/config.json");
  const rawConfig = fs.readFileSync(configPath, "utf8");
  return JSON.parse(rawConfig) as IAppConfig;
};
