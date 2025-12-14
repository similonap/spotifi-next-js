"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SortDirection, SortField } from "@/types";

const SortSelect = () => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const sortField : SortField = (searchParams.get("sortField") || "title") as SortField;
    const sortDirection : SortDirection = (searchParams.get("sortDirection") || "asc") as SortDirection;

    const onChangeSortField: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const newSort = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        if (newSort) {
            params.set("sortField", newSort);
        } else {
            params.delete("sortField");
        }
        replace(`?${params.toString()}`);
    };

    const onChangeSortDirection: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        const newSort = e.target.value;
        const params = new URLSearchParams(searchParams.toString());
        if (newSort) {
            params.set("sortDirection", newSort);
        } else {
            params.delete("sortDirection");
        }
        replace(`?${params.toString()}`);
    };

    let sortDirectionLabels : string[] = [];
    if (sortField === "owned") {
        sortDirectionLabels = ["Owned First", "Owned last"];
    }
    if (sortField === "publish_date") {
        sortDirectionLabels = ["Newest first", "Oldest first"];
    }
    if (sortField === "title") {
        sortDirectionLabels = ["A-Z", "Z-A"];
    }

    return (
        <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-[1px] shadow-lg shadow-black/50">
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
                        <path d="M3 6h18" />
                        <path d="M7 12h10" />
                        <path d="M10 18h4" />
                    </svg>
                </span>
                <select
                    id="sortField"
                    name="sortField"
                    className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                    onChange={onChangeSortField}
                    value={sortField}
                >
                    <option value="title" className="bg-neutral-900">Title</option>
                    <option value="owned" className="bg-neutral-900">Owned</option>
                    <option value="publish_date" className="bg-neutral-900">Publish Date</option>
                </select>

                <span className="text-neutral-600">|</span>

                <select
                    id="sortDirection"
                    name="sortDirection"
                    className="bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                    onChange={onChangeSortDirection}
                    value={sortDirection}
                >
                    <option value="asc" className="bg-neutral-900">{sortDirectionLabels[0]}</option>
                    <option value="desc" className="bg-neutral-900">{sortDirectionLabels[1]}</option>
                </select>
            </div>
        </div>
    );
}

export default SortSelect;