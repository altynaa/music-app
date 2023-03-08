import mongoose, {Types} from "mongoose";
import {Schema} from "mongoose";
import Artist from "./Artist";
import User from "./User";

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
    image: String,
    isPublished: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist'
        }
    }
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;