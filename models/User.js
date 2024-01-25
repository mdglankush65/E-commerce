import { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

export const User = models.User || model('User', UserSchema);