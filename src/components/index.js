import Notification, { notify } from "./common/Notification";
import { DevModeSwitch } from "./common/DevModeSwitch";
import { Header } from "./dependants/Header";
import { SideMenuItems } from "./dependants/SideMenuItems";
import { AddOpportunity } from "../components/dependants/AddOpportunity";
import { ListOpportunity } from "../components/dependants/ListOpportunity";
import MyCompany from "./dependants/MyCompany";
import { TextEditor } from "./dependants/QuillEditor";
import AddButtonCard from "./dependants/AddButtonCard";
import { Candidate } from "./dependants/Candidate";
import { ExperienceCV } from "./dependants/cv/ExperienceCV";
import { EducationCV } from "./dependants/cv/EducationCV";
import { CoverLetterCV } from "./dependants/cv/CoverLetterCV";
import { VolunteerCV } from "./dependants/cv/VolunteerCV";
import { TemporaryDrawer } from "./common/Drawer";
import { StartOnBoarding } from "./dependants/onBoarding/StartOnBoarding";
import { NoExperience } from "./dependants/onBoarding/NoExperience";
import { GotExperience } from "./dependants/onBoarding/GotExperience";
import { CurtainIndustrySelection } from "./dependants/onBoarding/CurtainIndustrySelection";
import { IndustrySelection } from "./dependants/onBoarding/IndustrySelection";
import { AvatarPictureUpload } from "./dependants/onBoarding/AvatarPictureUpload";
import { EndOnBoarding } from "./dependants/onBoarding/EndOnBoarding";
import { CoverLetterAndResume } from "./dependants/listJobsTab/CoverLetterAndResume";
import { EndApplication } from "./dependants/listJobsTab/EndApplication";
import { FullListJobs } from "./dependants/listJobsTab/FullListJobs";
import { JobFullView } from "./dependants/listJobsTab/JobFullView";
import { JobSmallCard } from "./dependants/listJobsTab/JobSmallCard";
import { Spinner } from "./common/Spinner";
import { FullListResources } from "./dependants/resourcesTab/FullListResources";
import { ResourceFullView } from "./dependants/resourcesTab/ResourceFullView";
import { ResourceSmallCard } from "./dependants/resourcesTab/ResourceSmallCard";
import { EditEducation } from "./dependants/profile/EditEducation";
import { EditExperience } from "./dependants/profile/EditExperience";
import { EditSearchSettings } from "./dependants/profile/EditSearchSettings";
import { EditVolunteer } from "./dependants/profile/EditVolunteer";
import { Experience } from "./dependants/profile/Experience";
import { Education } from "./dependants/profile/Education";
import { Volunteer } from "./dependants/profile/Volunteer";
import { AddNewExperience } from "./dependants/profile/AddNewExperience";
import { EditProfile } from "./dependants/profile/EditProfile";

export {
  AddOpportunity,
  ListOpportunity,
  Notification,
  notify,
  DevModeSwitch,
  Header,
  SideMenuItems,
  MyCompany,
  TextEditor,
  AddButtonCard,
  Candidate,
  ExperienceCV,
  EducationCV,
  CoverLetterCV,
  VolunteerCV,
  TemporaryDrawer,
  StartOnBoarding,
  NoExperience,
  GotExperience,
  IndustrySelection,
  CurtainIndustrySelection,
  EndOnBoarding,
  AvatarPictureUpload,
  CoverLetterAndResume,
  EndApplication,
  FullListJobs,
  JobFullView,
  JobSmallCard,
  Spinner,
  FullListResources,
  ResourceFullView,
  ResourceSmallCard,
  EditEducation,
  EditExperience,
  EditSearchSettings,
  EditVolunteer,
  Experience,
  Education,
  Volunteer,
  AddNewExperience,
  EditProfile,
};
