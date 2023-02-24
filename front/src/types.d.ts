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