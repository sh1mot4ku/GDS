import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
const Faq = () => {
  return (
    <>
      <div className='content'>
        <h3>質問タイトルが入ります - 01</h3>
        <p>人が一般的には進まない道を歩むことを「けもの道を行く」と表現します。未開の地を目指した先人が創り上げた道により、その場は大きく発展していきます。
        Tech業界でのチャレンジとは「現代のけもの道」です。今までの常識を見直し　より便利なものを世に届ける。そんな現場で活躍する人達と切磋琢磨しながらここアメリカまでやってきました。</p>
      </div>
      {/* <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </>
  )
}

export default Faq;