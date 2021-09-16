import React from 'react';
import './AboutPage.scss';
// image
// import '../../public/image/about-blog1.webp'
// import '../../public/image/about-blog2.webp'
// import '../../public/image/about-blog3.webp'
// import '../../public/image/about-interview1.webp'
// import '../../public/image/about-interview2.webp'
// import '../../public/image/about-interview3.webp'
// import '../../public/image/about-sign.webp'
// import '../../public/image/about-top.webp'
// import '../../public/image/about-top2.webp'
// import '../../public/image/about-works1.webp'
// import '../../public/image/about-works2.webp'

const AboutPage = () => {
  return(
    <div className='main'>
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
              <td><span>テキストテキストテキストテキストテキスト</span></td>
            </tr>
            <tr className='description_contents'>
              <th><span>事業内容</span></th>
              <td><span>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</span></td>
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
          <h3>SKILLS</h3>
          <p>Direct Recruiting / Sourcing / HR Consulting / Tech Recruiting / STUDIO / Figma</p>
        </div>
        <div className='profile_links'>
          <h3>LINKS</h3>
          <a href='#'>LinkedIn</a>
          <a href='#'>Youtube</a>
          <a href='#'>Facebook</a>
        </div>
      </div>
      {/* <div className='main-about'>
        <div className='about'>
          <h1 className='font-m'>ABOUT</h1>
          <h3>Takuya "Shimotaku" Shimomura</h3>
          <p>Lraough LLC. Founder/CEO</p>
          <p>大阪府出身。立命館大学卒。
            大学在学中から海外を旅して人の繋がりの大切さを知る。2年で脱サラ→イギリスで起業した後日本で廃業。結婚を機に某検索大手G社の中でリクルーターとして働き、メガベンチャーや大手企業の本社と海外子会社で人事として従事。3ヵ国（イギリス・シンガポール・アメリカ）10年間の海外経験とTech/Recruitingを武器に、2021年Lraoughをカリフォルニア@LAで創業。現在は「面白い人と人を繋ぐ」天職を生業としている。
          </p>
        </div>
        <div className='about-sub'>
          <div className='image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-top2.webp`} alt='shimotaku' />
          </div>
          <h2>SKILLS</h2>
          <p>Direct Recruiting / Sourcing / HR Consulting / Tech Recruiting / STUDIO / Figma</p>
          <h2>LINKS</h2>
          <div className='links'>
            <a href='https://www.linkedin.com/in/shimotaku/'>LinkedIn</a>
            <a href='https://www.youtube.com/channel/UCldoAQ3qyeC8wsho-4DcUIw'>Youtube</a>
            <a href='https://www.facebook.com/takuya.shimomura'>Facebook</a>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default AboutPage;