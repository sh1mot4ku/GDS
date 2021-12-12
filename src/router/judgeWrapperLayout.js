import {
  pathnamesWithHeader,
  pathnamesWithFooter,
  pathnamesWithContactSection,
  pathnamesWithSideBar,
} from "../data/pathnames/pathnames";
import { isMobile } from "react-device-detect";

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
  if (isMobile) return layout;

  const isExactMatchHeader = pathnamesExactMatchHeader.includes(currentPath);
  let isPartialMatchHeader = false;
  pathnamesPartialMatchHeader.forEach((pathname) => {
    if (currentPath.includes(pathname)) {
      isPartialMatchHeader = true;
    }
  });

  layout["header"] = isExactMatchHeader || isPartialMatchHeader;

  const isExactMatchFooter = pathnamesExactMatchFooter.includes(currentPath);
  let isPartialMatchFooter = false;
  pathnamesPartialMatchFooter.forEach((pathname) => {
    if (currentPath.includes(pathname)) {
      isPartialMatchFooter = true;
    }
  });
  layout["footer"] = isExactMatchFooter || isPartialMatchFooter;

  const isExactMatchContact = pathnamesExactMatchContact.includes(currentPath);
  layout["contactSection"] = isExactMatchContact;

  const isExactMatchSideBar = pathnamesExactMatchSideBar.includes(currentPath);
  let isPartialMatchSideBar = false;
  pathnamesPartialMatchSideBar.forEach((pathname) => {
    if (currentPath.includes(pathname)) {
      isPartialMatchSideBar = true;
    }
  });
  layout["sideBar"] = isExactMatchSideBar || isPartialMatchSideBar;

  return layout;
};
export default judgeWrapperLayout;
