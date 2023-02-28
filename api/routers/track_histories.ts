import express from "express";
import {ITrackHistory} from "../types";
import auth, {RequestWithUser} from "../middleware/auth";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Track";
import Album from "../models/Album";
import mongoose from "mongoose";

const track_historiesRouter = express.Router();

track_historiesRouter.post('/', auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    const track = await Track.findById(req.body.track);

    if (track) {
        const album = await Album.findById(track.album.toString());

        try {
            const trackHistoryData: ITrackHistory = {
                user: user._id.toString(),
                track: req.body.track,
                datetime: new Date(),
                artist: album?.artist.toString()
            };
            const trackHistory = new TrackHistory(trackHistoryData);
            await trackHistory.save();

            return res.send({message: 'Track was listened', trackHistory})
        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(e);
            } else {
                next(e);
            }
        }
    } else {
        throw new Error('Track was not found');
    }
});

track_historiesRouter.get('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const tracksHistoryOfUser = await TrackHistory.find({user}).populate('user').populate('artist').populate('track').sort({datetime: -1});

        return res.send(tracksHistoryOfUser);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            next(e);
        }
    }
});

export default track_historiesRouter;