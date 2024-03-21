import { useParams } from "react-router-dom";
import { useGetCompanyDetails } from "@services/companies/queries";
import { Container, JobCard, PageLoader } from "@components";
import toast from "react-hot-toast";

const CompanyDetails = () => {
  const { company } = useParams();
  const { data, isPending, isError, error } = useGetCompanyDetails(company);

  if (isPending) {
    return <PageLoader />;
  }

  if (isError) {
    return toast.error(error.response.data.message);
  }

  return (
    <article>
      <div
        className={`align-center flex min-h-[440px] w-full flex-col justify-center bg-hero-jobs bg-cover bg-center bg-no-repeat py-12 text-center text-neutral-200 md:min-h-[500px] lg:py-28`}
      >
        <Container className="grid max-w-[500px] gap-3 pt-14 md:max-w-[700px] md:gap-4 lg:max-w-[1000px]">
          <h1 className="capitalize text-white">{company}</h1>
          <h2 className="text-xl font-medium text-neutral-100 md:text-2xl">
            {data.data.length} Open Position{data.data.length > 1 ? "s" : ""}
          </h2>
        </Container>
      </div>
      <Container className="grid gap-5 py-10 sm-upper:grid-cols-2 md:gap-7 md:py-14 lg:grid-cols-3">
        {data.data.map((job) => (
          <JobCard key={job._id} {...job} />
        ))}
      </Container>
    </article>
  );
};

export default CompanyDetails;
