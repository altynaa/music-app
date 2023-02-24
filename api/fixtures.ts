import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Track from "./models/Track";
import Album from "./models/Album";
import User from "./models/User";
import {randomUUID} from "crypto";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections are not present, skipping drop');
    }

    const [beyonceArtist, rihannaArtist] = await Artist.create({
        name: "Beyonce",
        image: "fixtures/beyonce.jpg",
        information: "Grammy awarded artist"
    }, {
        name: "Rihanna",
        image: "fixtures/rihanna.jpeg",
        information: "The legend from Barbados"
    });


    const [birthdayAlbum, fourAlbum, gggbAlbum, antiAlbum] = await Album.create({
        title: "Birthday",
        artist: beyonceArtist._id,
        releasedAt: 2006,
        image: "fixtures/bday.png"
    }, {
        title: "4",
        artist: beyonceArtist._id,
        releasedAt: 2011,
        image: "fixtures/4.jpg"
    }, {
        title: "Good Girl Gone Bad",
        artist: rihannaArtist._id,
        releasedAt: 2007,
        image: "fixtures/gggb.png"
    }, {
        title: "Anti",
        artist: rihannaArtist._id,
        releasedAt: 2016,
        image: "fixtures/anti.png"
    });


    await Track.create({
        title: "Deja Vu",
        album: birthdayAlbum._id,
        length: "4:00",
        ordNumber: 1
    }, {
        title: "Get Me Bodied",
        album: birthdayAlbum._id,
        length: "3:25",
        ordNumber: 2
    }, {
        title: "Suga Mama",
        album: birthdayAlbum._id,
        length: "3:25",
        ordNumber: 3
    }, {
        title: "Upgrade U",
        album: birthdayAlbum._id,
        length: "4:32",
        ordNumber: 4
    }, {
        title: "Ring The Alarm",
        album: birthdayAlbum._id,
        length: "3:23",
        ordNumber: 5
    }, {
        title: "1+1",
        album: fourAlbum._id,
        length: "4:32",
        ordNumber: 1
    }, {
        title: "I Care",
        album: fourAlbum._id,
        length: "4:00",
        ordNumber: 2
    }, {
        title: "I Miss You",
        album: fourAlbum._id,
        length: "2:58",
        ordNumber: 3
    }, {
        title: "Best Thing I Never Had",
        album: fourAlbum._id,
        length: "4:13",
        ordNumber: 4
    }, {
        title: "Party",
        album: fourAlbum._id,
        length: "4:04",
        ordNumber: 5
    }, {
        title: "Umbrella",
        album: gggbAlbum._id,
        length: "4:35",
        ordNumber: 1
    }, {
        title: "Push Up On Me",
        album: gggbAlbum._id,
        length: "3:35",
        ordNumber: 2
    }, {
        title: "Dont Stop The Music",
        album: gggbAlbum._id,
        length: "4:27",
        ordNumber: 3
    }, {
        title: "Breaking Dishes",
        album: gggbAlbum._id,
        length: "3:20",
        ordNumber: 4
    }, {
        title: "Shut Up And Drive",
        album: gggbAlbum._id,
        length: "3:32",
        ordNumber: 5
    }, {
        title: "Consideration",
        album: antiAlbum._id,
        length: "3:20",
        ordNumber: 1
    }, {
        title: "James Joint",
        album: antiAlbum._id,
        length: "1:12",
        ordNumber: 2
    }, {
        title: "Kiss It Better",
        album: antiAlbum._id,
        length: "4:13",
        ordNumber: 3
    }, {
        title: "Work",
        album: antiAlbum._id,
        length: "3:39",
        ordNumber: 4
    }, {
        title: "Desperado",
        album: antiAlbum._id,
        length: "3:06",
        ordNumber: 5
    });

    await User.create({
        username: "Jane Smith",
        password: "Janepassword",
        token: randomUUID()
    }, {
        username: "John Smith",
        password: "Johnpassword",
        token: randomUUID()
    });

    await db.close();
};

void run();