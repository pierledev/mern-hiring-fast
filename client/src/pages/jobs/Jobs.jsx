import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@hooks";
import { api } from "@services/jobs/api";
import { useGetAllJobs } from "@services/jobs/queries";
import { Container, JobCard, JobCardSkeleton } from "@components";
import { HiOutlineMagnifyingGlass, HiMiniChevronDown } from "react-icons/hi2";

const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [filterQueries, setFilterQueries] = useState("");

  const getFiltersFromUrl = () => {
    const params = new URLSearchParams(location.search);

    return {
      search: params.get("search") || "",
      location: params.get("location") || "",
      jobType: params.get("jobType") || "",
      level: params.get("level") || "",
      experience: params.get("experience") || "",
      page: params.get("page") || "1",
    };
  };

  const [jobFilters, setJobFilters] = useState({
    ...getFiltersFromUrl(),
  });

  // Debounce the jobFilters state changes
  const debouncedJobFilters = useDebounce(jobFilters, 300);

  // Update the URL when the jobFilters state changes
  useEffect(() => {
    const queryParams = new URLSearchParams();

    // Iterate over jobFilters and add only those with values to queryParams
    Object.entries(debouncedJobFilters).forEach(([key, value]) => {
      if (value || key === "page") {
        // Always include 'page', exclude others if empty
        queryParams.set(key, value);
      }
    });

    // Use `replace` to avoid adding to the history stack
    navigate(`/jobs?${queryParams.toString()}`, { replace: true });
    setFilterQueries(`${queryParams.toString()}`);
  }, [debouncedJobFilters, navigate]);

  const handleJobFilters = (e) => {
    const { name, value } = e.target;

    setJobFilters((prevState) => ({
      ...prevState,
      [name]: value,
      page: "1", // Reset to page 1 on any filter change
    }));
  };

  const { data, isPending, isError, error } = useGetAllJobs(filterQueries);

  let paginationNumsArr;
  if (data) {
    paginationNumsArr = Array.from(
      { length: data.data.numOfPages },
      (_, i) => i + 1,
    );
  }

  const handleChangePage = (page) => {
    setJobFilters((prevState) => ({ ...prevState, page }));
  };

  // Prefetch the next page!
  useEffect(() => {
    const nextPage = parseInt(jobFilters.page, 10) + 1;
    const nextFilterQueries = `${filterQueries}&page=${nextPage}`;

    if (data?.data?.hasMore) {
      queryClient.prefetchQuery(
        ["jobs", nextFilterQueries],
        () => api.getAllJobs(nextFilterQueries),
        { staleTime: 5 * 60 * 1000 },
      ); // Adjust staleTime as needed
    }
  }, [data, filterQueries, jobFilters.page, queryClient]);

  return (
    <main>
      {/* HERO */}
      <section className="bg-hero-jobs bg-cover bg-center bg-no-repeat">
        <Container className="flex min-h-[380px] flex-col items-center justify-center gap-6">
          <h1 className="text-white">Find Job</h1>
          <form className="grid w-full max-w-[500px] gap-3 md:mx-auto lg:max-w-[700px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search job..."
                name="search"
                className="w-full rounded-full bg-neutral-50 px-4 py-2 text-center text-lg capitalize text-neutral-800 outline-none lg:py-3 lg:text-xl"
                value={jobFilters.search}
                onChange={handleJobFilters}
              />
              <button
                type="submit"
                className="roundedn-full absolute right-0 top-2/4 grid -translate-y-1/2 place-items-center pr-4 text-2xl text-neutral-950"
              >
                <HiOutlineMagnifyingGlass />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              <div className="relative">
                <select
                  className="w-full rounded-full px-5 py-2 font-medium capitalize text-neutral-700 outline-none"
                  name="location"
                  id="location"
                  value={jobFilters.location}
                  onChange={handleJobFilters}
                >
                  <option value="">All Location</option>
                  <option value="bandung">bandung</option>
                  <option value="jakarta">jakarta</option>
                  <option value="surabaya">surabaya</option>
                  <option value="yogyakarta">yogyakarta</option>
                </select>
                <span className="absolute right-2 top-2/4 -translate-y-2/4">
                  <HiMiniChevronDown />
                </span>
              </div>
              <div className="relative">
                <select
                  className="w-full rounded-full px-5 py-2 font-medium capitalize text-neutral-700 outline-none"
                  name="jobType"
                  id="jobType"
                  value={jobFilters.jobType}
                  onChange={handleJobFilters}
                >
                  <option value="">All Job Type</option>
                  <option value="internship">internship</option>
                  <option value="freelance">freelance</option>
                  <option value="part-time">part-time</option>
                  <option value="full-time">full-time</option>
                </select>
                <span className="absolute right-2 top-2/4 -translate-y-2/4">
                  <HiMiniChevronDown />
                </span>
              </div>
              <div className="relative">
                <select
                  className="w-full rounded-full px-5 py-2 font-medium capitalize text-neutral-700 outline-none"
                  name="level"
                  id="level"
                  value={jobFilters.level}
                  onChange={handleJobFilters}
                >
                  <option value="">All Level</option>
                  <option value="junior">junior</option>
                  <option value="middle">middle</option>
                  <option value="senior">senior</option>
                </select>
                <span className="absolute right-2 top-2/4 -translate-y-2/4">
                  <HiMiniChevronDown />
                </span>
              </div>
              <div className="relative">
                <select
                  className="w-full rounded-full px-5 py-2 font-medium capitalize text-neutral-700 outline-none"
                  name="experience"
                  id="experience"
                  value={jobFilters.experience}
                  onChange={handleJobFilters}
                >
                  <option value="">All Experience</option>
                  <option value="0-1 year">0-1 year</option>
                  <option value="2-5 years">2-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="&gt;10 years">&gt;10 years</option>
                </select>
                <span className="absolute right-2 top-2/4 -translate-y-2/4">
                  <HiMiniChevronDown />
                </span>
              </div>
            </div>
          </form>
        </Container>
      </section>

      {/* JOBS */}
      <section>
        {isPending && (
          <Container
            className={`grid w-full gap-4 sm-upper:grid-cols-2 lg:grid-cols-3`}
          >
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </Container>
        )}
        {!isPending && (
          <Container>
            {isError && <h3 className="text-center">{error.message}</h3>}
            {data && data.data.jobs.length === 0 && (
              <h3 className="text-center">No jobs found</h3>
            )}
            <>
              <div className="grid w-full justify-center gap-4 sm-upper:grid-cols-2 lg:grid-cols-3">
                {data &&
                  data.data.jobs.map((job) => (
                    <JobCard key={job._id} {...job} />
                  ))}
              </div>
              <div className="mt-12 flex justify-center">
                <div className="flex w-auto justify-center overflow-hidden rounded-lg border">
                  {paginationNumsArr.map((page) => {
                    return (
                      <button
                        type="button"
                        key={page}
                        className={`flex h-10 w-10 items-center justify-center border-r last-of-type:border-none hover:bg-blue-50 ${jobFilters?.page == page ? "bg-blue-50 font-bold text-blue-500" : "bg-white"}`}
                        onClick={() => handleChangePage(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          </Container>
        )}
      </section>
    </main>
  );
};

export default Jobs;
