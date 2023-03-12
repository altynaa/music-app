import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import role from "../middleware/role";
import Track from "../models/Track";

const albumsRouter = express.Router();

albumsRouter.get('/', role, async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;

        if (req.query.artist) {
            if (!user || user.role != 'admin') {
                const albums = await Album.find({artist: req.query.artist, isPublished: true}).sort({releasedAt: -1});
                res.send(albums);
            } else {
                const albums = await Album.find({artist: req.query.artist}).sort({releasedAt: -1});
                res.send(albums);
            }

        } else {
            if (!user || user.role != 'admin') {
                const albums = await Album.find({isPublished: true}).sort({releasedAt: -1});
                return res.send(albums);
            } else {
                const albums = await Album.find().sort({releasedAt: -1});
                return res.send(albums);
            }
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
            isPublished: false,
            user: user._id.toString()
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

albumsRouter.delete('/:id', auth, permit('user', 'admin'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const album = await Album.findById(req.params.id).populate('user');

        if (!user) {
            return res.send({error: 'Please log in to delete user'});
        }
        if (!album) {
            return res.send({error: 'Album was not found'});
        }
        if (user.role === 'admin' || user._id.toString() === album.user._id.toString() && album.isPublished === false) {
            const findAlbum = await Track.find({album: req.params.id});
            if (findAlbum.length > 0) {
                return res.send({error: 'Delete denied. This album has connected tracks'});
            } else {
                const deleteAlbum = await Album.findByIdAndRemove(req.params.id);
                if (deleteAlbum) {
                    return res.send({message: 'Album was deleted'});
                }
            }

        } else {
            return res.status(403).send({error: 'No authorization to delete'});
        }
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
    const album = await Album.findById(req.params.id);


    if (!album) {
        return res.send({error: 'Album was not found'});
    }
    let newAlbum;

    if (album.isPublished === true) {
       newAlbum = {
           isPublished: false
       }
    } else {
        newAlbum = {
            isPublished: true
        }
    }
    const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, newAlbum);
    return res.send(updatedAlbum);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } return next(e);
    }
})

export default albumsRouter;