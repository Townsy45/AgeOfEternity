import {Message} from "discord.js";
import logger from "../logger";
import Command from "./command";

class Start extends Command {
    label: string = 'start'

    async main(msg: Message): Promise<void> {
        logger.info('Start command has been run')
        await msg.reply("HOI")
    }
}

const start = new Start()
export default start