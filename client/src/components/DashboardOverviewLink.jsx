import { Link } from "react-router-dom";

const DashboardOverviewLink = ({ link, bg, bgHover, data, id, label }) => {
  return (
    <Link
      to={link}
      className={`grid gap-1 rounded-xl ${bg} hover:${bgHover} px-4 py-4 transition`}
    >
      <span className="text-4xl font-bold text-white">{data.data[id]}</span>
      <h2 className="text-lg font-normal text-neutral-100">{label}</h2>
    </Link>
  );
};

export default DashboardOverviewLink;
