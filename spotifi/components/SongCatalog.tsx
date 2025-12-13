
import { Song } from "@/types";
import { getAllSongsWithOwnership } from "@/actions/storeActions";
import SongView from "./SongView";

interface SongCatalogProps {
    q: string;
}

const SongCatalog = async({q} : SongCatalogProps) => {

    let songs: Song[] = await getAllSongsWithOwnership(q);
    

    return (
        <div>   
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {songs.map((song) => (
                    <SongView song={song} key={song.id} />
                ))}
            </div>
        </div>
    )
};

export default SongCatalog;