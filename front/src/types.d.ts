export interface Artist {
    _id: string;
    name: string;
    information: string;
    image: string
}

export interface Album {
    _id: string;
    title: string;
    artist: Artist;
    releasedAt: number;
    image: string
}

export interface Track {
    _id: string;
    title: string;
    album: string;
    length: string;
    ordNumber: number
}

export interface RegistrationMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string
}

export interface UserResponse {
    message: string;
    user: User
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _name: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string
}

export interface TrackHistory {
    _id: string;
    user: string;
    track: Track;
    artist: Artist;
    datetime: string;
}

export interface HistoryMutation {
    track: string;
}

export interface ApiArtist {
    name: string;
    information: string;
    image: File | null;
}

export interface ApiAlbum {
    title: string;
    artist: string;
    releasedAt: string;
    image: File | null
}

export interface ApiTrack {
    title: string;
    album: string;
    length: string;
    ordNumber: string;
}