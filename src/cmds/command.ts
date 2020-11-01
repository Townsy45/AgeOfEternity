import {Message} from "discord.js";

abstract class Command {
    abstract label: string

    abstract async main(msg: Message): Promise<any>
}

export default Command