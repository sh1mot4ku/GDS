import React from 'react'
import { TextField } from "@material-ui/core"
import "./Apply.scss"

const InputTextAndLabel = ({ placeholder, type, onChange }) => {
	return (
		<React.Fragment>
			<TextField
				placeholder={placeholder}
				variant="outlined"
				margin="normal"
				className="input"
				type={type}
				onChange={onChange}
			/>
		</React.Fragment>
	)
}

export default InputTextAndLabel