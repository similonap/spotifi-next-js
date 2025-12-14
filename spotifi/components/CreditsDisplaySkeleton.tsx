const CreditsDisplaySkeleton = () => {
    return (
        <div className="mb-6 rounded-lg bg-neutral-900/60 p-3 backdrop-blur">
            <div className="mb-2 h-4 w-20 animate-pulse rounded bg-neutral-800" />
            <div className="flex items-center gap-2">
                <div className="h-6 w-12 animate-pulse rounded bg-neutral-800" />
                <div className="h-4 w-4 animate-pulse rounded-full bg-neutral-800" />
            </div>
            <div className="mt-3 h-9 w-full animate-pulse rounded-full bg-neutral-800" />
        </div>
    );
};

export default CreditsDisplaySkeleton;
