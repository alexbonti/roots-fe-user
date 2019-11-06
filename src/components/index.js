import Notification, { notify } from "./common/Notification";
import { DevModeSwitch } from "./common/DevModeSwitch";
import { Header } from "./dependants/Header";
import { SideMenuItems } from "./dependants/SideMenuItems";
import { AddOpportunity } from "../components/dependants/AddOpportunity";
import { ListOpportunity } from "../components/dependants/ListOpportunity";
import { EditMyCompany } from "./dependants/EditMyCompany";
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
import {CurtainIndustrySelection} from "./dependants/onBoarding/CurtainIndustrySelection";
import {IndustrySelection} from "./dependants/onBoarding/IndustrySelection";
import {AvatarPictureUpload} from "./dependants/onBoarding/AvatarPictureUpload";
import {EndOnBoarding} from "./dependants/onBoarding/EndOnBoarding";
import {CoverLetterAndResume} from "./dependants/listJobsTab/CoverLetterAndResume";
// import {EndApplication} from "./dependants/listJobsTab/EndApplication";
import {FullListJobs} from "./dependants/listJobsTab/FullListJobs";
import {JobFullView} from "./dependants/listJobsTab/JobFullView";
import {JobSmallCard} from "./dependants/listJobsTab/JobSmallCard";
import {Spinner} from './common/Spinner';


export {
  AddOpportunity,
  ListOpportunity,
  Notification,
  notify,
  DevModeSwitch,
  Header,
  SideMenuItems,
  EditMyCompany,
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
// EndApplication,
  FullListJobs,
  JobFullView,
  JobSmallCard,
  Spinner,
  
};
