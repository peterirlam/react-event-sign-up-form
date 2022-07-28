import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API_URL = `http://www.mocky.io/v2/5d00cfff3200007d00f9d809`;
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [family, setFamily] = useState("");
  const [familyErr, setFamilyErr] = useState("");
  const [date, setDate] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [attendees, setAttendees] = useState(0);
  const [attendeesErr, setAttendeesErr] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [phone, setPhone] = useState("");
  const [needWheelchair, setNeedWheelchair] = useState(false);
  const [total, setTotal] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const notAvailable = ["2022-10-07", "2022-11-20", "2022-12-01"];

  /* COMPARISON USING NAME ATTR FOR EACH ELEMENT:

  const [inputs, setInputs] = useState({}) 
  
   const handleChange = (e) => {
    let nam = e.target.name;
    let val = e.target.value;
    setInputs(prevState => ({ ...prevState, [nam]: val }));
  };

  <input
    type="text"
    name="username" 
    value={inputs.username || ""} 
    onChange={handleChange} /> */

  useEffect(() => {
    document.getElementById("txt-name").focus();
  }, []); /* adds focus to first input field: first name */

  /* COMPARISON USING USEREF HOOK to add focus to input field
  
  import React, { useRef } from 'react';
  const inputRef = useRef();
  <input type='text' placeholder='e.g. Brian' ref={inputRef} />

  useEffect(() => {
    inputRef.current.focus();
  }) */

  const getUnitPrice = (attendees) => {
    if (attendees <= 3) return 50;
    if (attendees >= 4 && attendees <= 6) return 40;
    if (attendees > 6) return 35;
  };

  useEffect(() => {
    let unitPrice = getUnitPrice(attendees);
    let t = parseInt(attendees) * unitPrice;
    setTotal(parseFloat(t).toFixed(2));
  }, [attendees]);

  const handleDateChange = (e) => {
    /* checks if date available */
    let val = e.target.value;
    if (notAvailable.indexOf(val) >= 0) {
      setIsInvalidDate(true);
    } else setIsInvalidDate(false);
    setDate(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameErr("Please enter you first name");
    } else {
      setNameErr("");
    }
    if (family === "") {
      setFamilyErr("Please enter you last name");
    } else {
      setFamilyErr("");
    }
    if(date === "") {
      setDateErr("Please enter a date")
    } else {
      setDateErr("");
    }
    if (attendees === 0) {
      setAttendeesErr("Please enter number of attendees");
    } else {
      setAttendeesErr(0);
    }
    if (email.includes("@")) {
      setEmailErr("");
    } else {
      setEmailErr("Please enter a valid email address");
    }

    const data = {
      name,
      family,
      date,
      attendees,
      company,
      email,
      phone,
      needWheelchair,
      total,
    };

    axios.post(API_URL, data).then((response) => {
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
      }
    });
  };

  return (
    <div className='container'>
      <h3 className='heading mt-100'>Event Registration</h3>
      <p className='register'>Register now while seats are available!</p>
      <p className='text red'>Early Bird Offer</p>
      <p className='mt-10'>
        Discounts are available for groups. The bigger the group, the bigger the
        discount! Prices are as follows:
      </p>
      <p className='mt-30'>Price per attendee</p>
      <div className='prices'>
        <p>1 - 3</p>
        <p>£50</p>
      </div>
      <div className='prices'>
        <p>4 - 6</p>
        <p>£40</p>
      </div>
      <div className='prices'>
        <p>6+</p>
        <p>£35</p>
      </div>

      <form className='form' onSubmit={handleSubmit}>
        <div className='input-container'>
          <label className='form-label'>
            FIRST NAME<small>{nameErr}</small>
          </label>
          <input
            type='text'
            className='form-control effect'
            id='txt-name' /* used to add focus to first input field */
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className='focus-border' />
        </div>
        <div className='input-container'>
          <label className='form-label'>
            LAST NAME <small>{familyErr}</small>
          </label>
          <input
            type='text'
            className='form-control effect'
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          />
          <span className='focus-border' />
        </div>
        <div className='input-container'>
          <label className='form-label'>
            CHOOSE YOUR DAY<small>{dateErr}</small>
          </label>
          <input
            type='date'
            className='form-control'
            value={date}
            min='2022-07-01'
            max='2022-12-31'
            onChange={handleDateChange}
          />
          <div className='error-message'>
            {isInvalidDate &&
              "Sorry, but the date you have selected is unavailable. Please select another."}
          </div>
        </div>
        <div className='input-container'>
          <label className='form-label'>
            NUMBER OF ATTENDEES<small>{attendeesErr}</small>
          </label>
          <input
            type='number'
            className='form-control effect'
            min={1}
            step={1}
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
          />
          <span className='focus-border' />
        </div>
        <div className='input-container'>
          <div className='row'>
            <label className='form-label'>
              COMPANY NAME
              <span className='form-label optional'>OPTIONAL</span>
            </label>
          </div>
          <input
            type='text'
            className='form-control effect'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <span className='focus-border' />
        </div>
        <div className='input-container'>
          <label className='form-label'>
            EMAIL<small>{emailErr}</small>
          </label>
          <input
            type='email'
            className='form-control effect'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className='focus-border' />
          {/* <span className='arrow'>&#x2039;</span> */}
        </div>
        <div className='input-container'>
          <label className='form-label'>
            TELEPHONE
            <span className='form-label optional'>OPTIONAL</span>
          </label>
          <input
            type='text'
            className='form-control effect'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <span className='focus-border' />
        </div>
        <div className='input-container flex-row'>
          <input
            type='checkbox'
            className='form-check-input'
            checked={needWheelchair}
            onChange={(e) => setNeedWheelchair(e.target.checked)}
          />
          <label
            className='form-label'
            htmlFor='check1'
            style={{ marginTop: 5 }}
          >
            Do you need wheelchair access?
          </label>
        </div>
        <div className='mt-100'>
          <hr className='hr' />
        </div>
        <div className='mt-20'>
          <label className='form-label'>
            Attendees
            <span className='form-label'>{attendees}</span>
          </label>
        </div>
        <div className='input-container'>
          <label className='form-label price'>£{total}</label>
        </div>
        <div className='input-container'>
          <button
            type='submit'
            className='btn-red w-100'
            onClick={handleSubmit}
          >
            BUY
          </button>
        </div>
        {name && family && date && attendees && email && successMessage && (
          <div className='mt-30 success-message'>{successMessage}</div>
        )}
        <div className='mt-100'></div>
      </form>
    </div>
  );
}

export default App;
