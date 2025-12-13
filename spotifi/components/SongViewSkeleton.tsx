const SongViewSkeleton = () => {
    return (
        <div className="group animate-pulse rounded-lg bg-[#181818] p-4 shadow-lg shadow-black/30">
            <div className="relative mb-4 overflow-hidden rounded-md bg-[#242424] pt-[100%]" />

            <div className="mb-2 h-4 w-3/4 rounded-full bg-[#242424]" />
            <div className="mb-1 h-3 w-full rounded-full bg-[#242424]" />
            <div className="mb-3 h-3 w-5/6 rounded-full bg-[#242424]" />

            <div className="mt-auto flex items-center justify-between">
                <div className="h-3 w-16 rounded-full bg-[#242424]" />
                <div className="h-3 w-10 rounded-full bg-[#242424]" />
            </div>
        </div>
    );
};

export default SongViewSkeleton;