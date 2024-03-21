import { Link, useNavigate } from "react-router-dom";
import { HiMiniBookmark } from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi2";
import { HiOutlineMapPin, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { useAppContext } from "@context/appContext";
import { formatRupiah } from "@utils";
import { useSaveJob, useUnsaveJob } from "@services/jobs/mutations";
import toast from "react-hot-toast";
import defaultAva from "../assets/default-ava.webp";

const JobCard = ({
  _id,
  position,
  createdBy,
  company,
  location,
  minSalary,
  maxSalary,
  experience,
  jobType,
  savedBy,
}) => {
  const navigate = useNavigate();

  const { user } = useAppContext();
  const { mutate: saveJob } = useSaveJob();
  const { mutate: unsaveJob } = useUnsaveJob();

  const isSaved = Boolean(savedBy[user?._id]);

  const handleSaveJob = () => {
    if (!user) {
      toast.loading("You need to login first...", { duration: 1500 });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    saveJob(_id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "An error occurred while saving the job.",
        );
      },
    });
  };

  const handleUnsaveJob = () => {
    unsaveJob(_id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "An error occurred while unsaving the job.",
        );
      },
    });
  };

  return (
    <article className="grid w-full snap-start gap-3 rounded-2xl border bg-white p-5 text-base text-neutral-500 lg:max-w-full">
      <div className="flex items-center gap-4 overflow-hidden">
        <img
          src={createdBy?.companyLogo?.url || defaultAva}
          alt={`${company} Logo`}
          className="h-8 w-8 rounded-full object-contain"
        />
        <div className="overflow-hidden">
          <h3 className="truncate font-bold text-neutral-800 md:text-xl">
            <Link to={`/companies/${company.toLowerCase()}/jobs/${_id}`}>
              {position}
            </Link>
          </h3>
          <p className="text-base font-medium text-neutral-500">{company}</p>
        </div>
      </div>
      <div className="grid gap-1">
        <p className="flex items-center gap-1">
          <span className="text-xl">
            <HiOutlineMapPin />
          </span>{" "}
          {location}
        </p>
        <p className="flex items-center gap-1">
          <span className="text-xl">
            <HiOutlineCurrencyDollar />
          </span>
          Rp{formatRupiah(minSalary)} - Rp{formatRupiah(maxSalary)}/month
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <p className="tag whitespace-nowrap">{experience} of experiences</p>
        <p className="tag capitalize">{jobType}</p>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto] gap-3">
        <Link
          to={`/companies/${company.toLowerCase()}/jobs/${_id}`}
          className="btn btn-secondary transition hover:bg-blue-600 hover:text-white"
        >
          Details
        </Link>
        {user?.userType !== "employer" && (
          <button
            type="button"
            className={`text-2xl ${
              isSaved ? "text-blue-500" : "text-neutral-400"
            }`}
            onClick={isSaved ? handleUnsaveJob : handleSaveJob}
          >
            {isSaved ? <HiMiniBookmark /> : <HiOutlineBookmark />}
          </button>
        )}
      </div>
    </article>
  );
};

export default JobCard;
