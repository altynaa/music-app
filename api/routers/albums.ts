import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        if (req.query.artist) {
            const albums = await Album.find({artist: req.query.artist}).sort({releasedAt: -1});
            res.send(albums);
        } else {
            const albums = await Album.find().sort({releasedAt: -1});
            return res.send(albums);
        }
    } catch {
        return res.sendStatus(500);
    }
});

albumsRouter.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');
        if (!album) {
            return res.sendStatus(400);
        }
        return res.send(album);
    } catch {
        return res.sendStatus(500);
    }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        if (!user) {
            return {error: 'Please log in to submit album'}
        }

        const album = await Album.create({
            title: req.body.title,
            artist: req.body.artist,
            releasedAt: req.body.releasedAt,
            image: req.file ? req.file.filename : null,
            isPublished: false
        });

        return res.send(album);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

export default albumsRouter;