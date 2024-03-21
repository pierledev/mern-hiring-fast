import banner1 from "./assets/backgrounds/hero-purpies.webp";
import banner2 from "./assets/backgrounds/hero-jobs.webp";
import banner3 from "./assets/backgrounds/bg-bluish.webp";
import banner4 from "./assets/backgrounds/bg-purblue.webp";

import {
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRectangleGroup,
  HiOutlineBriefcase,
  HiOutlineNewspaper,
  HiOutlineRocketLaunch,
  HiOutlineScale,
} from "react-icons/hi2";

export const bannerOptions = [
  { id: "banner1", imgUrl: banner1 },
  { id: "banner2", imgUrl: banner2 },
  { id: "banner3", imgUrl: banner3 },
  { id: "banner4", imgUrl: banner4 },
];

export const banners = {
  banner1: banner1,
  banner2: banner2,
  banner3: banner3,
  banner4: banner4,
};

export const bannersBg = {
  banner1: "bg-hero-purpies",
  banner2: "bg-hero-jobs",
  banner3: "bg-bg-bluish",
  banner4: "bg-bg-purblue",
};

export const whyChooseUs = [
  {
    id: 1,
    heading: "Extensive Job Network",
    text: "Connect with a vast network of employers and job seekers, increasing your chances of finding the perfect match",
    icon: <HiOutlineGlobeAsiaAustralia />,
  },
  {
    id: 2,
    heading: "User-Friendly Interface",
    text: "Enjoy a seamless and intuitive platform designed for easy navigation and a stress-free user experience",
    icon: <HiOutlineRectangleGroup />,
  },
  {
    id: 3,
    heading: "Diverse Job Categories",
    text: "Explore a wide range of job categories spanning various industries, ensuring there's something for everyone",
    icon: <HiOutlineBriefcase />,
  },
  {
    id: 4,
    heading: "Regular Newsletter Updates",
    text: "Stay informed about the latest job openings, industry trends, and platform updates through our regular newsletter",
    icon: <HiOutlineNewspaper />,
  },
  {
    id: 5,
    heading: "Transparent and Fair Practices",
    text: "Experience transparency in the hiring process with fair and ethical practices, ensuring a positive experience for all users",
    icon: <HiOutlineScale />,
  },
  {
    id: 6,
    heading: "Efficient Application Process",
    text: "Experience a streamlined application process that saves time and effort for both employers and job seekers",
    icon: <HiOutlineRocketLaunch />,
  },
];

export const employersSteps = [
  "Create your account",
  "Post job openings",
  "Review applications",
  "Connect with candidates",
  "Manage job listings",
];

export const jobseekersSteps = [
  "Create your profile",
  "Search and explore",
  "Save favorite jobs",
  "Apply with ease",
  "Manage applications",
  "Get notified",
];

export const jobCategories = [
  "Software Engineering",
  "Graphic Design",
  "Digital Marketing",
  "UI/UX Design",
  "Data Science",
  "Data Analytics",
  "Copywrting",
  "Accounting",
  "Sales",
];

export const testimonies = [
  {
    id: 1,
    testi:
      "Using Hiring Fast dramatically shortened our recruitment cycle. We connected with quality candidates and filled our positions in half the expected time.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Alex Johnson",
    job: "HR Manager",
    company: "Tech Innovations Inc.",
  },
  {
    id: 2,
    testi:
      "I landed my dream job through Hiring Fast! The platform made it easy to find opportunities tailored to my skills and experience.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Samantha Lee",
    job: "Software Engineer",
    company: "Creative Solutions Ltd.",
  },
  {
    id: 3,
    testi:
      "Hiring Fast has been a game-changer for our startup. We've been able to discover and recruit top talent efficiently, saving us valuable time and resources.",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    name: "Ethan Wright",
    job: "Co-founder",
    company: "NextGen Apps",
  },
  {
    id: 4,
    testi:
      "As a job seeker, the journey with Hiring Fast was seamless and rewarding. I appreciated the personalized job recommendations and the straightforward application process.",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    name: "Maria Gonzalez",
    job: "Digital Marketing Specialist",
    company: "BrandBoost Agency",
  },
];

export const dashboardLinks = [
  {
    id: 1,
    label: 'Overview',
    link: '/dashboard',
    userType: 'all',
  },
  {
    id: 2,
    label: 'Post a New Job',
    link: '/dashboard/post-job',
    userType: 'employer',
  },
  {
    id: 3,
    label: 'Posted Jobs',
    link: '/dashboard/posted-jobs',
    userType: 'employer',
  },
  {
    id: 4,
    label: 'Archived Jobs',
    link: '/dashboard/archived-jobs',
    userType: 'employer',
  },
  {
    id: 5,
    label: 'Applied Jobs',
    link: '/dashboard/applied-jobs',
    userType: 'job-seeker',
  },
  {
    id: 6,
    label: 'Saved Jobs',
    link: '/dashboard/saved-jobs',
    userType: 'job-seeker',
  },
  {
    id: 7,
    label: 'Post Article',
    link: '/dashboard/post-article',
    userType: 'employer',
  },
  {
    id: 8,
    label: 'Posted Articles',
    link: '/dashboard/posted-articles',
    userType: 'employer',
  },
  {
    id: 9,
    label: 'Saved Articles',
    link: '/dashboard/saved-articles',
    userType: 'job-seeker',
  },
];

export const employerOverviewLinks = [
  {
    id: 'posted-jobs',
    label: 'Posted Jobs',
    link: '/dashboard/posted-jobs',
    bg: 'bg-blue-700',
    bgHover: 'bg-blue-600'
  },
  {
    id: 'archived-jobs',
    label: 'Archived Jobs',
    link: '/dashboard/archived-jobs',
    bg: 'bg-yellow-500',
    bgHover: 'bg-yellow-400'
  },
  {
    id: 'posted-articles',
    label: 'Posted Articles',
    link: '/dashboard/posted-articles',
    bg: 'bg-emerald-700',
    bgHover: 'bg-emerald-600'
  },
];

export const jobSeekerOverviewLinks = [
  {
    id: 'applied-jobs',
    label: 'Applied Jobs',
    link: '/dashboard/applied-jobs',
    bg: 'bg-lime-700',
    bgHover: 'bg-lime-600'
  },
  {
    id: 'saved-jobs',
    label: 'Saved Jobs',
    link: '/dashboard/saved-jobs',
    bg: 'bg-orange-700',
    bgHover: 'bg-orange-600'
  },
  {
    id: 'saved-articles',
    label: 'Saved Articles',
    link: '/dashboard/saved-articles',
    bg: 'bg-purple-700',
    bgHover: 'bg-purple-600'
  },
];