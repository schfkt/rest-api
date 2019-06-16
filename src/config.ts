import fs from "fs";
import path from "path";

const loadConfig = () => {
  const configPath = path.resolve(__dirname, "../config/config.json");
  const rawConfig = fs.readFileSync(configPath, "utf8");
  return JSON.parse(rawConfig);
};

export const config = loadConfig();

// TODO: add types for configs (opa, jwt, etc)
// TOOD: config validation
