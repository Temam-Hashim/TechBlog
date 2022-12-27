import React from 'react';
import './Contact.css'
import Header from '../../components/header/Header'


const Contact = ()=>{
  return (
    <React.Fragment>
      <Header/>
        <div className="contact">
            <div className='row'>
               <div className='meetUs col-md-4'>
                  {/* address*/}
                  <h1 className='title'>MEET US</h1>
                    <ul className='addresses'>
                      <li className="addressLists"><i className='fa fa-phone meetIcon'/> <b>+251 923 79 92 32</b></li>
                      <li className="addressLists"><i className='fa fa-envelope meetIcon'/> <b>ourgroupemail2018@gmail.com</b></li>
                      <li className="addressLists"><i className='fa fa-globe meetIcon'/> <b>Ethiopia</b></li>
                      <li className="addressLists"><i className='fa fa-address-book meetIcon'/> <b>Addis Ababa, Ethiopia</b></li>
                    </ul>
                </div>
                <div className='contactUs col-md-8'>
                  {/* contact form */}
                  <h1 className='title'>Contact Us</h1>
                    <form className='contactForm'>
                      <div className="form-group m-3">
                        <input type="text" className='form-control inputs' id='username' placeholder='Enter Your Name'/>
                      </div>
                       <div className="form-group m-3">
                        <input type="email" className='form-control inputs' id='email' placeholder='Enter Your Email'/>
                      </div>
                       <div className="form-group m-3">
                        <input type="text" className='form-control inputs' id='subject' placeholder='Enter Your Subject'/>
                      </div>
                       <div className="form-group m-3">
                        <textarea className='form-control' rows='4' id='message' placeholder='Enter Your Message'></textarea>
                      </div>
                       <div className="form-group float-end">
                        <button className='btn btn-info btn-lg submit'>SUBMIT</button>
                      </div>
                  </form>
                </div>
             
            </div>
        </div>
    </React.Fragment>
  )
  }
export default Contact