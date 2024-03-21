import { useJobForm } from "@hooks";
import { FormInput, FormSelect, Loader } from "@components";

const PostJob = () => {
  const { jobData, loading, handleInput, handleReset, handleSubmit } =
    useJobForm();

  const {
    position,
    description,
    minSalary,
    maxSalary,
    salaryType,
    location,
    jobType,
    level,
    experience,
    skills,
    deadline,
  } = jobData;

  return (
    <div>
      <h1 className="text-4xl lg:text-left">Post a New Job</h1>
      <form
        className="mx-auto mt-8 grid max-w-md rounded-2xl bg-white p-8 md:max-w-4xl"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto grid w-full max-w-md gap-5 md:max-w-4xl md:grid-cols-2 md:gap-x-12 md:gap-y-7">
          <FormInput
            name="position"
            placeholder="Software engineer"
            value={position}
            handleChange={handleInput}
            disabled={loading}
            required
          />
          <FormInput
            type="date"
            name="deadline"
            value={deadline}
            handleChange={handleInput}
            disabled={loading}
            required
          />
          <FormSelect
            name="jobType"
            label="job type"
            optionValues={["internship", "freelance", "part-time", "full-time"]}
            value={jobType}
            handleChange={handleInput}
            disabled={loading}
            required
          />
          <FormSelect
            name="level"
            optionValues={["junior", "middle", "senior"]}
            value={level}
            handleChange={handleInput}
            disabled={loading}
            required
          />
          <FormSelect
            name="experience"
            optionValues={["0-1 year", "2-5 years", "5-10 years", "> 10 years"]}
            value={experience}
            handleChange={handleInput}
            diabled={loading}
            required
          />
          <FormSelect
            name="location"
            optionValues={["Bandung", "Jakarta", "Surabaya", "Yogyakarta"]}
            value={location}
            handleChange={handleInput}
            disabled={loading}
            required
          />
          <FormInput
            name="skills"
            label="skills (use comma)"
            placeholder="HTML, CSS, JavaScript, React.js"
            value={skills}
            handleChange={handleInput}
            disabled={loading}
            required
          />
          <FormSelect
            name="salaryType"
            label="salary type"
            optionValues={["hourly", "weekly", "monthly", "yearly"]}
            value={salaryType}
            handleChange={handleInput}
            disabled={loading}
            required
          />
          <FormInput
            name="minSalary"
            label="min salary"
            type="number"
            placeholder="3000000"
            value={minSalary}
            handleChange={handleInput}
            disabled={loading}
            required
          />
          <FormInput
            name="maxSalary"
            label="max salary"
            type="number"
            placeholder="12000000"
            value={maxSalary}
            handleChange={handleInput}
            disabled={loading}
            required
          />
        </div>
        <div className="mb-5 mt-5 grid gap-2">
          <label
            htmlFor="description"
            className='block text-lg font-medium after:ml-0.5 after:text-red-500 after:content-["*"]'
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="no-scrollbar h-56 w-full resize-none rounded-3xl border px-5 py-4 disabled:cursor-not-allowed disabled:opacity-70"
            value={description}
            onChange={handleInput}
            disabled={loading}
          ></textarea>
          <span className="text-right font-semibold">
            <span
              className={
                description.length === 2000
                  ? "text-red-500"
                  : "text-neutral-700"
              }
            >
              {description.length}
            </span>
            /2000
          </span>
        </div>
        <div className="flex items-center gap-2 lg:justify-end">
          <button type="submit" className="btn btn-primary h-12">
            {loading ? <Loader /> : "Submit"}
          </button>
          <button
            type="button"
            className="btn btn-secondary h-12 border-red-300 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
