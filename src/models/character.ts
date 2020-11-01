import {Document, Schema, model} from "mongoose";

export interface ICharacter {
    name: string,
    dateCreated?: Date
}

interface CharacterDoc extends Document, ICharacter {}

const characterSchema = new Schema<ICharacter>({
    name: { type: String, required: true },
    dateCreated: { type: Date, required: true, default: Date.now() }
})

export const Character = model<CharacterDoc>('Character', characterSchema)
