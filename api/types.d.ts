export interface ArtistApi {
    name: string,
    image: string | null,
    information: string
}

export interface AlbumApi {
    title: string,
    artist: string,
    releasedAt: string,
    image: string | null
}

export interface TrackApi {
    title: string,
    album: string,
    length: string
}

export interface IUser {
    username: string;
    password: string;
    token: string;
}


