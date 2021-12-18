import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMedia from 'use-media';
import HeaderTBandMB from './HeaderTBandMB';
import HeaderPC from './HeaderPC';
import './Header.scss';
import { useSelector } from 'react-redux';

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const isTablet = useMedia({ maxWidth: '1024px' });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setIsUserLoggedIn(true);
      userInfo.userType === 'recruiter'
        ? setIsRecruiter(true)
        : setIsRecruiter(false);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [userInfo]);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to={userInfo ? '/joblistings' : '/'}>
            <img
              className="company-logo"
              src="/image/lraoughLogo.png"
              alt="Lraough-logo"
            />
          </Link>
          {isUserLoggedIn !== null && isTablet ? (
            <HeaderTBandMB
              isUserLoggedIn={isUserLoggedIn}
              isRecruiter={isRecruiter}
            />
          ) : (
            <HeaderPC
              isUserLoggedIn={isUserLoggedIn}
              isRecruiter={isRecruiter}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
