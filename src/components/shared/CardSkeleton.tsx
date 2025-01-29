import { Skeleton } from "../ui/skeleton";

const CardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 border p-2 w-full">
                <Skeleton className="h-[205px] w-full rounded-xl" />
                <div>
                <Skeleton className="h-4 w-[100px] py-2" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
              </div>
    );
};

export default CardSkeleton;