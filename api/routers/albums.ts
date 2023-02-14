import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import {AlbumApi} from "../types";
import {imagesUpload} from "../multer";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
    try {
        if (req.query.artist) {
            const albums = await Album.find({artist: req.query.artist});
            res.send(albums);
        } else {
            const albums = await Album.find();
            return res.send(albums);
        }
    } catch  {
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

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const albumData: AlbumApi = {
        title: req.body.title,
        artist: req.body.artist,
        releasedAt: req.body.releasedAt,
        image: req.file ? req.file.filename : null
    };
    const album = new Album(albumData);
    try {
        await album.save();
        return  res.send(album);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

export default albumsRouter;