import { Schema } from "mongoose";

export type ServerFile = {
    name: string;
    mimeType: string;
    size: string
}

export var UserSchema: Schema = new Schema({
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String
  });