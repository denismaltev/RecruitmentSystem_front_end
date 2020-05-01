//import Dashboard from "./pages/Dashboard";
import RecruiterSkills from "./pages/RecruiterSkills";
import RecruiterCompanies from "./pages/RecruiterCompanies";
import CompanyDetail from "./pages/CompanyDetail";
import RecruiterLabourers from "./pages/RecruiterLabourers";
import RecruiterReportAttendance from "./pages/RecruiterReportAttendance";
import RecruiterReportInvoices from "./pages/RecruiterReportInvoices";
import RecruiterJobsRatings from "./pages/RecruiterJobsRatings";
import LabourerProfile from "./pages/LabourerProfile";
import LabourerUpcomingJobs from "./pages/LabourerUpcomingJobs";
import LabourerPastJobs from "./pages/LabourerPastJobs";
import CompanyProfile from "./pages/CompanyProfile";
import CompanyJobs from "./pages/CompanyJobs";
import CompanyJobDetail from "./pages/CompanyJobDetail";
import LabourerAttendence from "./pages/LabourerAttendence";
import CompanyJobLabourers from "./pages/CompanyJobLabourers";
import Logout from "./pages/LogOut";
import SafetyReport from "./pages/SafetyReport";

var routes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "design_app",
  //   component: Dashboard,
  //   layout: "",
  //   role: "",
  //   isNavLink: true,
  // },
  {
    path: "/recruiter-skills",
    name: "Skills",
    icon: "design_app",
    component: RecruiterSkills,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/recruiter-companies",
    name: "Companies",
    icon: "design_app",
    component: RecruiterCompanies,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/company-detail/:id",
    name: "Companies",
    icon: "design_app",
    component: CompanyDetail,
    layout: "",
    role: "admin",
    isNavLink: false,
  },
  {
    path: "/recruiter-labourers",
    name: "Labourers",
    icon: "design_app",
    component: RecruiterLabourers,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/recruiter-report-attendance",
    name: "Report attendance",
    icon: "design_app",
    component: RecruiterReportAttendance,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/recruiter-report-invoices",
    name: "Report invoices",
    icon: "design_app",
    component: RecruiterReportInvoices,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/recruiter-jobs-ratings",
    name: "Jobs ratings",
    icon: "design_app",
    component: RecruiterJobsRatings,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/labourer-profile",
    name: "Profile",
    icon: "design_app",
    component: LabourerProfile,
    layout: "",
    role: "labourer",
    isNavLink: true,
  },
  {
    path: "/labourer-upcoming-jobs",
    name: "Upcoming jobs",
    icon: "design_app",
    component: LabourerUpcomingJobs,
    layout: "",
    role: "labourer",
    isNavLink: true,
    profileNeeded: true,
  },
  {
    path: "/labourer-past-jobs",
    name: "Past jobs",
    icon: "design_app",
    component: LabourerPastJobs,
    layout: "",
    role: "labourer",
    isNavLink: true,
    profileNeeded: true,
  },
  {
    path: "/company-profile",
    name: "Profile",
    icon: "design_app",
    component: CompanyProfile,
    layout: "",
    role: "company",
    isNavLink: true,
  },
  {
    path: "/company-jobs",
    name: "Jobs",
    icon: "design_app",
    component: CompanyJobs,
    layout: "",
    role: "company",
    isNavLink: true,
    profileNeeded: true,
  },
  {
    path: "/company-job-detail/:id",
    name: "Jobs",
    icon: "design_app",
    component: CompanyJobDetail,
    layout: "",
    role: "company",
    isNavLink: false,
    profileNeeded: true,
  },
  {
    path: "/labourer-attendence",
    name: "Labourer Attendence",
    icon: "design_app",
    component: LabourerAttendence,
    layout: "",
    role: "company",
    isNavLink: true,
    profileNeeded: true,
  },
  {
    path: "/safety-report",
    name: "Safety Report",
    icon: "design_app",
    component: SafetyReport,
    layout: "",
    role: "company",
    isNavLink: true,
    profileNeeded: true,
  },
  {
    path: "/company-job-labourers/:id",
    name: "company-job-labourers",
    icon: "design_app",
    component: CompanyJobLabourers,
    layout: "",
    role: "company",
    isNavLink: false,
    profileNeeded: true,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "design_app",
    component: Logout,
    layout: "",
    isNavLink: true,
    profileNeeded: false,
  },
];

export default routes;
