const DashboardOverviewLinksSkeleton = () => {
  return (
    <div className="grid gap-4 sm-upper:grid-cols-2 md:grid-cols-3">
      {/* Skeleton 1 */}
      <div className="grid gap-2 rounded-xl bg-white px-4 py-4 transition">
        <div className="h-8 w-10 rounded-full bg-gray-100"></div>
        <div className="h-6 w-48 rounded-full bg-gray-100"></div>
      </div>

      {/* Skeleton 2 */}
      <div className="grid gap-2 rounded-xl bg-white px-4 py-4 transition">
        <div className="h-8 w-10 rounded-full bg-gray-100"></div>
        <div className="h-6 w-48 rounded-full bg-gray-100"></div>
      </div>

      {/* Skeleton 3 */}
      <div className="grid gap-2 rounded-xl bg-white px-4 py-4 transition">
        <div className="h-8 w-10 rounded-full bg-gray-100"></div>
        <div className="h-6 w-48 rounded-full bg-gray-100"></div>
      </div>
    </div>
  );
};

export default DashboardOverviewLinksSkeleton;
