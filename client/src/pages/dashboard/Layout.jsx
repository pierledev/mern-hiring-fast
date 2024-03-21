import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "@context/appContext";
import { Container } from "@components";
import { dashboardLinks as navLinks } from "../../data";

const Layout = () => {
  const { user, articleToBeUpdated, setArticleToBeUpdated } = useAppContext();
  const location = useLocation();

  let dashboardLinks;
  if (user?.userType === "employer") {
    dashboardLinks = navLinks.filter((link) => link.userType !== "job-seeker");
  }

  if (user?.userType === "job-seeker") {
    dashboardLinks = navLinks.filter((link) => link.userType !== "employer");
  }

  useEffect(() => {
      if (location.pathname !== '/dashboard/post-article' && articleToBeUpdated) {
        setArticleToBeUpdated(null);
      }
  }, [location.pathname, articleToBeUpdated, setArticleToBeUpdated]);

  return (
    <main>
      <section>
        <Container className="lg:grid lg:grid-cols-[1fr__3fr] lg:gap-16 lg:pt-20">
          <nav className="my-16 lg:my-0 mx-auto max-w-[600px] lg:mx-0">
            <ul className="flex flex-wrap items-center justify-center gap-3 lg:grid lg:flex-none lg:items-stretch lg:justify-stretch lg:gap-0 lg:rounded-2xl lg:bg-white lg:p-4">
              {dashboardLinks?.map((dashboardLink) => {
                const { id, label, link } = dashboardLink;

                return (
                  <li
                    className="last:border-none lg:overflow-hidden lg:border-b lg:border-b-neutral-100 lg:first:rounded-t-xl lg:last:rounded-b-xl"
                    key={id}
                  >
                    <NavLink
                      className={({ isActive }) =>
                        `block rounded-full px-4 py-2 text-center lg:rounded-none lg:px-4 lg:py-4 lg:text-left ${
                          isActive
                            ? "bg-blue-500/5 text-blue-500 lg:border-l-0 lg:border-r-0 lg:border-t-0"
                            : "bg-neutral-100 font-medium text-neutral-500 lg:bg-transparent"
                        }`
                      }
                      to={link}
                      end
                    >
                      {label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Outlet />
        </Container>
      </section>
    </main>
  );
};

export default Layout;
