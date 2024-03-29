import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import role from "../middleware/role";
import Album from "../models/Album";

const artistsRouter = express.Router();

artistsRouter.get('/', role, async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;
        if (!user || user.role != 'admin') {
            const artists = await Artist.find({isPublished: true}).populate('user');
            return res.send(artists);
        } else {
            const artists = await Artist.find().populate('user');
            return res.send(artists);
        }
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

        const artist = await Artist.create({
            name: req.body.name,
            image: req.file ? req.file.filename : null,
            information: req.body.information,
            isPublished: false,
            user: user._id.toString()
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

artistsRouter.delete('/:id', auth, permit('user', 'admin'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const artist = await Artist.findById(req.params.id);


        if (!artist) {
            return res.status(400).send({error: 'Artist was not found'});
        }
        if (user.role === 'admin' || user._id.toString() === artist.user._id.toString() && artist.isPublished === false) {
            const findArtist = await Album.find({artist: req.params.id});
            if (findArtist.length > 0) {
                return res.status(403).send({error: 'Delete was rejected. This artist has connected albums', id: req.params.id})
            } else {
                const deleteArtist = await Artist.findByIdAndRemove(req.params.id);
                if (deleteArtist) {
                    return res.send({message: 'Deleted successfully'});
                }
            }
        }
        return res.status(403).send({error: 'No authorization to delete'});

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(400).send({error: 'Artist was not found'});
        }
        let newArtist;

        if (artist.isPublished === true) {
            newArtist = {
                isPublished: false
            }
        } else {
            newArtist = {
                isPublished: true
            }
        }
        const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, newArtist);
        return res.send(updatedArtist);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
})

export default artistsRouter;