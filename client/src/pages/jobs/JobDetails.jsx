import { formatToLocaleDate, formatRupiah } from "@utils";
import { useGetJobDetails } from "@services/jobs/queries";
import { useApplyJob } from "@services/jobs/mutations";
import { Container, PageLoader } from "@components";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@context/appContext";
import toast from "react-hot-toast";

const JobDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useAppContext();
  const { data, isPending, isError, error } = useGetJobDetails(id);
  const { mutate: applyJob } = useApplyJob();

  if (isPending) {
    return <PageLoader />;
  }

  if (isError) {
    return toast.error(error.message);
  }

  const isApplied = Boolean(data.data.appliedBy[user?._id]);

  const handleApplyJob = () => {
    if (!user) {
      toast.loading("You need to login first...", { duration: 1500 });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    if (isApplied) return;

    applyJob(data.data._id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "An error occurred while applying the job.",
        );
      },
    });
  };

  return (
    <article>
      <div
        className={`align-center flex min-h-[440px] w-full flex-col justify-center bg-hero-purpies bg-cover bg-center bg-no-repeat py-12 text-center text-neutral-200 md:min-h-[500px] lg:py-28`}
      >
        <Container className="grid max-w-[500px] pt-14 md:max-w-[700px] md:gap-4 lg:max-w-[1000px]">
          <h1 className="mb-5 text-white">{data.data.position}</h1>
          <h2 className="text-neutral-100">{data.data.company}</h2>
        </Container>
      </div>
      <Container className="grid min-h-[400px] max-w-[600px] gap-5 py-10 md:gap-7 md:py-14">
        <div className="grid gap-1">
          <h3>Description</h3>
          <p className="md:text-lg">{data.data.description}</p>
        </div>

        <div className="grid gap-1">
          <h3>Skills</h3>
          <p className="md:text-lg">{data.data.skills.join(", ")}</p>
        </div>

        <div className="grid gap-1">
          <h3>Level</h3>
          <p className="capitalize">{data.data.level}</p>
        </div>

        <div className="grid gap-1">
          <h3>Years of Experince</h3>
          <p className="md:text-lg">{data.data.experience}</p>
        </div>

        <div className="grid gap-1">
          <h3>Job Type</h3>
          <p className="capitalize">{data.data.jobType}</p>
        </div>

        <div className="grid gap-1">
          <h3>Salary</h3>
          <p className="md:text-lg">
            Rp{formatRupiah(data.data.minSalary)} - Rp
            {formatRupiah(data.data.maxSalary)} ({data.data.salaryType})
          </p>
        </div>

        <div className="grid gap-1">
          <h3>Location</h3>
          <p className="md:text-lg">{data.data.location}</p>
        </div>

        <div className="grid gap-1">
          <h3>Deadline</h3>
          <p className="md:text-lg">{formatToLocaleDate(data.data.deadline)}</p>
        </div>

        {user?.userType !== "employer" && (
          <button
            type="button"
            className={`btn btn-update mt-5 px-5 py-3 text-xl ${isApplied ? "cursor-not-allowed bg-gray-300 hover:bg-gray-300" : ""}`}
            disabled={isApplied}
            onClick={handleApplyJob}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>
        )}
      </Container>
    </article>
  );
};

export default JobDetails;
