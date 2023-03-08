import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        if (req.query.album) {
            const tracks = await Track.find({album: req.query.album}).sort({ordNumber: 1});
            return res.send(tracks);
        } else {
            const tracks = await Track.find().sort({ordNumber: 1});
            return res.send(tracks);
        }
    } catch {
        return res.sendStatus(500);
    }
});

tracksRouter.post('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        if (!user) {
            return {error: 'Please log in to submit track'};
        }

        const track = await Track.create({
            title: req.body.title,
            album: req.body.album,
            length: req.body.length,
            ordNumber: req.body.ordNumber,
            isPublished: false
        });

        return res.send(track);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            next(e);
        }
    }
});

export default tracksRouter;