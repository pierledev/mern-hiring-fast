import { Link } from "react-router-dom";
import { useAppContext } from "@context/appContext";
import { useGetPostedJobs } from "@services/jobs/queries";
import { useArchiveJob, useDeleteJob } from "@services/jobs/mutations";
import { JobUpdateModal, Loader } from "@components";
import { formatToLocaleDate, formatRupiah } from "@utils";

const PostedJobs = () => {
  const { user, setJobToBeUpdated, jobToBeUpdated } = useAppContext();
  const {
    data: postedJobs,
    isPending: isGetPostedJobsPending,
    isError: isGetPostedJobsError,
    error: postedJobsError,
  } = useGetPostedJobs();
  const {
    mutate: archiveJob,
    isPending: isArchivingPending
  } = useArchiveJob();
  const {
    mutate: deleteJob,
    isPending: isDeletionPending
  } = useDeleteJob();

  return (
    <>
      {jobToBeUpdated && <JobUpdateModal />}
      <div className="grid content-start gap-8">
        <h1 className="text-4xl lg:text-left">Posted Jobs</h1>
        {isGetPostedJobsPending && <Loader />}
        {isGetPostedJobsError && <h3>{postedJobsError.message}</h3>}
        {postedJobs && postedJobs.data.length === 0 && (
          <h3 className="text-center lg:text-left">No jobs found.</h3>
        )}
        {postedJobs && postedJobs.data.length > 0 && (
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
                {postedJobs.data.map((postedJob, index) => {
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
                      <td>{salaryType}</td>
                      <td className="flex gap-2">
                        <button
                          type="button"
                          className="btn-update"
                          onClick={() => setJobToBeUpdated(postedJob)}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn-archive"
                          onClick={() => archiveJob(_id)}
                          disabled={isArchivingPending}
                        >
                          Archive
                        </button>
                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() => deleteJob(_id)}
                          disabled={isDeletionPending}
                        >
                          Delete
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
    </>
  );
};

export default PostedJobs;
