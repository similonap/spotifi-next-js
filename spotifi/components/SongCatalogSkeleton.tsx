import PaginationSkeleton from "./PaginationSkeleton";
import SongViewSkeleton from "./SongViewSkeleton";

const SongCatalogSkeleton = () => {
    const placeholders = Array.from({ length: 30 });

    return (
        <div>
            <PaginationSkeleton/>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {placeholders.map((_, idx) => (
                    <SongViewSkeleton key={idx} />
                ))}
            </div>
        </div>
    );
};

export default SongCatalogSkeleton;