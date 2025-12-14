"use client";

import { createContext, useContext } from "react";
import { AudioLoadOptions, useAudioPlayer } from "react-use-audio-player";

interface MusicPlayerContext {
    isPlaying: boolean;
    load: (url: string, args_1: AudioLoadOptions | undefined) => void
    togglePlayPause: () => void;
    src: string | null;
}

export const MusicPlayerContext = createContext<MusicPlayerContext>({
    isPlaying: false,
    load: () => {},
    togglePlayPause: () => {},
    src: ""
});

const MusicPlayerContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { load, togglePlayPause, isPlaying, src } = useAudioPlayer();

    return (
        <MusicPlayerContext.Provider value={{
            load: load,
            togglePlayPause: togglePlayPause,
            isPlaying: isPlaying,
            src: src
        }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => {
    const context = useContext(MusicPlayerContext);
    if (!context) {
        throw new Error("useMusicPlayer must be used within a MusicPlayerContextProvider");
    }
    return context;
};

export default MusicPlayerContextProvider;