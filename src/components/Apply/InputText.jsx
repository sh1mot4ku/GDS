import React from 'react'
import { TextField } from "@material-ui/core"
import "./Apply.scss"

const InputText = ({ placeholder, type, onChange, value }) => {
	return (
		<React.Fragment>
			<TextField
				required
				placeholder={placeholder}
				variant="outlined"
				className="input-small"
				size="small"
				type={type}
				onChange={onChange}
				value={value}
			/>
		</React.Fragment>
	)
}

export default InputText
