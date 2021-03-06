import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startDeleteUsersJobListings } from "../../action/usersJobListings";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "../ui/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./JobBox.scss";

const JobBox = ({
  photoUrl,
  jobTitle,
  companyName,
  employeeLocation,
  jobListing,
  tags,
  id,
}) => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickDelete = () => {
    setIsOpenModal(true);
    handleClose();
  };

  const onDelete = async () => {
    await dispatch(startDeleteUsersJobListings(id));
    setIsOpenModal(false);
  };

  return (
    <React.Fragment>
      <div className="job-box-wrapper">
        <Link to={`/edit_joblisting/${id}`}>
          <div className="job-wrapper">
            <div className="job-img-wrapper">
              <img src={photoUrl} className="job-img" alt="top-job"></img>
            </div>
            <div>
              <div className="job-box-content">
                <span className="job-title">{jobTitle}</span>
              </div>
              <div className="job-box-content">
                <span className="company-name">{companyName}</span>
              </div>
              <div className="job-box-content">
                <span className="location">{employeeLocation}</span>
              </div>
              <div className="job-box-skill-tags">
                {Array.isArray(tags) &&
                  tags.length !== 0 &&
                  tags.map((skill) => (
                    <div className="skill-tag-wrapper" key={skill}>
                      <span className="skill-tag">{skill}</span>
                    </div>
                  ))}
              </div>
              <div className="job-box-content">
                <span className="short-jd">{jobListing}</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="meatballs-menu-wrapper">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className="meatballs-menu"
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: "220px",
              },
            }}
          >
            <div className="meatballs-menu-list-wrapper">
              <Link to={`copy_joblisting/${id}`}>
                <MenuItem className="meatballs-menu-list">
                  <img
                    src="/photos/chevron-right 2.svg"
                    alt="chevron"
                    className="list-icon"
                  />
                  <span>??????</span>
                </MenuItem>
              </Link>
              <div onClick={onClickDelete}>
                <MenuItem className="meatballs-menu-list" id="delete">
                  <DeleteIcon className="list-icon" />
                  <span>??????</span>
                </MenuItem>
              </div>
            </div>
          </Menu>
        </div>
      </div>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <div className="delete-modal">
            <CloseIcon
              className="close-icon"
              onClick={() => setIsOpenModal(false)}
            />
            <div className="delete-modal-header">??????????????????????????????</div>
            <div className="delete-modal-description">
              ??????????????????????????????????????????????????????????????????????????????????????????????????????
            </div>
            <div className="buttons-wrapper">
              <div
                onClick={onDelete}
                className="btn-lg btn-fill-warning btn-delete"
              >
                ??????
              </div>
              <div
                onClick={() => setIsOpenModal(false)}
                className="btn-lg btn-line-plane btn-line-opacity"
              >
                ???????????????
              </div>
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default JobBox;
