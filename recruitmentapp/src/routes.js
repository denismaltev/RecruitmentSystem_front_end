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
    icon: "education_hat",
    component: RecruiterSkills,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/recruiter-companies",
    name: "Companies",
    icon: "business_badge",
    component: RecruiterCompanies,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/company-detail/:id",
    name: "Companies",
    icon: "business_badge",
    component: CompanyDetail,
    layout: "",
    role: "admin",
    isNavLink: false,
  },
  {
    path: "/recruiter-labourers",
    name: "Labourers",
    icon: "ui-2_settings-90",
    component: RecruiterLabourers,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/recruiter-report-attendance",
    name: "Report attendance",
    icon: "files_paper",
    component: RecruiterReportAttendance,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/recruiter-report-invoices",
    name: "Invoices",
    icon: "business_money-coins",
    component: RecruiterReportInvoices,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/recruiter-jobs-ratings",
    name: "Jobs ratings",
    icon: "ui-2_like",
    component: RecruiterJobsRatings,
    layout: "",
    role: "admin",
    isNavLink: true,
  },
  {
    path: "/labourer-profile",
    name: "Profile",
    icon: "users_single-02",
    component: LabourerProfile,
    layout: "",
    role: "labourer",
    isNavLink: true,
  },
  {
    path: "/labourer-upcoming-jobs",
    name: "Upcoming jobs",
    icon: "arrows-1_minimal-right",
    component: LabourerUpcomingJobs,
    layout: "",
    role: "labourer",
    isNavLink: true,
    profileNeeded: true,
  },
  {
    path: "/labourer-past-jobs",
    name: "Past jobs",
    icon: "arrows-1_minimal-left",
    component: LabourerPastJobs,
    layout: "",
    role: "labourer",
    isNavLink: true,
    profileNeeded: true,
  },
  {
    path: "/company-profile",
    name: "Profile",
    icon: "business_badge",
    component: CompanyProfile,
    layout: "",
    role: "company",
    isNavLink: true,
  },
  {
    path: "/company-jobs",
    name: "Jobs",
    icon: "ui-2_settings-90",
    component: CompanyJobs,
    layout: "",
    role: "company",
    isNavLink: true,
    profileNeeded: true,
  },
  {
    path: "/company-job-detail/:id",
    name: "Jobs",
    icon: "files_single-copy-04",
    component: CompanyJobDetail,
    layout: "",
    role: "company",
    isNavLink: false,
    profileNeeded: true,
  },
  {
    path: "/labourer-attendence",
    name: "Labourer Attendence",
    icon: "design_bullet-list-67",
    component: LabourerAttendence,
    layout: "",
    role: "company",
    isNavLink: true,
    profileNeeded: true,
  },
  {
    path: "/safety-report",
    name: "Safety Report",
    icon: "business_bulb-63",
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
    icon: "arrows-1_share-66",
    component: Logout,
    layout: "",
    isNavLink: false,
    profileNeeded: false,
  },
];

export default routes;
