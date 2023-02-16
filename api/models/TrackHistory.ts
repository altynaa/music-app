import {model, Schema, Types} from "mongoose";
import User from "./User";
import Track from "./Track";

const TrackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User was not found'
        },
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Track.findById(value),
            message: 'Track was not found'
        }
    },
    datetime: {
        type: Date,
        required: true
    }
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);
export default TrackHistory;