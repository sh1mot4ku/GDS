import { React, useState } from 'react';
import './FaqsPage.scss';
import Faq from './Faq';

const FaqsPage = () => {
  const [question, setQuestion] = useState([
    {
      'title': 'test1',
      'content': 'aaa'
      },
    {
      'title': 'test2',
      'content': 'bbb'
    },
  ])
  return (
    <div className='main'>
      <div className='title'>
        <h2>FAQS</h2>
        <p>よくあるご質問</p>
      </div>
      <div className='contents'>
        <Faq />
        <Faq question={question[0]} />
        <Faq question={question[1]} />
        {/* <Faq title={title[3]} />
        <Faq title={title[4]} /> */}
      </div>
    </div>
  )
}

export default FaqsPage;