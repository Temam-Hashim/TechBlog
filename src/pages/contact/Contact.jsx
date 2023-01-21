import React from "react";
import "./Contact.css";
import Header from "../../components/header/Header";
import { useState } from "react";

import axios from "axios";

const Contact = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const to = "ourgroupemail2018@gmail.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body =
      "<h3><b> From " +
      username +
      ",</b></h3>" +
      "<hr/>" +
      "<p>" +
      message +
      "</p> <p style='color:red;margin-top:230px;padding:10px;font-style:italic;border-top:1px solid;'>Disclaimer :<br/>Please do not replay to this email this is system generated email<hr/></p>";

    const mailOption = {
      from: email,
      to: to,
      subject: subject,
      message: body,
    };

    // SEND EMAIL USING NODEMAILER
    try {
      const res = await axios.post("/mail/", mailOption);
      if (res.data) {
        setError("Email Successfully Sent!");
      } else {
        setError("Failed to send email, please try again!");
      }
    } catch (error) {
      console.log(error);
    }
    // SEND EMAIL USING SMTPJS
    // const body = `<b>From ${username},</b><br><br><hr> <i>${message}</i><br>`;
    // if (window.Email) {
    //   window.Email.send({
    //     SecureToken: "e5c8d044-fa82-48b1-b629-11148ba38727",
    //     To: "ourgroupemail2018@gmail.com",
    //     From: email,
    //     Subject: subject,
    //     Body: body,
    //   }).then(
    //     (message) => console.log(message),
    //     setError("Email Sent Successfully")
    //   );
    // } else {
    //   setError("Failed to send Email form this server!!!");
    // }
  };
  return (
    <React.Fragment>
      <Header />
      <div className="contact">
        <div className="row">
          <div className="meetUs col-md-4">
            {/* address*/}
            <h1 className="title">MEET US</h1>
            <ul className="addresses">
              <li className="addressLists">
                <i className="fa fa-phone meetIcon" /> <b>+251 923 79 92 32</b>
              </li>
              <li className="addressLists">
                <i className="fa fa-envelope meetIcon" />{" "}
                <b>ourgroupemail2018@gmail.com</b>
              </li>
              <li className="addressLists">
                <i className="fa fa-globe meetIcon" /> <b>Ethiopia</b>
              </li>
              <li className="addressLists">
                <i className="fa fa-address-book meetIcon" />{" "}
                <b>Addis Ababa, Ethiopia</b>
              </li>
            </ul>
          </div>
          <div className="contactUs col-md-8">
            {/* contact form */}
            <h1 className="title">Contact Us</h1>
            {error && (
              <div className="alert alert-info text-center">{error}</div>
            )}
            <form className="contactForm" onSubmit={handleSubmit}>
              <div className="form-group m-3">
                <input
                  type="text"
                  className="form-control inputs"
                  id="username"
                  placeholder="Enter Your Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group m-3">
                <input
                  type="email"
                  className="form-control inputs"
                  id="email"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group m-3">
                <input
                  type="text"
                  className="form-control inputs"
                  id="subject"
                  placeholder="Enter Your Subject"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="form-group m-3">
                <textarea
                  className="form-control"
                  rows="4"
                  id="message"
                  placeholder="Enter Your Message"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group float-end">
                <button className="btn btn-info btn-lg submit">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Contact;
