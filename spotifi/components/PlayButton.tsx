"use client";

import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Song } from "@/types";
import { useAudioPlayer, useAudioPlayerContext } from "react-use-audio-player";

interface PlayButtonProps {
    song: Song
}

const PlayButton = ({  song }: PlayButtonProps) => {
    const { togglePlayPause, isPlaying, load, src }= useMusicPlayer();

    if (!song.owned) {
        return null;
    }

    console.log("PlayButton render - isPlaying:", isPlaying, "src:", src, "song.mp3:", song.mp3);

    return (
        <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl" onClick={(e) => {
            e.stopPropagation();
            if (song.owned) {
                if (!isPlaying || src !== song.mp3) {
                    load(song.mp3, { onload: () => {
                        togglePlayPause();
                    }});
                } else {
                    togglePlayPause();
                }
            }}}>
            {(isPlaying && src === song.mp3) ? (
                <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="text-black">
                    <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                </svg>
            ) : (
                <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="text-black">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                </svg>
            )}
        </div>
    )
};

export default PlayButton;