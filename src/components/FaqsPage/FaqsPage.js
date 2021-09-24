import './FaqsPage.scss';
import Faq from './Faq';

const FaqsPage = () => {
  // const title = {
  //   01: '質問タイトルが入ります - 01',
  //   02: '質問タイトルが入ります - 02',
  //   03: '質問タイトルが入ります - 03',
  //   04: '質問タイトルが入ります - 04',
  // }
  return (
    <div className='main'>
      <div className='title'>
        <h2>FAQS</h2>
        <p>よくあるご質問</p>
      </div>
      <div className='contents'>
        <Faq />
        {/* <Faq title={title[1]} />
        <Faq title={title[2]} />
        <Faq title={title[3]} />
        <Faq title={title[4]} /> */}
      </div>
    </div>
  )
}

export default FaqsPage;