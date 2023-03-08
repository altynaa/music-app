import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);

    } catch {
        return res.sendStatus(500)
    }
});

artistsRouter.get('/:id', async (req, res) => {
    try {
        const artists = await Artist.findById(req.params.id);
        return res.send(artists);

    } catch {
        return res.sendStatus(500)
    }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        if (!user) {
            return {error: 'Please log in to submit artist'}
        }

        const artist = await Artist.create({
            name: req.body.name,
            image: req.file ? req.file.filename : null,
            information: req.body.information,
            isPublished: false,
        });

        return res.send(artist);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

export default artistsRouter;