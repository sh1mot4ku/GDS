import React from 'react';
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
      <div className='image'>
        <img src={`${process.env.PUBLIC_URL}/image/about-top.webp`} alt='top' />
      </div>
      <div className='main-description'>
        <div className='title'>
          <h1>笑顔と共に生きる開拓者であれ</h1>
        </div>
        <div className='description'>
          <p>
            人が一般的には進まない道を歩むことを <br/>
            「けもの道を行く」と表現します <br/>
            未開の地を目指した先人が創り上げた道により <br/>
            その場は大きく発展していきます <br/>
          </p>
          <p>
            Tech業界でのチャレンジとは「現代のけもの道」です <br/>
            今までの常識を見直し　より便利なものを世に届ける <br/>
            そんな現場で活躍する人達と切磋琢磨しながら <br/>
            ここアメリカまでやってきました <br/>
          </p>
          <p>
            自然や動物と育った僕は <br/>
            ありのままの笑顔と共に <br/>
            自分らしく生きる開拓者と出逢うチャンスを与えられ <br/>
            また自身も望んでそうなりました <br/>
          </p>
          <p>
            これからもそんな人々と事業を繋げたい <br/>
            自身の強みである「出逢いを創出する」力を使って <br/>
            そう思って立ち上げた会社が　Lraough　です <br/>
          </p>
          <p>
            想いに共感頂けた開拓者であるそこのあなた <br/>
            一緒に　けもの道を　笑顔で歩んで行きましょう <br/>
          </p>
          <div className='image'>
            <img src={`${process.env.PUBLIC_URL}/image/about-sign.webp`} alt='sign' />
          </div>
        </div>
      </div>
      <div className='main-about'>
        <div className='about'>
          <h1>ABOUT</h1>
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
      </div>
    </div>
  )
}

export default AboutPage;