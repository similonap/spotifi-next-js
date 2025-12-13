import { Song } from "@/types";
import SongImageView from "./SongImageView";

interface SongViewProps {
    song: Song;
}

const SongView = ({ song }: SongViewProps) => {
    return (
        <div key={song.id} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors duration-300 cursor-pointer group">
            <div className="relative mb-4">
                <SongImageView song={song} />
            </div>
            <h2 className="text-base font-bold mb-1 truncate" title={song.title}>{song.title}</h2>
            <p className="text-sm text-[#a7a7a7] line-clamp-2 mb-2" title={song.description}>{song.description}</p>
            <div className="flex items-center justify-between text-xs text-[#a7a7a7] mt-auto">
                <span>{song.more_information.genre}</span>
                <span>{new Date(song.more_information.publish_date).getFullYear()}</span>
            </div>
        </div>
    )
}

export default SongView;