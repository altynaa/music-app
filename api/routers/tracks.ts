import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

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

tracksRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const track = await Track.findById(req.params.id);

        if (!user) {
            return res.send({error: 'Please log in to delete'});
        }
        if (!track) {
            return res.send({error: 'Track was not found'});
        }
        if (user.role === 'admin' || user._id.toString() === track.user._id.toString() && track.isPublished === false) {
            const deleteTrack = await Track.findById(req.params.id);
            if (deleteTrack) {
                return res.send({message: 'Track was deleted'});
            }
        } else {
            return res.status(403).send({error: 'No authorization to delete'});
        }

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            next(e);
        }
    }
})

export default tracksRouter;