import React from "react";
import BlueSidePart from "../../BlueSidePart/BlueSidePart";
import { FormLabel, TextField, Button } from "@mui/material";
import "./ContactForm.scss";
import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="main-contact">
      <BlueSidePart />
      <div className="form-comtainer">
        <h1 className="title">Contact</h1>
        {/* <FormControl> */}

        <FormLabel for="name" className="label" component="legend" required>
          NAME
        </FormLabel>
        <TextField
          id="name"
          fullWidth
          required
          placeholder="Your Name"
          variant="outlined"
          margin="normal"
          className="text-field"
          size="small"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <FormLabel for="email" className="label" component="legend" required>
          EMAIL
        </FormLabel>
        <TextField
          fullWidth
          id="email"
          required
          placeholder="Email Address"
          variant="outlined"
          margin="normal"
          className="text-field"
          size="small"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <FormLabel for="message" className="label" component="legend" required>
          DESCRIPTION
        </FormLabel>
        <TextField
          fullWidth
          id="message"
          required
          placeholder="お問い合わせ内容を記入下さい。"
          variant="outlined"
          margin="normal"
          multiline
          rows={7}
          className="text-field"
          size="small"
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button
          variant="contained"
          className="submit-btn"
          type="submit"
          onSubmit={(e) => onSubmit(e)}
        >
          SUBMIT
        </Button>
        {/* </FormControl> */}
      </div>
    </div>
  );
};

export default ContactForm;
