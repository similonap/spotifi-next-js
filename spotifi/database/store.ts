import { Collection, MongoClient } from "mongodb";
import { Song } from "@/types"

import data from "@/data.json";

const client = new MongoClient(process.env.MONGODB_URI!);

export const songsCollection: Collection<Song> = client.db("spotifi").collection<Song>("songs");

export const seedSongs = async () => {
    let songs: Song[] = data;
    await songsCollection.deleteMany({});
    if (await songsCollection.countDocuments() === 0) {
        songsCollection.insertMany(songs);
        console.log("Seeded songs collection");
    }
    console.log("Songs collection seeded!");
}

export const getAllSongs = async (): Promise<Song[]> => {
    return await songsCollection.find().toArray();
}

export const getSongByVideoId = async (video_id: string): Promise<Song | null> => {
    return await songsCollection.findOne<Song>({ video_id });
}