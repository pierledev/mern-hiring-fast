import { useState } from "react";
import { useAppContext } from "@context/appContext";
import { usePostJob } from "@services/jobs/mutations";
import toast from "react-hot-toast";

const initialState = {
  position: "",
  company: "",
  description: "",
  minSalary: "",
  maxSalary: "",
  salaryType: "monthly",
  location: "Bandung",
  jobType: "full-time",
  level: "junior",
  experience: "0-1 year",
  skills: "",
  deadline: "",
};

const useJobForm = (initialFormState = initialState) => {
  const { user } = useAppContext();
  const [jobData, setJobData] = useState(initialFormState);
  const { mutate, isLoading } = usePostJob();

  const handleInput = (e) => {
    let { name, value } = e.target;
    if (name === "description" && value.length > 2000) return;

    setJobData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReset = () => setJobData(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillsInArray = jobData.skills
      .split(",")
      .map(
        (skill) => skill.trim().charAt(0).toUpperCase() + skill.trim().slice(1),
      );

    const jobSubmissionData = {
      ...jobData,
      company: user?.company,
      skills: skillsInArray,
    };

    mutate(jobSubmissionData, {
      onSuccess: (data) => {
        toast.success(data.message);
        handleReset();
      },
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "An error occurred while posting the job.",
        );
      },
    });
  };

  return {
    jobData,
    loading: isLoading,
    handleInput,
    handleReset,
    handleSubmit,
  };
};

export default useJobForm;
