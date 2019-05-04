import BpkLargeUpIcon from "bpk-component-icon/lg/arrow-up";
import BpkLargeAccountIcon from "bpk-component-icon/lg/account";
import BpkLargeBusinessIcon from "bpk-component-icon/lg/business";
import BpkLargeMailIcon from "bpk-component-icon/lg/mail";
import BpkLargeLandmarkIcon from "bpk-component-icon/lg/landmark";
import BpkLargeFlaskIcon from "bpk-component-icon/lg/flask";
import { withButtonAlignment } from "bpk-component-icon";

const AlignedBpkLargeUpIcon = withButtonAlignment(BpkLargeUpIcon);
const AlignedBpkLargeBusinessIcon = withButtonAlignment(BpkLargeBusinessIcon);
const AlignedBpkLargeMailIcon = withButtonAlignment(BpkLargeMailIcon);
const AlignedBpkLargeLandmarkIcon = withButtonAlignment(BpkLargeLandmarkIcon);
const AlignedBpkLargeAccountIcon = withButtonAlignment(BpkLargeAccountIcon);
const AlignedBpkLargeFlaskIcon = withButtonAlignment(BpkLargeFlaskIcon);

const nav = [
  {
    id: "top",
    name: "Top",
    icon: AlignedBpkLargeUpIcon
  },
  {
    id: "profile",
    name: "Profile",
    icon: AlignedBpkLargeAccountIcon
  },
  {
    id: "projects",
    name: "Projects",
    icon: AlignedBpkLargeFlaskIcon
  },
  {
    id: "career",
    name: "Career",
    icon: AlignedBpkLargeBusinessIcon
  },
  {
    id: "education",
    name: "Education",
    icon: AlignedBpkLargeLandmarkIcon
  },
  {
    id: "contact",
    name: "Contact",
    icon: AlignedBpkLargeMailIcon
  }
];
export default nav;
