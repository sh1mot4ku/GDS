import React from 'react'
import { FormLabel, TextField } from "@material-ui/core"
import "./Recruiter.scss"

const InputTextAndLabel = ({ label, placeholder, type, onChange, value }) => {
	return (
		<React.Fragment>
			<FormLabel component="legend" required>
				{label}
			</FormLabel>
			<TextField
				required
				multiline
				variant="outlined"
				margin="normal"
				className="text-area"
				rows={4}
				size="small"
				placeholder={placeholder}
				type={type}
				onChange={onChange}
				value={value}
			/>
		</React.Fragment>
	)
}

export default InputTextAndLabel
