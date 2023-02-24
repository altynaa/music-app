import mongoose, {Types} from "mongoose";
import {Schema} from "mongoose";
import Artist from "./Artist";

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Artist.findById(value),
            message: 'Artist does not exist'
        }
    },
    releasedAt: {
        type: Number,
        required: true
    },
    image: String
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;