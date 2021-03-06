import {
  pathnamesWithHeader,
  pathnamesWithFooter,
  pathnamesWithContactSection,
  pathnamesWithSideBar,
} from "../data/pathnames/pathnames";
import { isMobile } from "react-device-detect";

const isPathnamePartialMatch = (pathnames, currentPath) => {
  let isPathPartialMatch = false;
  pathnames.forEach((pathname) => {
    if (currentPath.includes(pathname)) {
      isPathPartialMatch = true;
    }
  });
  return isPathPartialMatch;
};

// return object that contains how layout should be
const judgeWrapperLayout = (currentPath) => {
  const { pathnamesExactMatchHeader, pathnamesPartialMatchHeader } =
    pathnamesWithHeader;
  const { pathnamesExactMatchFooter, pathnamesPartialMatchFooter } =
    pathnamesWithFooter;
  const { pathnamesExactMatchContact } = pathnamesWithContactSection;
  const { pathnamesExactMatchSideBar, pathnamesPartialMatchSideBar } =
    pathnamesWithSideBar;
  const layout = {
    header: false,
    footer: false,
    contactSection: false,
    sideBar: false,
  };
  if (isMobile && currentPath === "/joblistings_management") return layout;

  const isExactMatchHeader = pathnamesExactMatchHeader.includes(currentPath);
  layout["header"] =
    isExactMatchHeader ||
    isPathnamePartialMatch(pathnamesPartialMatchHeader, currentPath);

  const isExactMatchFooter = pathnamesExactMatchFooter.includes(currentPath);
  layout["footer"] =
    isExactMatchFooter ||
    isPathnamePartialMatch(pathnamesPartialMatchFooter, currentPath);

  const isExactMatchContact = pathnamesExactMatchContact.includes(currentPath);
  layout["contactSection"] = isExactMatchContact;

  const isExactMatchSideBar = pathnamesExactMatchSideBar.includes(currentPath);
  layout["sideBar"] =
    isExactMatchSideBar ||
    isPathnamePartialMatch(pathnamesPartialMatchSideBar, currentPath);

  return layout;
};
export default judgeWrapperLayout;
