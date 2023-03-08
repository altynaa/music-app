import mongoose, {Types} from "mongoose";
import {Schema} from "mongoose";
import User from "./User";

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    information: String,
    isPublished: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: (value: Types.ObjectId) => User.findOne(value),
            message: 'User was not found'
        }
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;