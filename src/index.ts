import Discord, {IntentsBitField} from "discord.js"
import {BOT_TOKEN, MODULES_PATH} from "./config";
import {IBot} from "./basic_types";
import * as fs from "fs";
import * as Path from "path";
import {logger} from "./Utils/logger";

const bot: IBot = {
    client: new Discord.Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent,
            // IntentsBitField.Flags.GuildPresences,
        ]
    }),
    modules: fs.readdirSync(MODULES_PATH).map(name => require(Path.resolve(MODULES_PATH, name, "index.js"))),
    commands: []
};

bot.modules.forEach(module => module.initialize(bot));

bot.client.login(BOT_TOKEN)
    .catch(err => {
        logger.error(err);
    });