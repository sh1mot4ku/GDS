import React from 'react'
import { FormLabel, TextField } from "@material-ui/core"
import "./Apply.scss"

const InputTextAndLabel = ({ label, placeholder, type, onChange }) => {
	return (
		<React.Fragment>
			<FormLabel component="legend" required>
				{label}
			</FormLabel>
			<TextField
				placeholder={placeholder}
				variant="outlined"
				margin="normal"
				className="input"
        size="small"
				type={type}
				onChange={onChange}
			/>
		</React.Fragment>
	)
}

export default InputTextAndLabel
