import {Client} from 'discord.js'
import * as mongoose from 'mongoose'

import logger from "./logger";
import env from "./env";
import commands from "./cmds";

mongoose.connect(`mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@cluster0.frktl.mongodb.net/db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(_ => {
    logger.info('Connected to the DB!')
})
const client = new Client()

client.on('ready', () => {
    logger.info('Bot Started!')
})

client.on('message', async msg => {
    if (msg.author.bot) return
    if (!msg.content.startsWith('a!')) return;

    for (const command of commands) {
        const msgCommand = msg.content.substring(2, command.label.length + 2) // Get only command part of msg

        if (command.label === msgCommand) { await command.main(msg); return }
    }
})

client.login(env.DISCORD_TOKEN).then(_ => {
    logger.info(`Bot logged in with token: ${env.DISCORD_TOKEN}`)
})
