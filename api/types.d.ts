export interface IArtist {
    name: string;
    image: string | null;
    information: string;
    isPublished: boolean
}

export interface IAlbum {
    title: string;
    artist: string;
    releasedAt: number;
    image: string | null;
    isPublished: boolean
}

export interface ITrack {
    title: string;
    album: string;
    length: string;
    ordNumber: number;
    isPublished: boolean
}

export interface IUser {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface ITrackHistory {
    user: string;
    track: string;
    datetime: Date;
    artist: string | undefined
}


