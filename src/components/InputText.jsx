import React from 'react'
import { FormLabel, TextField } from "@material-ui/core"
import "./Apply.scss"

const InputText = ({ label, placeholder, type }) => {
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
				type={type}
			/>
		</React.Fragment>
	)
}

export default InputText
