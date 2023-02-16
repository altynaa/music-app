import express from "express";
import User from "../models/User";

const track_historiesRouter = express.Router();

track_historiesRouter.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Wrong token'});
    }

    return res.send({
        user: user._id,
        track: req.body.track,
        datetime: new Date(),
    });
});

export default track_historiesRouter;