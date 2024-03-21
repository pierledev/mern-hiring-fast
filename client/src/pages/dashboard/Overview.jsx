import { useAppContext } from "@context/appContext";
import { useGetDashboardOverview } from "@services/users/queries";
import {
  DashboardOverviewLink,
  DashboardOverviewLinksSkeleton,
} from "@components";
import { employerOverviewLinks, jobSeekerOverviewLinks } from "../../data";

const Overview = () => {
  const { user } = useAppContext();
  const { data, isPending, isError, error } = useGetDashboardOverview();

  return (
    <div className="grid content-start gap-8">
      <h1 className="text-4xl lg:text-left">Overview</h1>
      {isPending && <DashboardOverviewLinksSkeleton />}
      {isError && (
        <h3 className="text-center lg:text-left">
          {error.response.data.message || error.response.data || error.message}
        </h3>
      )}
      {data && (
        <div className="grid gap-4 sm-upper:grid-cols-2 md:grid-cols-3">
          {user?.userType === "employer" &&
            employerOverviewLinks.map((overviewLink) => (
              <DashboardOverviewLink
                key={overviewLink.id}
                {...overviewLink}
                data={data}
              />
            ))}

          {user?.userType === "job-seeker" &&
            jobSeekerOverviewLinks.map((overviewLink) => (
              <DashboardOverviewLink
                key={overviewLink.id}
                {...overviewLink}
                data={data}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Overview;
