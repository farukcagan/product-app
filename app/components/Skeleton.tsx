export const Skeleton = ({ className }: { className?: string }) => {
    return (
        <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
    );
};

export const ProductSkeleton = () => {
    return (
        <div className="flex flex-col rounded-2xl bg-white p-4 border border-gray-100">
            <Skeleton className="mb-4 aspect-square w-full rounded-xl" />
            <Skeleton className="mb-2 h-4 w-3/4" />
            <Skeleton className="mb-4 h-3 w-1/2" />
            <div className="mt-auto space-y-3">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
        </div>
    );
};
