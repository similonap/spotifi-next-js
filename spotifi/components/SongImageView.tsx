"use client";

import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";
import BuyButton from "./BuyButton";

interface SongImageViewProps {
    song: Song;
}

const SongImageView = ({ song }: SongImageViewProps) => {
    return (
        <div>
            <Image
                src={song.thumbnail}
                alt={song.title}
                
                width={200}
                height={200}
                className="w-full aspect-square object-contain rounded-md"
            />
            <div className="absolute bottom-2 right-2">
                <PlayButton song={song} />
            </div>
            {song.owned ? (
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                    Owned
                </div>
            ) : (
                <BuyButton songId={song.id} price={song.credits} />
            )}
        </div>
    );
};

export default SongImageView;