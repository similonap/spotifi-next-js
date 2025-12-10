import { getAllSongs } from "@/database/store";
import { Song } from "@/types";
import Image from "next/image";

const AllSongsView = async() => {
    let songs: Song[] = await getAllSongs();

    return (
        <div className="p-4">   
            <h1 className="text-2xl font-bold mb-4">All Songs</h1>
            <ul className="space-y-4">
                {songs.map((song) => (
                    <li key={song.video_id} className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <Image src={`/thumbnails/${song.video_id}.jpg`} alt={song.title} width={200} height={200} className="mb-2 rounded"/>
                        <h2 className="text-xl font-semibold">{song.title}</h2>
                        <p className="text-gray-600">{song.description}</p>
                        <p className="text-sm text-gray-500">Credits: {song.credits}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default AllSongsView;