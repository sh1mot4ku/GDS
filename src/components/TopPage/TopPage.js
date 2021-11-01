import React from 'react';
import './TopPage.scss';
import Button from '@material-ui/core/Button';
// import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import useMedia from 'use-media';

const TopPage = () => {
  const isMobile = useMedia({ maxWidth: '768px' });

  const recruiterSubscribe = () => {
    // move to page of subscribing for recruiter
  };

  return (
    <div className="top-wrapper">
      <div className="subscribe-wrapper">
        <div className="subscribe-container" style={{ backgroundImage: "url(/photos/logo-global-developers.svg)" }} >
          <h1 className="subscribe-header">厳選されたグローバルな開発者と共に<br />プロダクトやサービスを世界へ</h1>
          <div className="subscribe-header2">
            想いに共感頂けた開拓者であるそこのあなた
            {!isMobile && <br />}
            一緒にけもの道を笑顔で歩んで行きましょう
          </div>
          <div className="subscribe-buttons-top">
            <Link to="/apply-developer">
              <Button
                variant="contained"
                className="round-button background-white"
              >
                無料会員登録
              </Button>
            </Link>
            <Button
              onClick={recruiterSubscribe}
              variant="contained"
              color="primary"
              className="round-button"
            >
              採用担当者の方
            </Button>
          </div>
        </div>
        <div className="d-demo subscribe-logos">
          <div className="d-demo__wrap">
              <ul className="d-demo__list d-demo__list--left">
                <li className="d-demo__item">
                  <img src="/photos/logo01.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo02.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo03.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo04.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo05.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo06.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo07.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo08.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo09.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo10.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo11.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo12.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo13.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo14.png" alt="tech-logos" className="tech-logos" />
                </li>
                </ul>
                <ul className="d-demo__list d-demo__list--left">
                <li className="d-demo__item">
                  <img src="/photos/logo01.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo02.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo03.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo04.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo05.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo06.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo07.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo08.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo09.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo10.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo11.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo12.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo13.png" alt="tech-logos" className="tech-logos" />
                </li>
                <li className="d-demo__item">
                  <img src="/photos/logo14.png" alt="tech-logos" className="tech-logos" />
                </li>
                </ul>
          </div>
        </div>
      </div>
      <div className="for-recruiter-wrapper">
        <div className="for-recruiter-header-container">
          <h1 className="for-recruiter-header">FOR RECRUITER</h1>
          <div className="for-recruiter-subheader">採用担当者の方へ</div>
        </div>
        <div className="for-recruiter-describe-box">
          <div className="describe-photo">
            <img
              src="/photos/Interviewing candidate for job - 1280x853 1.png"
              alt="Interviewing candidate for job"
              className="describe-photo-content"
            />
          </div>
          <div className="describe-text">
            <h2 className="describe-header">必要な開発者・スキルを教えて下さい</h2>
            <div className="describe-div">あなたの開発ニーズをお聞かせください。当社のコンサルタントが、高いスキルを持つ開発者やデザイナーの中から、お客様に最適な人材をご紹介します。</div>
            <ul className="describe-lines">
              <li>・求めている主なスキルを教えてください</li>
              <li>・スキル以外で必要な経験もヒアリングします</li>
              <li>・具体的な人物像があれば共有してください</li>
            </ul>
          </div>
        </div>
        <div className="for-recruiter-describe-box" id="describe-reverse">
          <div className="describe-photo">
            <img
              src="/photos/HR manager hand shaking with female candidate - 900x750 1.png"
              alt="HR manager hand shaking with female candidate"
              className="describe-photo-content"
            />
          </div>
          <div className="describe-text">
            <h2 className="describe-header">完璧な開発者を紹介します</h2>
            <div className="describe-div">お客様のニーズに応じて、日本語が使えるグローバルで優秀なタレントやチームをアサインします。</div>
            <ul className="describe-lines">
              <li>・あなたのタイムゾーン(or リモート）に基づいてタレントを紹介します</li>
              <li>・似たようなプロジェクトやニッチな分野に取り組んだことのある人材を紹介します</li>
              <li>・パートタイム／フルタイム／アドホックなど、必要に応じたコミットメントに対応可能です</li>
            </ul>
          </div>
        </div>
        <div className="for-recruiter-describe-box">
          <div className="describe-photo">
            <img
              src="/photos/Recruiters searching new employees - 1280x853 1.png"
              alt="Recruiters searching new employees"
              className="describe-photo-content"
            />
          </div>
          <div className="describe-text">
            <h2 className="describe-header">無料でのご相談やトライアルが可能です</h2>
            <div className="describe-div">
              <p>2〜3日以内に担当者からコンタクト致します。</p>
              <p>無料で開発案件のヒアリングやコンサルティング、必要に応じてトライアルが可能です。</p>
            </div>
            <ul className="describe-lines">
              <li>・平均的に24時間以内での課題解決</li>
              <li>・いきなり採用するのではなく、トライアルから対応可能</li>
              <li>・エンジニアやデザイナーとの事前面談が可能</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="subscribe-buttons-buttom">
        <Button variant="outlined" color="primary" className="subscribe-button-wrapper">
          <div className="subscribe-button" id="for-developer">
            <img src="/photos/icon-user.png" alt="icon-user" className="subscribe-user-icon" />
            <span className="subscribe-text">求人をお探しの方はコチラ</span>
          </div>
        </Button>
        <Button variant="contained" color="primary" className="subscribe-button-wrapper">
          <div className="subscribe-button" id="for-recruiter">
            <img src="/photos/users 1.png" alt="users" className="subscribe-user-icon" />
            <span className="subscribe-text">求職者をお探しの方はコチラ</span>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default TopPage;