import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    img: {
        public_id: String,
        url: String
    }
});

export const Note = mongoose.model("notes", noteSchema)