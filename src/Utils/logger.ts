import * as Path from "path";
import {LOGGER_PATH} from "../config";
import * as fs from "fs";
import {createSimpleLogger} from "simple-node-logger";

try {
    fs.mkdirSync(LOGGER_PATH);
} catch (err) {}

export const logger = createSimpleLogger({
    logFilePath: Path.resolve(LOGGER_PATH, `after-${new Date().getUTCFullYear()}.${new Date().getUTCMonth().toString().padStart(2, "0")}.log`),
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});