import React from 'react'
import './OverviewList.scss';

const OverviewList = ({ title, text }) => {
  return (
    <div className="overview-wrapper">
      <div className="overview-title">{title}</div>
      <div className="overview-text">{text}</div>
    </div>
  )
}

export default OverviewList
