import React from 'react';
import './AboutPage.scss';

const AboutPage = () => {
  return(
    <div className='main-about'>
      <div className='title'>
        <h2>COMPANY</h2>
        <p>会社概要</p>
      </div>
      <div className='description'>
        <table>
          <tbody>
            <tr className='description_contents'>
              <th><span>会社名</span></th>
              <td><span>Lraough LLC.</span></td>
            </tr>
            <tr className='description_contents'>
              <th><span>設立</span></th>
              <td><span>2021年1月1日</span></td>
            </tr>
            <tr className='description_contents'>
              <th><span>代表者</span></th>
              <td><span>Takuya "Shimotaku" Shimomura</span></td>
            </tr>
            <tr className='description_contents'>
              <th><span>所在地</span></th>
              <td><span className='description_contents_text'>テキストテキストテキストテキストテキスト</span></td>
            </tr>
            <tr className='description_contents'>
              <th><span>事業内容</span></th>
              <td><span className='description_contents_text'>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='image top'>
        <img src={`${process.env.PUBLIC_URL}/image/about-top.webp`} alt='top' />
      </div>
      <div className='profile'>
        <h2>CEO プロフィール</h2>
        <div className='profile_detail'>
          <h3>Takuya "Shimotaku" Shimomura</h3>
          <p>大阪府出身。立命館大学卒。</p>
          <p>大学在学中から海外を旅して人の繋がりの大切さを知る。2年で脱サラ→イギリスで起業した後日本で廃業。結婚を機に某検索大手G社の中でリクルーターとして働き、メガベンチャーや大手企業の本社と海外子会社で人事として従事。3ヵ国（イギリス・シンガポール・アメリカ）10年間の海外経験とTech/Recruitingを武器に、2021年Lraoughをカリフォルニア@LAで創業。現在は「面白い人と人を繋ぐ」天職を生業としている。</p>
        </div>
        <div className='profile_skills'>
          <h3>Skills</h3>
          <p>Direct Recruiting / Sourcing / HR Consulting / Tech Recruiting / STUDIO / Figma</p>
        </div>
        <div className='profile_links'>
          <h3>Links</h3>
          <a href='https://www.linkedin.com/in/shimotaku/' target='_blank' rel="noreferrer">LinkedIn</a>
          <a href='https://www.youtube.com/channel/UCldoAQ3qyeC8wsho-4DcUIw' target='_blank' rel="noreferrer">Youtube</a>
          <a href='https://www.facebook.com/takuya.shimomura' target='_blank' rel="noreferrer">Facebook</a>
        </div>
      </div>
      <div className='works'>
        <h2>Works</h2>
        <a href='https://open.spotify.com/show/3Lh1tvlw9zB1Ao89yFl7Cw' target='_blank' rel="noreferrer" className='works_contents'>
          <div className='works_contents_image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-works1.webp`} alt='work1' />
          </div>
          <div className='works_contents_item'>
            <h3>ラフなしもたくの海外転職RADIO</h3>
            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
          </div>
        </a>
        <div className='border'></div>
        <a href='https://lraough.com/consulting' target='_blank' rel="noreferrer" className='works_contents'>
          <div className='works_contents_image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-works2.webp`} alt='work2' />
          </div>
          <div className='works_contents_item'>
            <h3>【無料PDF配布】グローバル企業のリクルーターからLinkedInでスカウトを待つ時に設定すべき7つの項目</h3>
            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
          </div>
        </a>
        <div className='border'></div>
      </div>
      <div className='interviews'>
        <h2>Interviews</h2>
        <a href='https://qumzine.thefilament.jp/n/nb87a77a5ecc5' target='_blank' rel="noreferrer" className='interviews_contents'>
          <div className='interviews_contents_image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-interview1.webp`} alt='interview1' />
          </div>
          <div className='interviews_contents_item'>
            <h3>カリフォルニア・LA在住の起業家 下村拓哉（しもたく）さんが語るリクルーティングに必要な「人間力」について</h3>
            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
          </div>
        </a>
        <div className='border'></div>
        <a href='https://www.bizreach.jp/content/service/pressrelease/20141117/' target='_blank' rel="noreferrer" className='interviews_contents'>
          <div className='interviews_contents_image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-interview2.webp`} alt='interview2' />
          </div>
          <div className='interviews_contents_item'>
            <h3>Bizreach ダイレクトリクルーティングアワード　最優秀ダイレクト・リクルーター賞受賞</h3>
            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
          </div>
        </a>
        <div className='border'></div>
        <a href='https://careerhack.en-japan.com/report/detail/486' target='_blank' rel="noreferrer" className='interviews_contents'>
          <div className='interviews_contents_image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-interview3.webp`} alt='interview3' />
          </div>
          <div className='interviews_contents_item'>
            <h3>30歳を境に感じた強烈な危機感。DeNA下村拓哉がシンガポールでチャレンジするワケ</h3>
            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
          </div>
        </a>
        <div className='border'></div>
      </div>
      <div className='blog'>
        <h2>Blog</h2>
        <a href='https://note.com/lraough/n/n5cee60158410?magazine_key=m7b08a61f539c' target='_blank' rel="noreferrer" className='blog_contents'>
          <div className='blog_contents_image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-blog1.webp`} alt='blog1' />
          </div>
          <div className='blog_contents_item'>
            <h3>Tech系エンジニア・デザイナー・アントレプレナーの海外就職を支援するLraough/ラフを立ち上げた理由について</h3>
            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
          </div>
        </a>
        <div className='border'></div>
        <a href='https://note.com/lraough/n/nd09546b57580' target='_blank' rel="noreferrer" className='blog_contents'>
          <div className='blog_contents_image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-blog2.webp`} alt='blog2' />
          </div>
          <div className='blog_contents_item'>
            <h3>【誰しもがデザインを理解すべき時代】0からデザインツールFigmaを「無課金」で学ぶ方法まとめ</h3>
            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
          </div>
        </a>
        <div className='border'></div>
        <a href='https://note.com/lraough/n/n34112627fd98?magazine_key=m7b08a61f539c' target='_blank' rel="noreferrer" className='blog_contents'>
          <div className='blog_contents_image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-blog3.webp`} alt='blog3' />
          </div>
          <div className='blog_contents_item'>
            <h3>話題のNotionを使ってLraough Communityのガイドラインを作成してみた</h3>
            <p>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
          </div>
        </a>
        <div className='border'></div>
      </div>
    </div>
  )
}

export default AboutPage;