export interface IArtist {
    name: string,
    image: string | null,
    information: string
}

export interface IAlbum {
    title: string,
    artist: string,
    releasedAt: string,
    image: string | null
}

export interface ITrack {
    title: string,
    album: string,
    length: string
}

export interface IUser {
    username: string;
    password: string;
    token: string;
}

export interface ITrackHistory {
    user: string,
    track: string,
    datetime: Date
}


