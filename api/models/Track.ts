import mongoose, {Types} from "mongoose";
import {Schema} from "mongoose";
import Album from "./Album";
import User from "./User";

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
    },
    ordNumber: {
        type: Number,
        required: true
    },
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

const Track = mongoose.model('Track', TrackSchema);
export default Track;