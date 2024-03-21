import { Container, CompanyCardSkeleton } from "@components";

const CompanyCardsSkleton = () => {
  return (
    <Container className="grid grid-cols-2 gap-3 sm-upper:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
      <CompanyCardSkeleton />
    </Container>
  );
};

export default CompanyCardsSkleton;
