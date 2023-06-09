import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import role from "../middleware/role";
import TrackHistory from "../models/TrackHistory";

const tracksRouter = express.Router();

tracksRouter.get('/', role, async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;
        if (req.query.album) {
            if (!user || user.role != 'admin') {
                const tracks = await Track.find({album: req.query.album, isPublished: true}).sort({ordNumber: 1});
                return res.send(tracks);
            } else {
                const tracks = await Track.find({album: req.query.album}).sort({ordNumber: 1});
                return res.send(tracks);
            }
        } else {
            if (!user || user.role != 'admin') {
                const tracks = await Track.find({isPublished: true}).sort({ordNumber: 1});
                return res.send(tracks);
            } else {
                const tracks = await Track.find().sort({ordNumber: 1});
                return res.send(tracks);
            }
        }
    } catch {
        return res.sendStatus(500);
    }
});

tracksRouter.post('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const track = await Track.create({
            title: req.body.title,
            album: req.body.album,
            length: req.body.length,
            ordNumber: req.body.ordNumber,
            isPublished: false,
            user: user._id.toString()
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

        if (!track) {
            return res.send({error: 'Track was not found'});
        }
        if (user.role === 'admin' || user._id.toString() === track.user._id.toString() && track.isPublished === false) {
            const findTrack = await TrackHistory.find({track: req.params.id});
            if (findTrack.length > 0) {
                return res.status(403).send({error: 'Delete was rejected. This track was already listened by user'});

            } else {
                const deleteTrack = await Track.findByIdAndRemove(req.params.id);
                if (deleteTrack) {
                    return res.send({message: 'Track was deleted'});
                }
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
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try{
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.send({error: 'Track was not found'});
        }
        let newTrack;
        if (track.isPublished === true) {
            newTrack = {
                isPublished: false
            }
        } else {
            newTrack = {
                isPublished: true
            }
        }
        const updatedTrack = await Track.findByIdAndUpdate(req.params.id, newTrack);
        return res.send(updatedTrack);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            next(e);
        }
    }
})

export default tracksRouter;