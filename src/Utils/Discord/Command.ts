import {BOT_CREATORS, BOT_PREFIX} from "../../config";
import {IBot, ICommand, LocalizedTextField} from "../../basic_types";
import Discord from "discord.js";
import {wrapLocale} from "../locales";

export function startsWithPrefix(message: string) {
    return message?.startsWith(BOT_PREFIX);
}

export function findCommand(bot: IBot, name: string) {
    name = name.trim();

    return bot.commands.find(command => command.name === name || command.aliases.includes(name));
}

export function canUse(member: Discord.GuildMember, cmd: ICommand): [boolean, LocalizedTextField] {
    if (cmd.onlyCreator && !BOT_CREATORS.includes(member.id)) return [false, wrapLocale("you_are_not_a_bot_creator_of_this_bot")];

    // @ts-ignore
    if (cmd.permission && !member.permissions.has(cmd.permission)) return [false, wrapLocale("you_are_not_a_bot_creator_of_this_bot")];

    return [true, ""];
}