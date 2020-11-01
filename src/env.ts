import * as dotenv from 'dotenv'
import ProcessEnv = NodeJS.ProcessEnv

dotenv.config()

interface Env { // Fields for Typing
    DB_USERNAME: string,
    DB_PASSWORD: string,
    DISCORD_TOKEN: string
}

interface IEnv extends Env, ProcessEnv {} // Combine with ProcessEnv to add overlap for type-cast below

class CEnv implements Env {
    constructor(env: IEnv) {
        this.DB_USERNAME = env.DB_USERNAME
        this.DB_PASSWORD = env.DB_PASSWORD
        this.DISCORD_TOKEN = env.DISCORD_TOKEN
    }

    DB_USERNAME: string
    DB_PASSWORD: string
    DISCORD_TOKEN: string
}

const env = new CEnv(process.env as IEnv) // IDE Completion

export default env