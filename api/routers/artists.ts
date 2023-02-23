import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {IArtist} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);

    } catch {
        return res.sendStatus(500)
    }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const artistData: IArtist = {
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        information: req.body.information
    };
    const artist = new Artist(artistData);

    try {
        await artist.save();
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