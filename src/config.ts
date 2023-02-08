import dotenv from "dotenv"
import * as Path from "path";

dotenv.config({
    path: Path.resolve(__dirname, "..", ".env")
});

// Paths
export const ROOT_PATH = Path.resolve(__dirname);
export const MODULES_PATH = Path.resolve(ROOT_PATH, "modules");
export const COMMANDS_PATH = Path.resolve(ROOT_PATH, "commands");
export const LOGGER_PATH = Path.resolve(ROOT_PATH, "..", "LOGS");
export const LOCALES_PATH = Path.resolve(ROOT_PATH, "..", "locales");

// Bot
export const BOT_TOKEN = process.env.BOT_TOKEN;
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || "English";
export const BOT_PREFIX = "a.";
export const BOT_CREATORS = ["556195876545101824"];