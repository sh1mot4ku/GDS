import React, { useEffect } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';

const Faq = (props) => {

  useEffect(() => {
    console.log(props.question)
  }, [props.question])

  return (
    <>
      {props.question && (
        <div className='content'>
          <h3>{props.question.title}</h3>
          <p>{props.question.content}</p>

          {/* <Accordion disabled>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Disabled Accordion</Typography>
            </AccordionSummary>
          </Accordion> */}
        </div>
      )}
    </>
  )
}

export default Faq;