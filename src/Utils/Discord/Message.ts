import Discord from "discord.js";

export function replyWithoutMention(message: Discord.Message, ReplyMessageOptions: Discord.MessageReplyOptions | string) {
    const options = typeof ReplyMessageOptions === "object" ? ReplyMessageOptions : {content: ReplyMessageOptions};

    return message.reply({
        ...options,
        allowedMentions: {
            repliedUser: false
        }
    });
}

export function editWithoutMention(message: Discord.Message, ReplyMessageOptions: Discord.MessageReplyOptions | string) {
    const options = typeof ReplyMessageOptions === "object" ? ReplyMessageOptions : {content: ReplyMessageOptions};

    return message.edit({
        ...options,
        allowedMentions: {
            repliedUser: false
        }
    });
}