export interface Artist {
    _id: string;
    name: string;
    information: string;
    image: string
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    releasedAt: number;
    image: string
}