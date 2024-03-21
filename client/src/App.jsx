import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAppContext } from "@context/appContext";

import PageLoader from "@components/PageLoader";

import Layout from "@pages/Layout";
import ProtectedRoute from "@pages/ProtectedRoute";
import Error from "@pages/Error";

const Home = React.lazy(() => import("@pages/home/Home"));
const Profile = React.lazy(() => import("@pages/Profile"));
const Login = React.lazy(() => import("@pages/auth/Login"));
const Register = React.lazy(() => import("@pages/auth/Register"));
const Blog = React.lazy(() => import("@pages/blog/Blog"));
const BlogArticle = React.lazy(() => import("@pages/blog/BlogArticle"));
const Companies = React.lazy(() => import("@pages/companies/Companies"));
const CompanyDetails = React.lazy(
  () => import("@pages/companies/CompanyDetails"),
);
const DashboardLayout = React.lazy(() => import("@pages/dashboard/Layout"));
const DashboardOverview = React.lazy(() => import("@pages/dashboard/Overview"));
const ArchivedArticles = React.lazy(
  () => import("@pages/dashboard/employer/ArchivedArticles"),
);
const ArchivedJobs = React.lazy(
  () => import("@pages/dashboard/employer/ArchivedJobs"),
);
const PostArticle = React.lazy(
  () => import("@pages/dashboard/employer/PostArticle"),
);
const PostedArticles = React.lazy(
  () => import("@pages/dashboard/employer/PostedArticles"),
);
const PostedJobs = React.lazy(
  () => import("@pages/dashboard/employer/PostedJobs"),
);
const PostJob = React.lazy(() => import("@pages/dashboard/employer/PostJob"));
const AppliedJobs = React.lazy(
  () => import("@pages/dashboard/jobSeeker/AppliedJobs"),
);
const SavedArticles = React.lazy(
  () => import("@pages/dashboard/jobSeeker/SavedArticles"),
);
const SavedJobs = React.lazy(
  () => import("@pages/dashboard/jobSeeker/SavedJobs"),
);
const Jobs = React.lazy(() => import("@pages/jobs/Jobs"));
const JobDetails = React.lazy(() => import("@pages/jobs/JobDetails"));

// Route Groupings => employerRoutes & jobSeekerRoutes
const employerRoutes = () => [
  { path: "post-job", element: <PostJob /> },
  { path: "posted-jobs", element: <PostedJobs /> },
  { path: "archived-jobs", element: <ArchivedJobs /> },
  { path: "post-article", element: <PostArticle /> },
  { path: "posted-articles", element: <PostedArticles /> },
  { path: "archived-articles", element: <ArchivedArticles /> },
];

const jobSeekerRoutes = () => [
  { path: "applied-jobs", element: <AppliedJobs /> },
  { path: "saved-jobs", element: <SavedJobs /> },
  { path: "saved-articles", element: <SavedArticles /> },
];

const App = () => {
  const { user } = useAppContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "jobs",
          children: [
            {
              index: true,
              element: <Jobs />,
            },
          ],
        },
        {
          path: "companies",
          children: [
            {
              index: true,
              element: <Companies />,
            },
            {
              path: "/companies/:company/jobs",
              element: <CompanyDetails />,
            },
            {
              path: "/companies/:company/jobs/:id",
              element: <JobDetails />,
            },
          ],
        },
        {
          path: "blog",
          children: [
            {
              index: true,
              element: <Blog />,
            },
            {
              path: "/blog/:id",
              element: <BlogArticle />,
            },
          ],
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <DashboardOverview />,
            },
            ...(user?.userType === "employer"
              ? employerRoutes()
              : jobSeekerRoutes()),
          ],
        },
      ],
    },
  ]);

  return (
    <React.Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
};

export default App;
