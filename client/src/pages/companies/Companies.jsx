import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useGetAllCompanies } from "@services/companies/queries";
import { useDebounce } from "@hooks";
import { CompanyCard, CompanyCardsSkeleton, Container } from "@components";

const Companies = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [filterQueries, setFilterQueries] = useState("");

  const getFiltersFromUrl = () => {
    const params = new URLSearchParams(location.search);

    return {
      search: params.get("search") || "",
      page: params.get("page") || "1",
    };
  };

  const [companyFilters, setCompanyFilters] = useState({
    ...getFiltersFromUrl(),
    page: 1,
  });

  // Debounce the companyFilters state changes
  const debouncedCompanyFilters = useDebounce(companyFilters, 300);

  // Update the URL when the companyFilters state changes
  useEffect(() => {
    const queryParams = new URLSearchParams();

    // Iterate over companyFilters and add only those with values to queryParams
    Object.entries(debouncedCompanyFilters).forEach(([key, value]) => {
      if (value || key === "page") {
        // Always include 'page', exclude others if empty
        queryParams.set(key, value);
      }
    });

    // Use `replace` to avoid adding to the history stack
    navigate(`/companies?${queryParams.toString()}`, { replace: true });
    setFilterQueries(`${queryParams.toString()}`);
  }, [debouncedCompanyFilters, navigate]);

  const { data, isPending, isError, error } = useGetAllCompanies(filterQueries);

  return (
    <main>
      {/* HERO */}
      <section className="bg-hero-companies bg-cover bg-center bg-no-repeat">
        <Container className="flex min-h-[260px] flex-col items-center justify-center gap-6 pt-6">
          <h1 className="text-white">Find Company</h1>
          <form className="relative w-full md:mx-auto md:w-[600px]">
            <input
              type="text"
              placeholder="Search company..."
              name="search"
              className="w-full rounded-full bg-neutral-50 px-4 py-2 text-center text-lg capitalize text-neutral-800 outline-none lg:py-3"
              value={companyFilters.search}
              onChange={(e) =>
                setCompanyFilters((prevState) => ({
                  ...prevState,
                  search: e.target.value,
                }))
              }
            />
            <button
              type="button"
              className="absolute right-0 top-2/4 grid -translate-y-1/2 place-items-center pr-4 text-2xl text-neutral-950"
            >
              <HiOutlineMagnifyingGlass />
            </button>
          </form>
        </Container>
      </section>

      {/* COMPANIES */}
      <section>
        {isPending && <CompanyCardsSkeleton />}
        {isError && (
          <Container>
            <h3 className="text-center">{error.message}</h3>
          </Container>
        )}
        {data && data.data.length === 0 && (
          <Container>
            <h3 className="text-center">Company not found</h3>
          </Container>
        )}
        {data && data.data.length > 0 && (
          <Container className="grid grid-cols-2 gap-3 sm-upper:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.data.map((company) => (
              <CompanyCard
                key={company._id}
                company={company._id}
                availablePositions={company.jobs.length}
              />
            ))}
          </Container>
        )}
      </section>
    </main>
  );
};

export default Companies;
