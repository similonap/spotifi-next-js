import SongViewSkeleton from "./SongViewSkeleton";

const SongCatalogSkeleton = () => {
    const placeholders = Array.from({ length: 30 });

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {placeholders.map((_, idx) => (
                <SongViewSkeleton key={idx} />
            ))}
        </div>
    );
};

export default SongCatalogSkeleton;