interface PaginationSkeletonProps {
    pageCount?: number;
}

const PaginationSkeleton = ({ pageCount = 3 }: PaginationSkeletonProps) => {
    return (
        <div className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-[1px] shadow-lg shadow-black/50 m-4">
            <div className="flex w-full items-center justify-center rounded-full bg-neutral-950/80 px-2 py-2 backdrop-blur">
                {Array.from({ length: pageCount }, (_, i) => (
                    <span
                        key={i}
                        className="mr-2 inline-flex h-9 min-w-9 animate-pulse items-center justify-center rounded-full bg-neutral-800/80 px-3 text-sm font-semibold text-neutral-500"
                    >
                        &nbsp;
                    </span>
                ))}
            </div>
        </div>
    );
};
export default PaginationSkeleton;