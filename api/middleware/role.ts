import {HydratedDocument} from "mongoose";
import {IUser} from "../types";
import {NextFunction, Request, Response} from "express";
import User from "../models/User";

export interface RequestWithUser extends Request {
    user: HydratedDocument<IUser>
}

const role = async (expressReq: Request, res: Response, next: NextFunction) => {
    const req = expressReq as RequestWithUser;
    const token = req.get('Authorization');

    if (!token) {
        return next();
    }
    const user = await User.findOne({token});

    if (!user) {
        return next();
    }
    req.user = user;
    return next();
}

export default role;