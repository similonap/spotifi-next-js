import { Collection, MongoClient } from "mongodb";
import { Song } from "@/types"


const client = new MongoClient(process.env.MONGODB_URI!);

export const songsCollection: Collection<Song> = client.db("spotifi").collection<Song>("songs");

export const seedSongs = async () => {

    const response = await fetch("https://sampleapis.assimilate.be/music/songs");
    const data: Song[] = await response.json();


    let songs: Song[] = data;
    await songsCollection.deleteMany({});
    if (await songsCollection.countDocuments() === 0) {
        songsCollection.insertMany(songs);
        console.log("Seeded songs collection");
    }
    console.log("Songs collection seeded!");
}

export const getAllSongs = async (q: string): Promise<Song[]> => {
    if (q) {
        const regex = new RegExp(q, 'i');
        return makeLean<Song[]>(await songsCollection.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
            ]
        }).toArray());
    } else {
        return makeLean<Song[]>(await songsCollection.find().toArray());
    }
}

export const getSongById = async (songId: number): Promise<Song | null> => {
    return makeLean<Song | null>(await songsCollection.findOne<Song>({ id: songId }));
}

const makeLean = <T,>(obj: any): T => {
    return JSON.parse(JSON.stringify(obj)) as T;
}