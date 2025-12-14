"use server";

import { getCurrentUser } from "./authActions";
import { getSongs as getSongsFromDb, getSongById, addCoinsToUser } from "@/database/store";
import { updateUser } from "@/database/auth";
import { revalidatePath } from "next/cache";
import { SortField } from "@/types";
import { SortDirection } from "mongodb";
import { redirect } from "next/navigation";


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

interface BuyCreditsState {
    success: boolean;
    error: string;
}

export const buyCredits = async(prevState: BuyCreditsState, formData: FormData): Promise<BuyCreditsState> => {
    const currentUser = await getCurrentUser();

    const amount = parseInt(formData.get("amount")?.toString() || "0");

    if (amount >= 500) {
        return { 
            error: "Balance limit exceeded. You can only buy up to 500 credits at a time.",
            success: false
        }
    }

    await addCoinsToUser(currentUser!.id, amount);

    revalidatePath("/songs");
    redirect("/songs");

    return {
        error: "",
        success: true
    };
}