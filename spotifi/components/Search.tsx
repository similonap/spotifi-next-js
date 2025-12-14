"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEventHandler, useState } from "react";

const SearchBox = () => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const q: string = searchParams.get("q") ?? "";
    const [searchField, setSearchField] = useState<string>(q);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchField !== "") {
            params.set("q", searchField)
        } else {
            params.delete("q");
        }

        replace(`?${params.toString()}`)
    }

    return (
        <form
            onSubmit={onSubmit}
            className="relative mx-auto flex max-w-2xl items-center gap-3 rounded-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-[1px] shadow-lg shadow-black/50"
        >
            <div className="flex flex-1 items-center gap-3 rounded-full bg-neutral-950/80 px-5 py-3 backdrop-blur">
                <span className="text-neutral-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.65" y1="16.65" x2="21" y2="21" />
                    </svg>
                </span>
                <input
                    className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
                    type="search"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    placeholder="Search songs, artists, albums..."
                />
            </div>

            <button
                type="submit"
                className="mr-2 inline-flex h-11 items-center rounded-full bg-emerald-500 px-5 text-sm font-semibold text-black transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
                Search
            </button>
        </form>
    )
}

export default SearchBox;