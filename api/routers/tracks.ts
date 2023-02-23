import express from "express";
import Track from "../models/Track";
import {ITrack} from "../types";
import mongoose from "mongoose";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        if (req.query.album) {
            const tracks = await Track.find({album: req.query.album});
            return res.send(tracks);
        } else {
            const tracks = await Track.find();
            return res.send(tracks);
        }
    } catch {
        return res.sendStatus(500);
    }
});

tracksRouter.post('/', async (req, res, next) => {
    const trackData: ITrack = {
        title: req.body.title,
        album: req.body.album,
        length: req.body.length
    };

    const track = new Track(trackData);
    try {
        await track.save();
        return res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else  {
            next(e);
        }
    }
});

export default tracksRouter;