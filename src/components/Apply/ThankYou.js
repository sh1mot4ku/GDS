import React from "react";
import BlueSidePart from "../BlueSidePart/BlueSidePart";
import { Link } from "react-router-dom";
import "./ThankYou.scss";

const ThankYou = () => {
  return (
    <div className="main-apply">
      <BlueSidePart />
      <div className="rightBox">
        <form className="form">
          <>
            <div className="thxBox">
              <h2 className="thxTitle">Thank you for Applying</h2>
              <p className="sentence">
                この度はGlobal
                Developersへのご興味を頂き誠にありがとうございます。
                <br />
                <br />
                ご応募頂いた皆様には、1週間以内にご連絡を改めさせて頂きます。
                <br />
                今後のプロセスについては、今までのご経験についてより詳しく知るための面談や面接が行われる予定です。
                <br />
                審査後に改めてメールにてお知らせ致します。
                <br />
                <br />
                尚現在はα版として運用しており、β版ローンチは2022年1月を目指しております。
                <br />
                本格ローンチまでに、お友達へのご紹介など含めて温かく見守って頂けましたら幸いです。今後とも何卒宜しくお願い致します。
              </p>
              <Link to="/">
                <button className="btn-lg btn-fill">ホームへ戻る</button>
              </Link>
            </div>
          </>
        </form>
      </div>
    </div>
  );
};

export default ThankYou;
