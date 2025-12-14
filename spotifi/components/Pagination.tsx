"use client";

import { useSearchParams, useRouter } from "next/navigation";
interface PaginationProps {
    pageCount: number;
    currentPage: number;
}

const Pagination = ({ pageCount, currentPage }: PaginationProps) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        replace(`?${params.toString()}`);
    }

    return (
        <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-[1px] shadow-lg shadow-black/50">
            <div className="flex w-full items-center justify-center rounded-full bg-neutral-950/80 px-2 py-2 backdrop-blur">
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => {
                    const isActive = page === currentPage;
                    return (
                        <button
                            key={page}
                            onClick={() => changePage(page)}
                            className={`${
                                isActive
                                    ? 'bg-emerald-500 text-black'
                                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                            } inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 mr-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
export default Pagination;