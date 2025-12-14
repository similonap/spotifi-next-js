"use server";

import { getCurrentUser } from "./authActions";
import { getSongs as getSongsFromDb, getSongById } from "@/database/store";
import { updateUser } from "@/database/auth";
import { revalidatePath } from "next/cache";
import { SortField } from "@/types";
import { SortDirection } from "mongodb";

export const buySong = async (songId: number) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("You must be logged in to buy a song");
    }
    const song = await getSongById(songId, user.id);
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


export const getSongs = async (
    q: string = "",
    sortField: SortField,
    sortDirection: SortDirection,
    page: number
) => {
    const user = await getCurrentUser();
    const userId = user ? user.id : null;
    const songs = await getSongsFromDb(userId, q, sortField, sortDirection, page);
    return songs;
}
