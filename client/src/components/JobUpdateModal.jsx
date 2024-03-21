import { FormInput, FormSelect, Modal } from "@components";
import { useAppContext } from "@context/appContext";
import { useUpdateJob } from "@services/jobs/mutations";
import { formatDateToISOString } from "@utils";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";

const JobUpdateModal = () => {
  const { jobToBeUpdated, setJobToBeUpdated, handleUpdateJobInput } =
    useAppContext();
  const { mutate: updateJob, isPending } = useUpdateJob();

  const handleSubmitUpdatedJobData = (e) => {
    e.preventDefault();

    updateJob(
      { jobId: jobToBeUpdated._id, updatedJobData: jobToBeUpdated },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          setJobToBeUpdated(null);
        },
        onError: (error) => {
          toast.error(
            error.response.data.message ||
              "An error occurred while posting the job.",
          );
        },
      },
    );
  };

  return (
    <Modal handleCloseModal={() => setJobToBeUpdated(null)}>
      <div className="no-scrollbar fixed left-1/2 top-1/2 z-50 max-h-[460px] w-4/5 max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-2xl">
        <form
          className="mx-auto grid max-w-md gap-8 rounded-2xl bg-white p-8 md:max-w-4xl lg:p-10"
          onSubmit={handleSubmitUpdatedJobData}
        >
          <h2 className="text-center lg:mb-6">Update Job Details</h2>
          <div className="mx-auto grid w-full max-w-md gap-5 md:max-w-4xl md:grid-cols-2 md:gap-x-12 md:gap-y-7">
            <FormInput
              name="position"
              placeholder="Software engineer"
              value={jobToBeUpdated?.position}
              handleChange={handleUpdateJobInput}
              required
            />
            <FormInput
              type="date"
              name="deadline"
              value={
                jobToBeUpdated
                  ? formatDateToISOString(jobToBeUpdated?.deadline)
                  : new Date()
              }
              handleChange={handleUpdateJobInput}
              required
            />
            <FormSelect
              name="jobType"
              label="job type"
              optionValues={[
                "internship",
                "freelance",
                "part-time",
                "full-time",
              ]}
              value={jobToBeUpdated?.jobType}
              handleChange={handleUpdateJobInput}
              required
            />
            <FormSelect
              name="level"
              optionValues={["junior", "middle", "senior"]}
              value={jobToBeUpdated?.level}
              handleChange={handleUpdateJobInput}
              required
            />
            <FormSelect
              name="experience"
              optionValues={[
                "0-1 year",
                "2-5 years",
                "5-10 years",
                "> 10 years",
              ]}
              value={jobToBeUpdated?.experience}
              handleChange={handleUpdateJobInput}
              required
            />
            <FormSelect
              name="location"
              optionValues={["Bandung", "Jakarta", "Surabaya", "Yogyakarta"]}
              value={jobToBeUpdated?.location}
              handleChange={handleUpdateJobInput}
              required
            />
            <FormInput
              name="skills"
              placeholder="HTML, CSS, JavaScript, React.js"
              value={jobToBeUpdated?.skills}
              handleChange={handleUpdateJobInput}
              required
            />
            <FormSelect
              name="salaryType"
              label="salary type"
              optionValues={["hourly", "weekly", "monthly", "yearly"]}
              value={jobToBeUpdated?.salaryType}
              handleChange={handleUpdateJobInput}
              required
            />
            <FormInput
              name="minSalary"
              label="min salary"
              type="number"
              placeholder="3000000"
              value={jobToBeUpdated?.minSalary}
              handleChange={handleUpdateJobInput}
              required
            />
            <FormInput
              name="maxSalary"
              label="max salary"
              type="number"
              placeholder="12000000"
              value={jobToBeUpdated?.maxSalary}
              handleChange={handleUpdateJobInput}
              required
            />
          </div>
          <div className="flex items-center justify-center gap-2 lg:justify-end">
            <button
              type="submit"
              className={`btn btn-primary ${isPending ? "cursor-not-allowed" : ""}`}
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update"}
            </button>
            {/* <button
              type="button"
              className="btn btn-secondary border-red-300 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
              onClick={() => setJobToBeUpdated(null)}
            >
              Reset
            </button> */}
          </div>
        </form>
      </div>
      <button
        type="button"
        className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full bg-white text-2xl transition hover:bg-neutral-100"
        disabled={isPending}
        onClick={() => setJobToBeUpdated(null)}
      >
        <HiOutlineXMark />
      </button>
    </Modal>
  );
};

export default JobUpdateModal;
