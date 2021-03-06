import React from "react";
import "./TopPage.scss";
import "../ui/Button.scss";
import { Link, useHistory } from "react-router-dom";
// import useMedia from "use-media";

const TopPage = () => {
  const history = useHistory();
  // const isMobile = useMedia({ maxWidth: "768px" });

  return (
    <div className="top-wrapper">
      <div className="subscribe-wrapper">
        <div
          className="subscribe-container"
          style={{ backgroundImage: "url(/image/logo-global-developers.svg)" }}
        >
          <h1 className="subscribe-header">
            厳選されたグローバルな開発者と共に
            <br />
            プロダクトやサービスを世界へ
          </h1>
          <div className="subscribe-header2">
            グローバル/リモートでの開発案件に興味のある方はこちら
          </div>
          <div className="subscribe-buttons-top">
            <Link to="/apply-developer">
              <button className="btn-lg btn-line-opacity">無料会員登録</button>
            </Link>
            <Link to="/apply-recruiter">
              <button className="btn-lg btn-fill-opacity">
                採用担当者の方
              </button>
            </Link>
          </div>
        </div>
        <div className="d-demo subscribe-logos">
          <div className="d-demo__wrap">
            <ul className="d-demo__list d-demo__list--left">
              <li className="d-demo__item">
                <img
                  src="/image/logo01.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo02.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo03.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo04.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo05.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo06.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo07.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo08.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo09.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo10.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo11.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo12.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo13.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo14.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
            </ul>
            <ul className="d-demo__list d-demo__list--left">
              <li className="d-demo__item">
                <img
                  src="/image/logo01.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo02.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo03.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo04.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo05.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo06.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo07.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo08.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo09.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo10.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo11.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo12.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo13.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
              </li>
              <li className="d-demo__item">
                <img
                  src="/image/logo14.png"
                  alt="tech-logos"
                  className="tech-logos"
                />
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
              src="/image/Interviewing candidate for job - 1280x853 1.png"
              alt="Interviewing candidate for job"
              className="describe-photo-content"
            />
          </div>
          <div className="describe-text">
            <h2 className="describe-header">
              必要な開発者・スキルを教えて下さい
            </h2>
            <div className="describe-div">
              あなたの開発ニーズをお聞かせください。当社のコンサルタントが、高いスキルを持つ開発者やデザイナーの中から、お客様に最適な人材をご紹介します。
            </div>
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
              src="/image/HR manager hand shaking with female candidate - 900x750 1.png"
              alt="HR manager hand shaking with female candidate"
              className="describe-photo-content"
            />
          </div>
          <div className="describe-text">
            <h2 className="describe-header">完璧な開発者を紹介します</h2>
            <div className="describe-div">
              お客様のニーズに応じて、日本語が使えるグローバルで優秀なタレントやチームをアサインします。
            </div>
            <ul className="describe-lines">
              <li>
                ・あなたのタイムゾーン(or
                リモート）に基づいてタレントを紹介します
              </li>
              <li>
                ・似たようなプロジェクトやニッチな分野に取り組んだことのある人材を紹介します
              </li>
              <li>
                ・パートタイム／フルタイム／アドホックなど、必要に応じたコミットメントに対応可能です
              </li>
            </ul>
          </div>
        </div>
        <div className="for-recruiter-describe-box">
          <div className="describe-photo">
            <img
              src="/image/Recruiters searching new employees - 1280x853 1.png"
              alt="Recruiters searching new employees"
              className="describe-photo-content"
            />
          </div>
          <div className="describe-text">
            <h2 className="describe-header">
              無料でのご相談やトライアルが可能です
            </h2>
            <div className="describe-div">
              <p>2〜3日以内に担当者からコンタクト致します。</p>
              <p>
                無料で開発案件のヒアリングやコンサルティング、必要に応じてトライアルが可能です。
              </p>
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
        <button
          onClick={() => history.push("/apply-developer")}
          className="subscribe-button-wrapper btn-line-opacity"
        >
          <div className="subscribe-button" id="for-developer">
            <img
              src="/image/icon-user.png"
              alt="icon-user"
              className="subscribe-user-icon"
            />
            <span className="subscribe-text">求人をお探しの方はコチラ</span>
          </div>
        </button>
        <button
          onClick={() => history.push("/apply-recruiter")}
          className="subscribe-button-wrapper btn-fill-opacity"
        >
          <div className="subscribe-button" id="for-recruiter">
            <img
              src="/image/users 1.png"
              alt="users"
              className="subscribe-user-icon"
            />
            <span className="subscribe-text">求職者をお探しの方はコチラ</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TopPage;
