
import { Song, SortField, SortDirection } from "@/types";
import { getSongs } from "@/actions/storeActions";
import SongView from "./SongView";
import Pagination from "./Pagination";
import { PAGE_SIZE } from "@/database/store";

interface SongCatalogProps {
    q: string;
    sortDirection: SortDirection;
    sortField: SortField;
    page: number;
}

const SongCatalog = async({q, sortDirection = "asc", sortField = "title", page = 1} : SongCatalogProps) => {

    let {songs, pages} = await getSongs(q, sortField, sortDirection, page );

    return (
        <div>   
            <Pagination currentPage={page} pageCount={pages}/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {songs.map((song) => (
                    <SongView song={song} key={song.id} />
                ))}
            </div>
        </div>
    )
};

export default SongCatalog;