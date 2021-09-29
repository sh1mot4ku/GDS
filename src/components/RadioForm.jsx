import React from 'react'
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core"
import "./Apply.scss"


const RadioForm = ({value, handleChange, label, options}) => {
	console.log("hhhh:", label);
	return (
		<React.Fragment>
			<RadioGroup
				aria-label="radio"
				name="radio"
				value={value}
				onChange={handleChange}
				className="radio"
			>
				<FormLabel component="legend" required>
					{label}
        </FormLabel>
				{options.map((item, index) => (
					<FormControlLabel
					value={item}
					control={<Radio color="primary" />}
					label={item}
					key={index}
				/>
				))}
			</RadioGroup>
		</React.Fragment>
	)
}

export default RadioForm






