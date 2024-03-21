import { Outlet } from "react-router-dom";
import { Header, Footer, ScrollToTop } from "@components";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
