import {IBot, ICommand} from "../../basic_types";
import Discord from "discord.js";
import * as Message from "../../Utils/Discord/Message";
import {getLocale, wrapLocale} from "../../Utils/locales";

const command: ICommand = {
    aliases: [],
    use: [],
    category: "General",
    name: "ping",
    onlyCreator: false,
    permission: null,
    description: wrapLocale("ping_command_description"),
    async run(msg: Discord.Message, bot: IBot, args: string[]) {
        const startTime = Date.now();
        const botMsg = await Message.replyWithoutMention(msg, `${getLocale("pong")}!`);

        await Message.editWithoutMention(botMsg, `${getLocale("pong")}! ${Date.now() - startTime}ms`);
    }
};

export default command;