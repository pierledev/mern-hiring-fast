import { Link } from "react-router-dom";
import { useGetAppliedJobs } from "@services/jobs/queries";
import { Loader } from "@components";
import { formatRupiah } from "@utils";

const AppliedJobs = () => {
  const { data, isPending, isError, error } = useGetAppliedJobs();

  return (
    <div className="grid content-start gap-8">
      <h1 className="text-4xl lg:text-left">Applied Jobs</h1>
      {isPending && <Loader />}
      {isError && (
        <h3 className="text-center lg:text-left">
          {error.response.data.message || error.message}
        </h3>
      )}
      {data && data.data.length === 0 && (
        <h3 className="text-center lg:text-left">No jobs found.</h3>
      )}
      {data && data.data.length > 0 && (
        <div className="overflow-auto">
          <table className="mx-auto table-fixed text-start">
            <thead>
              <tr className="table-row-head">
                <th>No.</th>
                <th>Company</th>
                <th>Position</th>
                <th>Job Type</th>
                <th>Level</th>
                <th>Location</th>
                <th>Min Salary</th>
                <th>Max Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((appliedJob, index) => {
                const {
                  _id,
                  company,
                  position,
                  jobType,
                  level,
                  location,
                  minSalary,
                  maxSalary,
                } = appliedJob;

                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{company}</td>
                    <td>{position}</td>
                    <td>{jobType}</td>
                    <td>{level}</td>
                    <td>{location}</td>
                    <td>Rp {formatRupiah(minSalary)}</td>
                    <td>Rp {formatRupiah(maxSalary)}</td>
                    <td>
                      <Link
                        to={`/companies/${company}/jobs/${_id}`}
                        className="rounded-full bg-blue-600 px-3 py-[6px] text-white transition hover:bg-blue-500"
                      >
                        See job details
                      </Link>
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

export default AppliedJobs;
