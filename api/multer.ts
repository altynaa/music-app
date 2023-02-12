import multer from "multer";
import {promises as fs} from 'fs';
import path from "path";
import {randomUUID} from "crypto";
import config from "./config";

const imagesUpload = multer.diskStorage({
    destination: async (_req, _file, cb) => {
        const destDir = path.join(config.publicPath, 'images');
        await fs.mkdir(destDir, {recursive: true});
        cb(null, config.publicPath);
    },
    filename: async (_req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, 'images/' + randomUUID() + extension);
    }
});

export default imagesUpload;