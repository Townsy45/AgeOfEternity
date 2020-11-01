import {DMChannel, Message, MessageCollector, MessageCollectorOptions, TextChannel, User} from "discord.js";

export interface GetInputOptions extends MessageCollectorOptions {
    channel: TextChannel | DMChannel,
    user: User
}

abstract class Command {
    abstract label: string

    abstract async main(msg: Message): Promise<any>

    getInput(options: GetInputOptions): Promise<Message> {
        return new Promise<Message>((res, rej) => {
            const collector = new MessageCollector(options.channel, (msg: Message) => msg.author.id === options.user.id, options)

            collector.on('collect', (msg: Message) => {
                res(msg)
            })
            collector.on('end', (_, reason: string) => {
                rej(reason)
            })
        })
    }

    async getDMChannel(user: User): Promise<DMChannel> {
        if (user.dmChannel) return user.dmChannel
        else return user.createDM()
    }
}

export default Command