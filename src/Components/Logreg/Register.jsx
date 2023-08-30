import React, { useState, useEffect } from "react";
import "./login.css";
import emailjs from "@emailjs/browser";
import "../../Assets/Common.css";
import Navbaronlyhome from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Footer from "../../Pages/Footer";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [drole, setDrole] = useState("PLAYER");
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    conpass: "",
    username: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    emailjs.init("kC9cKItjxUOwLVWRf");
  }, []);

  const sendMail = (user) => {
    const serviceId = "service_y36buhw";
    const templateId = "template_ctakd8d";

    try {
      console.log(user.name + " " + user.email);
       emailjs.send(serviceId, templateId, {
       name: user.name,
       email: user.email,
       password: user.password,
       role: user.roles,
       });
       toast("Password sent to your gmail !!!");
    } catch (error) {
      console.log(error);
    }
  };

  const trytoregister = async () => {
    // event.preventDefault();

    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const hasUppercase = /[A-Z]+/;
    const hasLowercase = /[a-z]+/;
    const hasNumber = /[0-9]+/;


    if (formdata.username === "") {
      toast.error("🚫 Please enter a username", {
        position: "top-right",
        });
      return;
    } else if (formdata.username.length < 5) {
      toast.error("🚫 Username should be at least 3 characters", {
        position: "top-right",
      });
      return;
    } else if (formdata.username.split(" ").length > 3) {
      toast.error("🚫 Username should not have more than 5 words", {
        position: "top-right",
      });
      return;
    } else if (!/^[a-zA-Z0-9]+$/.test(formdata.username)) {
      toast.error("🚫 Username should only contain letters and numbers", {
        position: "top-right",
      });
      return;
    }

    
    if (formdata.password !== formdata.conpass) {
      //console.log("passwoed not match");
      toast.error("🚫 password not match", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    } else if (formdata.password === "") {
      toast.error("🚫 password too small", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }else if (formdata.password.length < 8) {
      toast.error("🚫 Password should be at least 8 characters", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    if (!hasSpecialChar.test(formdata.password)) {
      toast.error("🚫 Password should contain at least one special character", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    } else if (!hasUppercase.test(formdata.password)) {
      toast.error("🚫 Password should contain at least one uppercase letter", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    } else if (!hasLowercase.test(formdata.password)) {
      toast.error("🚫 Password should contain at least one lowercase letter", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    } else if (!hasNumber.test(formdata.password)) {
      toast.error("🚫 Password should contain at least one number", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    


    if (formdata.email === "") {
      toast.error("🚫 username too small", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    } else {
      var validEmail = formdata.email.match(
        /^[a-zA-Z]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (!validEmail) {
        toast.error("🚫 enter valid email id", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
    }
    //var parts = formdata.username.match(/.{1,15}/g);
    //var new_username = parts.join(" ");

    let user = {
      name: formdata.username,
      email: formdata.email,
      password: formdata.password,
      roles: drole,
    };


  
    //console.log(user);
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/user/add", user)
      .then(
        async (response) => {
          //console.log(response.data);
          if (response.data == 1) {
            toast.success("Success !!! You Can Login now", {
              position: "top-right",
              autoClose: 2000,
            });

            sendMail(user);

            // navigate("/login");
          } else if (response.data == -1) {
            toast.error("Email already present! try login", {
              position: "top-right",
              autoClose: 2000,
            });
          }
        },
        (error) => {}
      );

    //console.log(user);
  };

  const update = (event) => {
    let val = event.target.value;
    let name = event.target.name;
    setFormdata((prev) => {
      if (name === "email") {
        return {
          email: val,
          password: prev.password,
          conpass: prev.conpass,
          username: prev.username,
        };
      } else if (name === "password") {
        return {
          email: prev.email,
          password: val,
          conpass: prev.conpass,
          username: prev.username,
        };
      } else if (name === "conpass") {
        return {
          email: prev.email,
          password: prev.password,
          conpass: val,
          username: prev.username,
        };
      } else {
        return {
          email: prev.email,
          password: prev.password,
          conpass: prev.conpass,
          username: val,
        };
      }
    });
   
  };
  

  return (
    <>
      <div class="login_css">
        <ToastContainer />
        <Navbaronlyhome />
        <div>
          <div class="container-fluid">
            <div class="row login_page_outside">
              {/*<div className="col-xl-1 col-lg-2 col-md-3 col-sm-0 left_block">
                            <Sidebar/>
    </div>*/}
              <div class="col-xl-12 col-lg-10 px-lg-5 px-0 col-sm-12 main_login_window py-5">
                <div class="login_inside p-5">
                  {/*<div class="welcome_back h3 text-center">
                                    welcome back <br/><br/> <i class="fa-solid fa-face-smile-beam fa-2x"></i>
    </div>*/}
                  <div class="login_to_your_acc h1 text-center">
                    Register Here
                    <h6>you are registering as a {drole}</h6>
                  </div>

                  <div class="p-large mt-3">
                    {/*Enter Username*/}
                    <div class="px-3 py-2 mt-3 input">
                      <div class="row">
                        <div class="col-lg-2 col-2">
                          <i
                            class="fa fa-user-circle-o fa-2x"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div class="col-lg-10 col-10">
                          <input
                            onChange={update}
                            class="w-100 p-3"
                            name="username"
                            type="text"
                            placeholder="username"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="p-large">
                    {/*Enter Email Adress*/}
                    <div class="px-3  mt-3 input">
                      <div class="row">
                        <div class="col-lg-2 col-2">
                          <i class="fa-solid fa-at fa-2x"></i>
                        </div>
                        <div class="col-lg-10 col-10">
                          <input
                            onChange={update}
                            class="w-100 p-3"
                            name="email"
                            type="email"
                            placeholder="emailId"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="p-large mt-3">
                    {/*Enter password*/}
                    <div class="px-3 py-2 mt-3 input">
                      <div class="row">
                        <div class="col-lg-2 col-2">
                          <i class="fa-solid fa-lock fa-2x"></i>
                        </div>
                        <div class="col-lg-10 col-10">
                          <input
                            onChange={update}
                            class="w-100 p-3"
                            name="password"
                            type="password"
                            placeholder="password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="p-large mt-3">
                    {/*Enter password*/}
                    <div class="px-3 py-2 mt-3 input">
                      <div class="row">
                        <div class="col-lg-2 col-2">
                          <i class="fa-solid fa-lock-open fa-2x"></i>
                        </div>
                        <div class="col-lg-10 col-10">
                          <input
                            onChange={update}
                            class="w-100 p-3"
                            name="conpass"
                            type="password"
                            placeholder="confirm your password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*<div class="p-large mt-3 forgot_password make_it_pointer px-3">
                                    Forgot password<i class="fa-regular fa-circle-question px-2"></i>
</div>*/}

                  <div
                    class="h2 text-center mt-3 make_it_pointer login_button p-3 cursor_pointer"
                    onClick={trytoregister}
                  >
                    REGISTER {/*<i class="fa-solid fa-fingerprint"></i>*/}
                  </div>

                  {drole === "PLAYER" && (
                    <div
                      class="p-small register_here text-center cursor_pointer_1"
                      onClick={() => setDrole("COACH")}
                    >
                      <h6>Register as a coach</h6>
                    </div>
                  )}
                  {drole === "COACH" && (
                    <div
                      class="p-small register_here text-center cursor_pointer_1"
                      onClick={() => setDrole("PLAYER")}
                    >
                      <h6>Register as a palyer</h6>
                    </div>
                  )}

                  <div class="p-small register_here text-center">
                    <a
                      href="/login"
                      class="cursor_pointer"
                      style={{ color: "#3c4852" }}
                    >
                      Already have an account{" "}
                      <span class="underline_it">Login here</span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div classname="footer">
        <Footer />
      </div>
    </>
  );
};

export default Register;
