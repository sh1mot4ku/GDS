import React, { useEffect } from 'react';
import { makeStyles }  from '@material-ui/core/styles';

import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';


const useStyles = makeStyles({
  'arrow:active': {
    transform: 'rotate(180deg)'
  }
});


const Faq = ({question}) => {

  const [expanded, setExpanded] = React.useState('panel1');
  const [clicked, setClicked] = useState<boolean>(false);
  
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // const classes = useStyles();

  useEffect(() => {
  }, [question])

  return (
    <>
      {question && (
        <div className='content'>
          <Accordion expanded={expanded === `panel${question.id}`} onChange={handleChange(`panel${question.id}`)}>
            <AccordionSummary
              expandIcon={<ArrowForwardIosSharpIcon />}
              aria-controls={`panel${question.id}d-content`}
              id={`panel${question.id}d-header`}
              onMouseDown={() => {
                //クリック実施時に色変更
                setClicked(true);
              }}
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