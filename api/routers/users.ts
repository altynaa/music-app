import express from "express";
import User from "../models/User";
import mongoose from "mongoose";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import {imagesUpload} from "../multer";

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            image: req.file ? req.file.filename : null
        });
        user.generateToken();
        await user.save();
        res.send({message: 'Registered successfully', user});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

usersRouter.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username was not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'});
    }
    user.generateToken();
    await user.save();

    return res.send({message: 'Username and password are correct', user});
});

usersRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(400).send({error: 'Wrong token'});
        }

        const email = payload["email"];
        const googleId = payload["sub"];
        const displayName = payload["name"];
        const image = payload["picture"]

        if (!email) {
            return res.status(400).send({error: "Not enough data"});
        }

        let user = await User.findOne({googleId});

        if (!user) {
            user = new User({
                username: email,
                password: crypto.randomUUID(),
                displayName,
                googleId,
                image
            });
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'Login with Google was successful', user});
    } catch (e) {
        return next(e);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const success = {message: 'OK'};

        if (!token) {
            return res.send(success);
        }

        const user = await User.findOne({token});

        if (!user) {
            return res.send(success);
        }

        user.generateToken();
        await user.save();
        return res.send(success);
    } catch (e) {
        return  next (e);
    }
});

export default usersRouter;