import React, { useState } from "react";
import "./login.css";
import "../../Assets/Common.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";

const ContactUs = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/api/contact",
        formdata
      );
      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormdata({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="login_css" style={{backgroundColor:"white"}}>
      <Navbar />
      <div className="container-fluid" style={{maxWidth:"200%"}}>
        <form onSubmit={handleSubmit}>
          <div className="row login_page_outside">
            <div className="col-xl-12 col-lg-10 px-lg-5 px-0 col-sm-12 main_login_window py-5">
              <div className="login_inside p-5">
                <div className="login_to_your_acc h1 text-center p-lg-3 p-2">
                  Contact Us
                </div>

                <div className="p-large mt-3">
                  <div className="px-3 py-2 mt-3 input d-flex flex-column">
                  <div class="p-large mt-3">
                    {/*Enter Name*/}
                    <div class="px-3 py-2 mt-3 input">
                      <div class="row">
                        <div class="col-lg-2 col-2">
                          <i class="fa-solid fa-user fa-2x"></i>
                        </div>
                        <div class="col-lg-10 col-10">
                          <input
                            onChange={handleInputChange}
                            class="w-100 p-3"
                            name="name"
                            type="name"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="p-large mt-3">
                    {/*Enter Name*/}
                    <div class="px-3 py-2 mt-3 input">
                      <div class="row">
                        <div class="col-lg-2 col-2">
                          <i class="fa-solid fa-envelope-circle-check fa-2x"></i>
                        </div>
                        <div class="col-lg-10 col-10">
                          <input
                            onChange={handleInputChange}
                            class="w-100 p-3"
                            name="email"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>            
                                          
                  <div class="p-large mt-3">
                    {/*Enter Message*/}
                    <div class="px-3 py-2 mt-3 input">
                      <div class="row">
                        <div class="col-lg-2 col-2">
                          <i class="fa-lg fas fa-pencil-alt"></i>
                        </div>
                        <div class="col-lg-10 col-10">
                        <textarea
                        name="message"
                        placeholder="Message"
                        value={formdata.message}
                        onChange={handleInputChange}
                        className="p-2 rounded"
                      />
                        </div>
                      </div>
                    </div>
                  </div> 
                    <div className="h2 text-center mt-3 login_button p-3 cursor_pointer">
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
