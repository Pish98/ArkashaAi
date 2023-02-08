import Discord from "discord.js";

export interface IModule {
    initialize(bot: IBot): void
}


export type LocalizedTextField = string | ((key: string) => string);

export interface ILocale {
    [key: string]: { [key: string]: string }
}

export interface ICommand {
    name: string
    category: string
    aliases: string[]
    use: LocalizedTextField[]
    description: LocalizedTextField | null
    onlyCreator: boolean
    permission: LocalizedTextField | null
    run(msg: Discord.Message, bot: IBot, args: string[]): Promise<void>
}

export interface IBot {
    client: Discord.Client
    modules: IModule[]
    commands: ICommand[]
}