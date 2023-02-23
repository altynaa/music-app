import express from "express";
import User from "../models/User";
import {ITrackHistory} from "../types";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";

const track_historiesRouter = express.Router();

track_historiesRouter.post('/', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Wrong token'});
    }
    const trackHistoryData: ITrackHistory = {
        user: user._id.toString(),
        track: req.body.track,
        datetime: new Date(),
    };

    const trackHistory = new TrackHistory(trackHistoryData);
    try {
        await trackHistory.save();
        return res.send(trackHistory);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            next(e);
        }
    }


});

export default track_historiesRouter;