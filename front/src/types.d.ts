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
    password: string
}

export interface RegisterResponse {
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