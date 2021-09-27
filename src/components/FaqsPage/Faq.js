import React, { useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, styled } from '@material-ui/core';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';

// const AccordionSummary = styled((prop) => (
//   <MuiAccordionSummary
//     expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
//     {...props}
//   />
//   ))(({ theme }) => ({
//     backgroundColor:
//       theme.palette.mode === 'dark'
//         ? 'rgba(255, 255, 255, .05)'
//         : 'rgba(0, 0, 0, .03)',
//     flexDirection: 'row-reverse',
//     '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//       transform: 'rotate(90deg)',
//     },
//     '& .MuiAccordionSummary-content': {
//       marginLeft: theme.spacing(1),
//     },
// }));

const Faq = ({question}) => {

  useEffect(() => {
    console.log(question)
  }, [question])

  return (
    <>
      {question && (
        <div className='content'>

          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon />}
              aria-controls={`panel${question.id}d-content`}
              id={`panel${question.id}d-header`}
            >
              <Typography>{question.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {question.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </>
  )
}

export default Faq;