import {IBot} from "../../basic_types";
import * as fs from "fs";
import {BOT_PREFIX, COMMANDS_PATH} from "../../config";
import * as Path from "path";
import {findCommand, startsWithPrefix} from "../../Utils/Discord/Command";
import {logger} from "../../Utils/logger";
import * as Message from "../../Utils/Discord/Message";
import {getLocale} from "../../Utils/locales";

export function initialize(bot: IBot) {
    const categories = fs.readdirSync(COMMANDS_PATH);

    categories.forEach(categoryName => {
        const categoryCommands = fs.readdirSync(Path.resolve(COMMANDS_PATH, categoryName));

        bot.commands.push(
            ...categoryCommands
                .filter(commandName => commandName.endsWith(".js"))
                .map(commandName => require(Path.resolve(COMMANDS_PATH, categoryName, commandName)))
                .map(obj => obj.default)
        )
    });

    const startedCommands: {[key: string]: boolean} = {};

    bot.client.on("messageCreate", async msg => {
        if (msg.author.bot || !startsWithPrefix(msg.content)) return;

        const splittedContent = msg.content.slice(BOT_PREFIX.length).split(" ");
        const commandName = splittedContent[0];
        const command = findCommand(bot, commandName);

        if (!command) return;

        if (startedCommands[msg.member!.id]) {
            await Message.replyWithoutMention(msg, getLocale("wait_for_the_previous_command_to_finish"));
            return;
        }

        startedCommands[msg.member!.id] = true;

        try {
            await command.run(msg, bot, splittedContent.slice(1));
        } catch (error) {
            logger.error(error);
        }

        delete startedCommands[msg.member!.id];
    });
}