import { Link } from "react-router-dom";

const CompanyCard = ({ company, availablePositions }) => {
  return (
    <Link to={`/companies/${company.toLowerCase()}/jobs`}>
      <article className="grid select-none justify-items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-4 py-5 text-center transition hover:bg-neutral-50/50">
        <div>
          <h3 className="font-bold capitalize text-neutral-950">{company}</h3>
          <p className="text-base text-neutral-500">
            {availablePositions} jobs open
          </p>
        </div>
      </article>
    </Link>
  );
};

export default CompanyCard;
