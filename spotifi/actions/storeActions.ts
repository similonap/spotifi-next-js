"use server";

import { getCurrentUser } from "./authActions";
import { getAllSongs, getSongById } from "@/database/store";
import { updateUser } from "@/database/auth";
import { revalidatePath } from "next/cache";

export const buySong = async (songId: number) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("You must be logged in to buy a song");
    }
    console.log("User attempting to buy song:", user.id, songId);
    const song = await getSongById(songId);
    if (!song) {
        throw new Error("Song not found");
    }

    if (user.library.includes(songId)) {
        throw new Error("You already own this song");
    }

    if (user.credits < song.credits) {
        throw new Error("Insufficient credits");
    }

    const newCredits = user.credits - song.credits;
    const newLibrary = [...user.library, songId];

    await updateUser(user.id, { credits: newCredits, library: newLibrary });

    revalidatePath("/dashboard");
    return { success: true };
}


export const getAllSongsWithOwnership = async (q: string = "") => {
    const songs = await getAllSongs(q);
    const user = await getCurrentUser();

    if (!user) {
        return songs;
    }

    return songs.map(song => ({
        ...song,
        owned: user.library.includes(song.id),
    }));
}
