import mongoose, {Types} from "mongoose";
import {Schema} from "mongoose";
import Album from "./Album";

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Album.findById(value),
            message: 'Album was not found'
        },
    },
    length: {
        type: String,
        required: true
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;