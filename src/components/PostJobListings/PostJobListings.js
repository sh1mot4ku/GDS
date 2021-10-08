import React, { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './PostJobListings.scss';
import database from '../../firebase/firebase';
import { WithContext as ReactTags } from 'react-tag-input';

// APIなどから取得？
const SUGGESTIONS = [
  { id: 'React', text: 'React' },
  { id: 'Sass', text: 'Sass' },
  { id: 'TypeScript', text: 'TypeScript' }
]

const PostJobListings = () => {
  const [jobTitle, setJobTitle] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [workPlacePolicy, setWorkPlacePolicy] = useState(null);
  const [employeeLocation, setEmployeeLocation] = useState(null);
  const [employmentType, setEmploymentType] = useState(null);
  const [jobListing, setJobListing] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [annualSalaly, setAnnualSalaly] = useState(null);
  const [must, setMust] = useState(null);
  const [welcome, setWelcome] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);
  const [leaves, setLeaves] = useState(null);
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState(SUGGESTIONS);
  // いつ掲載されたかの情報も登録する

  // useEffect(() => {
  //   tags && console.log(tags);
  //   const skills = tags.map(tag => tag.text);
  //   console.log(`skills:`);
  //   console.log(skills);
  // }, [tags])

  const onSubmit = e => {
    e.preventDefault();
    const skills = tags.map(tag => tag.text);
    console.log(skills);
    const postingInfo = {
      jobTitle,
      companyName,
      workPlacePolicy,
      employeeLocation,
      employmentType,
      jobListing,
      jobDescription,
      annualSalaly,
      skills,
      must,
      welcome,
      workingHours,
      leaves,
    }
    database.ref(`/jobListings`).push(postingInfo).then(() => {
      console.log('Posted!');
    })
  }

  const handleAddition = newTag => {
    setTags([...tags, newTag])
  };
  const handleDelete = tagIndex => {
    setTags(tags.filter((_, i) => i !== tagIndex))
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form className="joblist-form" onSubmit={onSubmit}>
          <div className="input-block">
            <TextField
              label="職種"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setJobTitle(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="会社名"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setCompanyName(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="労働形態"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setWorkPlacePolicy(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="場所"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setEmployeeLocation(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="雇用形態"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setEmploymentType(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="求人内容"
              id="outlined-multiline-static"
              variant="outlined"
              multiline
              rows={5}
              onChange={e => setJobListing(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="業務内容"
              id="outlined-multiline-static"
              variant="outlined"
              multiline
              rows={5}
              onChange={e => setJobDescription(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <ReactTags
              tags={tags}
              suggestions={suggestions}
              handleAddition={handleAddition}
              handleDelete={handleDelete}
              placeholder="スキル*"
            />
          </div>
          <div className="input-block">
            <TextField
              label="年収"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setAnnualSalaly(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="年収"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setAnnualSalaly(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="必須条件"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setMust(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="歓迎条件"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setWelcome(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="勤務時間"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setWorkingHours(e.target.value)}
              className="text-field"
              required
            />
          </div>
          <div className="input-block">
            <TextField
              label="休日・休暇"
              id="outlined-basic"
              variant="outlined"
              onChange={e => setLeaves(e.target.value)}
              className="text-field"
              required
            />
          </div>
          {/* { errorMsg ? (
            <div className="error-message">{errorMsg}</div>
          ) : (

          )} */}
          <Button variant="contained" color="primary" type="submit">投稿</Button>
        </form>
      </div>
    </div>
  )
}

export default PostJobListings
