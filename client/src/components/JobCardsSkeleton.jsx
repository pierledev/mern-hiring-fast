import { JobCardSkeleton } from "@components";

const JobCardsSkeleton = () => {
  return (
    <>
      <div className="no-scrollbar relative mb-6 mt-8 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto sm-upper:mt-10 md:mb-7 lg:mt-16 lg:grid lg:flex-none lg:snap-none lg:grid-cols-3 lg:gap-5">
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
      </div>
      <div className="h-8 w-40 rounded-full bg-gray-200"></div>
    </>
  );
};

export default JobCardsSkeleton;
