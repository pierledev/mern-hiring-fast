import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { useGetFeaturedJobs } from "@services/jobs/queries";
import { useGetFeaturedCompanies } from "@services/companies/queries";
import {
  CompanyCard,
  CompanyCardsSkeleton,
  Container,
  JobCard,
  JobCardsSkeleton,
} from "@components";
import {
  employersSteps,
  jobCategories,
  jobseekersSteps,
  testimonies,
  whyChooseUs,
} from "../../data";

const Home = () => {
  /* Search Jobs Functionality */
  const navigate = useNavigate();
  const searchJobsRef = useRef();

  const handleSearchJobs = (e) => {
    e.preventDefault();

    const lowercasedInput = searchJobsRef.current.value.toLowerCase();
    if (!lowercasedInput.trim()) return;

    navigate(`/jobs?search=${lowercasedInput}`);
  };

  /* Featured Jobs */
  const {
    data: featuredJobs,
    isPending: isFeaturedJobsPending,
    isError: isFeaturedJobsError,
    error: featuredJobsError,
  } = useGetFeaturedJobs();

  /* Featured Companies */
  const {
    data: featuredCompanies,
    isPending: isFeaturedCompaniesPending,
    isError: isFeaturedCompaniesError,
    error: featuredCompaniesError,
  } = useGetFeaturedCompanies();

  return (
    <main>
      {/* HERO */}
      <section className="h-full w-full bg-home-hero bg-cover bg-center bg-no-repeat py-0">
        <Container className="grid h-screen max-h-[900px] max-w-[480px] place-items-center pt-8 md:max-w-2xl lg:max-w-5xl lg:pt-14">
          <div className="grid gap-6 md:items-center lg:gap-8">
            <h1 className="text-white">
              Your Gateway to Seamless Hiring and Job Seeking
            </h1>
            <form
              className="grid gap-3 md:mx-auto md:w-[500px]"
              onSubmit={handleSearchJobs}
            >
              <input
                name="searchTerm"
                type="text"
                className="w-full rounded-full bg-neutral-50 px-4 py-2 text-center text-lg capitalize text-neutral-800 lg:py-3"
                placeholder="Software engineer"
                ref={searchJobsRef}
              />
              <button
                type="submit"
                className="btn btn-primary py-2 text-lg lg:py-3"
              >
                Search Jobs
              </button>
            </form>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                <span className="grid h-8 w-8 place-items-center rounded-full border bg-white text-xl text-blue-500 md:h-10 md:w-10 md:text-2xl">
                  <FaTwitter />
                </span>
                <span className="-ml-3 grid h-8 w-8 place-items-center rounded-full border bg-white text-xl text-blue-800 md:h-10 md:w-10 md:text-2xl">
                  <FaFacebookF />
                </span>
                <span className="-ml-3 grid h-8 w-8 place-items-center rounded-full border bg-white text-xl md:h-10 md:w-10 md:text-2xl">
                  <FcGoogle />
                </span>
              </div>
              <p className="text-white md:text-lg">
                999+ global hiring partners
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED JOBS */}
      <section>
        <Container>
          <div className="copy-text sm-upper:text-center">
            <h2>Find Your Dream Job</h2>
            <p>Explore Thousands of Opportunities with&nbsp;Ease</p>
          </div>
          {isFeaturedJobsPending && <JobCardsSkeleton />}
          {isFeaturedJobsError && (
            <h3 className="my-8 text-center">{featuredJobsError.message}</h3>
          )}
          {featuredJobs && (
            <>
              <div className="no-scrollbar relative mb-6 mt-8 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto sm-upper:mt-10 md:mb-7 lg:mt-16 lg:grid lg:flex-none lg:snap-none lg:grid-cols-3 lg:gap-5">
                {featuredJobs.data.jobs.map((featuredJob) => (
                  <JobCard key={featuredJob._id} {...featuredJob} />
                ))}
              </div>
              <Link
                to="/jobs"
                className="inline-flex items-center justify-start gap-2 rounded-full bg-neutral-950 px-4 py-1 text-white transition hover:bg-neutral-800 md:px-5 md:py-2 md:text-lg"
              >
                <span>See all jobs</span>
                <span className="text-3xl">
                  <HiArrowLongRight />
                </span>
              </Link>
            </>
          )}
        </Container>
      </section>

      {/* FEATURED COMPANIES */}
      <section>
        <Container>
          <div className="copy-text mb-8 sm-upper:text-center">
            <h2>Trusted Employers</h2>
            <p>Connect with Top Companies Hiring&nbsp;Now</p>
          </div>
          {isFeaturedCompaniesPending && <CompanyCardsSkeleton />}
          {isFeaturedCompaniesError && (
            <h3 className="text-center">{featuredCompaniesError.message}</h3>
          )}
          {featuredCompanies && (
            <>
              <div className="mb-5 grid grid-cols-2 gap-4 sm-upper:mt-10 md:mb-7 md:grid-cols-3 lg:mt-16 lg:grid-cols-6">
                {featuredCompanies?.data?.map((company) => {
                  return (
                    <CompanyCard
                      key={company._id}
                      company={company._id}
                      availablePositions={company.jobs.length}
                    />
                  );
                })}
              </div>
              <Link
                to="/companies"
                className="inline-flex items-center justify-start gap-2 rounded-full bg-neutral-950 px-4 py-1 text-white transition hover:bg-neutral-800 md:px-5 md:py-2 md:text-lg"
              >
                <span>See all companies</span>
                <span className="text-3xl">
                  <HiArrowLongRight />
                </span>
              </Link>
            </>
          )}
        </Container>
      </section>

      {/* JOB CATEGORIES */}
      <section className="bg-bg-bluish bg-cover bg-center bg-no-repeat">
        <Container>
          <div className="copy-text sm-upper:text-center">
            <h2 className="text-white">Explore Job Categories</h2>
            <p className="text-neutral-400">
              Browse Jobs by Industry and Function
            </p>
          </div>
          <ul className="mb-5 mt-8 flex max-w-4xl flex-wrap gap-2 sm-upper:mx-auto sm-upper:mt-10 sm-upper:justify-center md:gap-y-4 lg:mt-16">
            {jobCategories.map((jobCategory) => (
              <li key={jobCategory}>
                <Link className="block rounded-full bg-white px-4 py-2 transition hover:bg-blue-700 hover:text-white">
                  {jobCategory}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to=""
            className="flex items-center gap-2 text-neutral-50 underline underline-offset-4 hover:no-underline sm-upper:justify-center"
          >
            <span>See all categories</span>
            <span className="text-3xl">
              <HiArrowLongRight />
            </span>
          </Link>
        </Container>
      </section>

      {/* WHY CHOOSE US */}
      <section>
        <Container className="grid gap-8 sm-upper:justify-items-center sm-upper:gap-10 sm-upper:text-center lg:gap-16">
          <div className="copy-text">
            <h2>Why Choose Us</h2>
            <p>Discover the Benefits of Our Platform</p>
          </div>
          <ul className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
            {whyChooseUs.map((benefit) => {
              const { id, heading, text, icon } = benefit;

              return (
                <li
                  key={id}
                  className={`grid max-w-[445px] select-none gap-1 py-6 sm-upper:justify-items-center sm-upper:py-10 md:border-none lg:max-w-[370px] lg:py-0 ${
                    id === 6 ? "border-none" : "border-b border-neutral-200"
                  }`}
                >
                  <span className="mb-2 text-4xl">{icon}</span>
                  <h3 className="sm-upper:mb-2">{heading}</h3>
                  <p>{text}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-to-br from-red-400 via-indigo-800 to-blue-950">
        <Container className="grid gap-8 sm-upper:gap-10 lg:justify-center lg:gap-16">
          <div className="copy-text sm-upper:text-center">
            <h2 className="text-white">How Hiring Fast Works</h2>
            <p className="text-neutral-200">
              Simple Steps for Employers and Job&nbsp;Seekers
            </p>
          </div>
          <div className="grid gap-6 min-[620px]:grid-cols-2 lg:flex lg:justify-center lg:gap-12">
            <article className="grid content-start gap-6 rounded-2xl bg-white p-6 shadow-2xl md:gap-9 md:p-8 lg:w-[388px]">
              <header className="md:justify-self-center">
                <h3>For Employers</h3>
              </header>
              <ol className="relative grid gap-5 after:absolute after:left-[15px] after:block after:h-full after:w-1 after:bg-blue-600 md:after:left-4">
                {employersSteps.map((employerStep, index) => {
                  return (
                    <li
                      key={index}
                      className="relative z-10 flex items-center gap-4 md:gap-5"
                    >
                      <span className="inline-grid h-8 w-8 place-items-center rounded-full border-2 border-blue-500 bg-blue-500 text-lg font-bold text-white md:h-9 md:w-9 md:text-xl">
                        {index + 1}
                      </span>
                      <span className="md:text-lg">{employerStep}</span>
                    </li>
                  );
                })}
              </ol>
            </article>
            <article className="grid content-start gap-6 rounded-2xl bg-white p-6 shadow-2xl md:gap-9 md:p-8 lg:w-[388px]">
              <header className="md:justify-self-center">
                <h3>For Job Seekers</h3>
              </header>
              <ol className="relative grid gap-5 after:absolute after:left-[15px] after:block after:h-full after:w-1 after:bg-blue-600 md:after:left-4">
                {jobseekersSteps.map((jobseekerStep, index) => {
                  return (
                    <li
                      key={index}
                      className="relative z-10 flex items-center gap-4 md:gap-5"
                    >
                      <span className="inline-grid h-8 w-8 place-items-center rounded-full border-2 border-blue-500 bg-blue-500 text-lg font-bold text-white md:h-9 md:w-9 md:text-xl">
                        {index + 1}
                      </span>
                      <span className="md:text-lg">{jobseekerStep}</span>
                    </li>
                  );
                })}
              </ol>
            </article>
          </div>
        </Container>
      </section>

      {/* TESTIMONIES */}
      <section>
        <Container className="grid gap-8 sm-upper:justify-items-center sm-upper:gap-10 lg:gap-16">
          <div className="copy-text sm-upper:text-center">
            <h2>Success Stories</h2>
            <p>Hear What Our Users Have to Say</p>
          </div>
          <div className="grid max-w-md gap-x-10 gap-y-5 md:gap-10 lg:max-w-full lg:grid-cols-2 xl:grid-cols-4">
            {testimonies.map((testimony) => {
              const { id, testi, avatar, name, job, company } = testimony;

              return (
                <figure
                  className="grid gap-4 rounded-2xl border bg-white p-4 lg:p-6"
                  key={id}
                >
                  <blockquote>
                    <span className="float-right text-neutral-500">
                      &ldquo;{testi}&rdquo;
                    </span>
                  </blockquote>
                  <figcaption className="flex gap-3 border-t border-neutral-100 pt-4 lg:mt-2 lg:pt-5">
                    <img
                      src={avatar}
                      alt={name}
                      className="h-10 w-10 rounded-full object-contain"
                    />
                    <div>
                      <p className="text-950 font-bold">{name}</p>
                      <p className="text-sm font-medium">
                        {job} at {company}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </Container>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-bg-newsletter bg-cover bg-center bg-no-repeat">
        <Container className="grid gap-8">
          <div className="copy-text text-center">
            <h2 className="text-white">Stay Updated</h2>
            <p className="text-neutral-300">
              Subscribe to Our Newsletter for Latest Job Openings
            </p>
          </div>
          <form className="grid w-full max-w-md gap-3 sm-upper:mx-auto">
            <input
              type="email"
              placeholder="pierledev@gmail.com"
              required
              className="w-full rounded-full bg-neutral-50 px-4 py-2 text-center text-lg text-neutral-800 lg:py-3"
            />
            <button
              type="submit"
              className="btn btn-primary py-2 text-lg lg:py-3"
            >
              Subscribe for Free
            </button>
          </form>
        </Container>
      </section>
    </main>
  );
};

export default Home;
