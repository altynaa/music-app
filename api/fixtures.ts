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

    const [janeUser, johnUser] = await User.create({
        username: "Jane Smith",
        password: "Janepassword",
        token: randomUUID(),
        role: 'admin'
    }, {
        username: "John Smith",
        password: "Johnpassword",
        token: randomUUID(),
        role: 'user'
    });

    const [beyonceArtist, rihannaArtist, btsArtist] = await Artist.create({
        name: "Beyonce",
        image: "fixtures/beyonce.jpg",
        information: "Grammy awarded artist",
        isPublished: true,
        user: janeUser._id
    }, {
        name: "Rihanna",
        image: "fixtures/rihanna.jpeg",
        information: "The legend from Barbados",
        isPublished: true,
        user: johnUser._id
    }, {
        name: "BTS",
        image: "fixtures/rihanna.jpeg",
        information: "K-POP band",
        isPublished: false,
        user: johnUser._id
    });


    const [birthdayAlbum, fourAlbum, gggbAlbum, antiAlbum, sevenAlbum] = await Album.create({
        title: "Birthday",
        artist: beyonceArtist._id,
        releasedAt: 2006,
        image: "fixtures/bday.png",
        isPublished: true,
        user: janeUser._id
    }, {
        title: "4",
        artist: beyonceArtist._id,
        releasedAt: 2011,
        image: "fixtures/4.jpg",
        isPublished: true,
        user: johnUser._id
    }, {
        title: "Good Girl Gone Bad",
        artist: rihannaArtist._id,
        releasedAt: 2007,
        image: "fixtures/gggb.png",
        isPublished: true,
        user: janeUser._id,
    }, {
        title: "Anti",
        artist: rihannaArtist._id,
        releasedAt: 2016,
        image: "fixtures/anti.png",
        isPublished: true,
        user: johnUser._id
    }, {
        title: "7",
        artist: btsArtist._id,
        releasedAt: 2016,
        image: "fixtures/anti.png",
        isPublished: false,
        user: johnUser._id
    });


    await Track.create({
        title: "Deja Vu",
        album: birthdayAlbum._id,
        length: "4:00",
        ordNumber: 1,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "Get Me Bodied",
        album: birthdayAlbum._id,
        length: "3:25",
        ordNumber: 2,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "Suga Mama",
        album: birthdayAlbum._id,
        length: "3:25",
        ordNumber: 3,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "Upgrade U",
        album: birthdayAlbum._id,
        length: "4:32",
        ordNumber: 4,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "Ring The Alarm",
        album: birthdayAlbum._id,
        length: "3:23",
        ordNumber: 5,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "1+1",
        album: fourAlbum._id,
        length: "4:32",
        ordNumber: 1,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "I Care",
        album: fourAlbum._id,
        length: "4:00",
        ordNumber: 2,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "I Miss You",
        album: fourAlbum._id,
        length: "2:58",
        ordNumber: 3,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "Best Thing I Never Had",
        album: fourAlbum._id,
        length: "4:13",
        ordNumber: 4,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "Party",
        album: fourAlbum._id,
        length: "4:04",
        ordNumber: 5,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "Umbrella",
        album: gggbAlbum._id,
        length: "4:35",
        ordNumber: 1,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "Push Up On Me",
        album: gggbAlbum._id,
        length: "3:35",
        ordNumber: 2,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "Dont Stop The Music",
        album: gggbAlbum._id,
        length: "4:27",
        ordNumber: 3,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "Breaking Dishes",
        album: gggbAlbum._id,
        length: "3:20",
        ordNumber: 4,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "Shut Up And Drive",
        album: gggbAlbum._id,
        length: "3:32",
        ordNumber: 5,
        isPublished: true,
        user: janeUser._id
    }, {
        title: "Consideration",
        album: antiAlbum._id,
        length: "3:20",
        ordNumber: 1,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "James Joint",
        album: antiAlbum._id,
        length: "1:12",
        ordNumber: 2,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "Kiss It Better",
        album: antiAlbum._id,
        length: "4:13",
        ordNumber: 3,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "Work",
        album: antiAlbum._id,
        length: "3:39",
        ordNumber: 4,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "Desperado",
        album: antiAlbum._id,
        length: "3:06",
        ordNumber: 5,
        isPublished: true,
        user: johnUser._id
    }, {
        title: "Intro: Persona",
        album: sevenAlbum._id,
        length: "3:06",
        ordNumber: 1,
        isPublished: false,
        user: johnUser._id
    }, {
        title: "Boy With Luv",
        album: sevenAlbum._id,
        length: "3:49",
        ordNumber: 2,
        isPublished: false,
        user: johnUser._id
    }, {
        title: "Make it Right",
        album: sevenAlbum._id,
        length: "3:42",
        ordNumber: 3,
        isPublished: false,
        user: johnUser._id
    });



    await db.close();
};

void run();