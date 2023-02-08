import {IBot} from "../../basic_types";
import {logger} from "../../Utils/logger";

export function initialize(bot: IBot) {
    bot.client.on("ready", () => {
        logger.info(`Bot ${bot.client.user!.tag} has been started!`);
    });
}