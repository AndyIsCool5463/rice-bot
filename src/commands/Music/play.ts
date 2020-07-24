import { Message } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";

export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "play",
            description: "Adds music to the queue.",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        return message.channel.send("MUSIC NOT IMPLEMENTED.");
    }
}
