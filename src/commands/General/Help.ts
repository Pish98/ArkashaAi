import {ICommand} from "../../basic_types";
import * as Message from "../../Utils/Discord/Message";
import {BOT_PREFIX} from "../../config";
import lodashChunk from "lodash.chunk"
import * as Command from "../../Utils/Discord/Command";
import {getLocale, wrapLocale} from "../../Utils/locales";

const command: ICommand = {
    aliases: [],
    category: "General",
    description: wrapLocale("help_command_description"),
    name: "help",
    onlyCreator: false,
    permission: null,
    use: [],
    async run(msg, bot, args) {
        const commandName = args[0];

        if (commandName) {
            const cmd = Command.findCommand(bot, commandName);

            if (!cmd) {
                await Message.replyWithoutMention(msg, getLocale("this_command_does_not_exist"));
                return;
            }

            const canUse = Command.canUse(msg.member!, cmd);

            let text = [
                cmd.name,
                `**  ** - ${getLocale("available_to_you")}: \`${canUse[0] ? getLocale("Yes") : getLocale(canUse[1])}\``,
                `**  ** - ${getLocale("description")}: \`${getLocale(cmd.description || "") || getLocale("No")}\``,
                `**  ** - ${getLocale("alias")}: \`${cmd.aliases.map(it => BOT_PREFIX + it).join(", ") || getLocale("No")}\``
            ];

            if (cmd.use.length > 0) text.push(`**  ** - ${getLocale("examples")}:\n${cmd.use.map(it => `**      **\`• ${it}\``).join("\n")}`);

            await Message.replyWithoutMention(msg, text.join("\n"));
        } else {
            const commands = bot.commands;
            const categories = [...new Set(bot.commands.map(cmd => cmd.category))];

            const result = [
                `${getLocale("command_list")} [${bot.commands.length}]`,
                "`" + BOT_PREFIX + `help <command> - ${getLocale("detailed_information_about_command")}` + "`"
            ];

            categories.forEach(category => {
                const cmds = commands.filter(cmd => cmd.category === category).map(cmd => `**\`${cmd.name}\`**`);
                const splittedCmds = lodashChunk(cmds, 3);

                result.push(category + ` [${cmds.length}]`);

                splittedCmds.forEach(cmds => {
                    result.push(`**  ** - ${cmds.join(", ")}`);
                });
            });


            await Message.replyWithoutMention(msg, result.join("\n"));
        }
    }
};

export default command;