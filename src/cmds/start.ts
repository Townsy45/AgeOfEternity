import {Message} from "discord.js";
import logger from "../logger";
import Command from "./command";
import {Character, ICharacter} from "../models/character";

class Start extends Command {
    label: string = 'start'

    async main(msg: Message): Promise<void> {
        const dmChannel = await this.getDMChannel(msg.author)

        await msg.reply('Welcome to the world of Harodia! To create your character, check you DMs!')
        await dmChannel.send('Please send your name in this channel to get started!')
        const name = await this.getInput({
            user: msg.author,
            time: 60 * 1000,
            channel: await this.getDMChannel(msg.author)
        })
        await dmChannel.send(`Wow ${name.content}. That's a really good name!`)
        await msg.channel.send(`Please welcome ${name.content} to the world of Harodia`)

        const characterInfo: ICharacter = {
            name: name.content
        }

        await new Character(characterInfo).save(err => { if (err) logger.error(`Error while creating character: ${err}`) })
        logger.info(`Created character with name: ${name}!`)
    }
}

const start = new Start()
export default start