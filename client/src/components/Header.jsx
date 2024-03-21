import { useLogout } from "@services/auth/mutations";
import { useIsCertainRoute, useToggle } from "@hooks";
import { useAppContext } from "@context/appContext";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { Container, Modal, Loader } from "@components";
import toast from "react-hot-toast";

import defaultAva from "@assets/default-ava.webp";

const Header = () => {
  const navigate = useNavigate();

  const { user, logoutUser } = useAppContext();
  const [isMenuOpen, toggleMenu, closeMenu] = useToggle();
  const [isProfileMenuOpen, toggleProfileMenu, closeProfileMenu] = useToggle();
  const {
    mutate: logout,
    isLoading: isLogoutLoading,
    isError: isLogoutError,
    error: logoutError,
  } = useLogout();

  const isDashboardPage = useIsCertainRoute("/dashboard");
  const isPostedJobsPage = useIsCertainRoute("/posted-jobs");

  const handleCloseModal = () => {
    closeMenu();
    closeProfileMenu();
  };

  const handleLogout = () => {
    logoutUser();
    logout();
    handleCloseModal();
    navigate('/login');
  };

  if (isLogoutError) {
    toast.error(logoutError);
  }

  return (
    <header
      className={`absolute left-1/2 top-4 w-11/12 max-w-xl -translate-x-1/2 rounded-full border bg-white/30 backdrop-blur-2xl md:max-w-3xl lg:top-6 ${isDashboardPage ? "border-neutral-400" : "border-neutral-100"} ${isPostedJobsPage ? "z-0" : "z-20"}`}
    >
      <Container className="py-2 md:flex md:items-center md:justify-between lg:pl-6 lg:pr-4">
        <div className="flex items-center justify-between">
          <Link
            onClick={handleCloseModal}
            to="/"
            className={`grid place-items-center font-bebas-neue text-3xl ${
              isDashboardPage ? "text-neutral-950" : "text-white"
            }`}
          >
            <span>Hiring Fast</span>
          </Link>
          <button
            type="button"
            className={`grid place-items-center text-4xl md:hidden ${
              isDashboardPage ? "text-neutral-950" : "text-white"
            }`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul
            className={`items-center gap-5 md:flex ${
              isDashboardPage ? "text-neutral-950" : "text-white"
            }`}
          >
            <li>
              <Link className="nav-link" onClick={handleCloseModal} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link" onClick={handleCloseModal} to="/jobs">
                Jobs
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                onClick={handleCloseModal}
                to="/companies"
              >
                Companies
              </Link>
            </li>
            <li>
              <Link className="nav-link" onClick={handleCloseModal} to="/blog">
                Blog
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              {!isDashboardPage && (
                <li>
                  <Link
                    className="btn btn-primary"
                    to="/dashboard"
                    onClick={handleCloseModal}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 capitalize transition hover:opacity-80"
                  onClick={toggleProfileMenu}
                >
                  <span
                    className={
                      isDashboardPage ? "text-slate-950" : "text-white"
                    }
                  >
                    {user?.firstName}
                  </span>
                  <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-white">
                    <img
                      src={
                        user?.userPicture?.url ||
                        user?.companyLogo?.url ||
                        defaultAva
                      }
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <ul className="absolute right-0 top-16 w-32 rounded-xl border bg-white px-4 py-3">
                    <li>
                      <Link
                        onClick={handleCloseModal}
                        to="/profile"
                        className="block w-full py-1"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-1 text-left"
                      >
                        {isLogoutLoading ? <Loader /> : "Logout"}
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="btn btn-secondary border-none bg-white hover:opacity-80"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link className="btn btn-primary" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <Modal handleCloseModal={toggleMenu}>
            <nav className="absolute left-1/2 top-24 z-50 grid w-11/12 max-w-md -translate-x-1/2 gap-7 rounded-2xl bg-white p-8 text-lg transition-all md:hidden md:max-w-3xl">
              <ul>
                <li>
                  <Link onClick={handleCloseModal} className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleCloseModal}
                    className="nav-link"
                    to="/jobs"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleCloseModal}
                    className="nav-link"
                    to="/companies"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleCloseModal}
                    className="nav-link"
                    to="/blog"
                  >
                    Blog
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link
                      onClick={handleCloseModal}
                      className="nav-link"
                      to="/profile"
                    >
                      My Profile
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="grid gap-2 min-[375px]:grid-cols-2">
                {user ? (
                  <>
                    <li>
                      <Link
                        onClick={handleCloseModal}
                        className="btn btn-primary w-full"
                        to="/dashboard"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn btn-secondary w-full"
                        onClick={handleLogout}
                      >
                        {isLogoutLoading ? <Loader /> : "Logout"}
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        onClick={handleCloseModal}
                        className="btn btn-secondary"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={handleCloseModal}
                        className="btn btn-primary"
                        to="/register"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </Modal>
        )}
      </Container>
    </header>
  );
};

export default Header;
