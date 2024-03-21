import { Link } from "react-router-dom";
import { formatToLocaleDate, formatRupiah } from "@utils";
import { useAppContext } from "@context/appContext";
import { useGetArchivedJobs } from "@services/jobs/queries";
import { useUnarchiveJob } from "@services/jobs/mutations";
import { Loader } from "@components";

const ArchivedJobs = () => {
  const { user } = useAppContext();
  const {
    data: archivedJobs,
    isPending: isGetArchivedJobsPending,
    isError: isGetArchivedJobsError,
    error: getArchivedJobsError,
  } = useGetArchivedJobs();
  const {
    mutate: unarchiveJob,
    isPending: isUnarchivingPending,
  } = useUnarchiveJob();

  return (
    <div className="grid content-start gap-8">
      <h1 className="text-4xl lg:text-left">Archived Jobs</h1>
      {isGetArchivedJobsPending && <Loader />}
      {isGetArchivedJobsError && <h3 className='text-center lg:text-left'>{getArchivedJobsError.message}</h3>}
      {archivedJobs && archivedJobs.data.length === 0 && (
        <h3 className="text-center lg:text-left">No jobs found.</h3>
      )}
      {archivedJobs && archivedJobs.data.length > 0 && (
        <div className="overflow-auto">
          <table className="table-fixed text-start">
            <thead>
              <tr className="table-row-head">
                <th>No.</th>
                <th>Position</th>
                <th>Deadline</th>
                <th>Job Type</th>
                <th>Level</th>
                <th>Experience</th>
                <th>Location</th>
                <th>Skills</th>
                <th>Min Salary</th>
                <th>Max Salary</th>
                <th>Salary Payment</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {archivedJobs.data.map((postedJob, index) => {
                const {
                  _id,
                  deadline,
                  experience,
                  jobType,
                  level,
                  location,
                  maxSalary,
                  minSalary,
                  position,
                  salaryType,
                  skills,
                } = postedJob;

                const formattedDate = formatToLocaleDate(deadline);

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={`/jobs/${user?.company?.toLowerCase()}/${_id}`}
                        className="underline hover:no-underline"
                      >
                        {position}
                      </Link>
                    </td>
                    <td>{formattedDate}</td>
                    <td>{jobType}</td>
                    <td>{level}</td>
                    <td>{experience}</td>
                    <td>{location}</td>
                    <td>{skills.join(", ")}</td>
                    <td className="text-end">Rp {formatRupiah(minSalary)}</td>
                    <td className="text-end">Rp {formatRupiah(maxSalary)}</td>
                    <td className="text-center">{salaryType}</td>
                    <td className="flex gap-2">
                      <button
                        type="button"
                        className="btn-archive"
                        onClick={() => unarchiveJob(_id)}
                        disabled={isUnarchivingPending}
                      >
                        Unarchive
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ArchivedJobs;
