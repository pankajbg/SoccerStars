import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import imageRahul from "./images/Rahul.jpeg";
import imagePankaj from "./images/Pankaj.jpeg";
import imageAbhijeet from "./images/Abhijeet.jpeg";
import imageNilesh from "./images/Nilesh.jpeg";
import imageGaurav from "./images/Gaurav.jpeg";
import imageSayali from "./images/Sayali.jpeg";

import "../Assets/AboutUs.css";
import { FaEnvelope, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import Footer from "./Footer";
import Navbar from "../Components/Navbar/Navbar";

function AboutUs() {
  return (
    <React.Fragment>
      <Navbar />
      <section className="about-section mt-5">
        <div className="container-about">
          <h1>About Us</h1>
          <p className="lead">
            We are here to revolutionize the way players are trained and
            assessed. Our Online Football Club Management System offers a
            comprehensive, efficient, and modern approach to online Trainings.
          </p>
        </div>
      </section>
      <section className="features-section">
        <div className="container-about">
          <h2 className="section-title text-white">Our Features</h2>
          <div className="row justify-content-center">
            <div className="col-md-5 feature">
              <h3>User Authentication and Authorization</h3>
              <p>Secure logins with role-based access for authorized users.</p>
            </div>
            <div className="col-md-5 feature">
              <h3>Real-time Ground Booking and Training</h3>
              <p>
                Players can book grounds remotely with facility of Personel
                Training as well as Grounds
              </p>
            </div>
            <div className="col-md-5 feature">
              <h3>User-friendly Interface</h3>
              <p>Intuitive design for an enhanced user experience.</p>
            </div>
            <div className="col-md-5 feature">
              <h3>Player Bookings</h3>
              <p>
                Instant Slot bookings for Grounds,Exclusive selection of Coach
                with Personal Training.
              </p>
            </div>
            {/* Add more features here */}
          </div>
        </div>
      </section>

      <div className="container-about ">
        <h2 style={{ textAlign: "center" }}>Our Team</h2>
        <div className="row justify-content-between">
          {/* Team members */}
          <div className="col-md-4">
            <div className="card-about">
              <img
                src={imageRahul}
                className="card-img-top rounded-circle border ali"
                alt="Card"
                style={{ width: "200px", height: "200px", margin: "auto" }}
              />
              <div className="container-about">
                <h2>Rahul Manker</h2>
                <p className="title-about">Backend Developer</p>
                <p>
                  <FaEnvelope /> rahul123@gmail.com
                </p>

                <div className="social-icons">
                  <a href="https://instagram.com/jai_tembhare?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D">
                    <FaInstagram />
                  </a>
                  <a href="https://www.linkedin.com/in/jai-tembhare-1b4665204">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-about">
              <img
                src={imagePankaj}
                className="card-img-top rounded-circle border "
                alt="Card"
                style={{ width: "200px", height: "200px", margin: "auto" }}
              />
              <div className="container-about">
                <h2>Pankaj Bhagat</h2>
                <p className="title-about">Frontend Developer</p>
                <p>
                  <FaEnvelope /> pankajbhagat8888@gmail.com
                </p>

                <div className="social-icons">
                  <a href=" https://www.instagram.com/r_u_c_h19/?next=%2F">
                    <FaInstagram />
                  </a>
                  <a href="https://www.linkedin.com/in/ruchika-gaidhani-670972199/">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-about">
              <img
                src={imageAbhijeet}
                className="card-img-top rounded-circle border"
                alt="Card"
                style={{ width: "200px", height: "200px", margin: "auto" }}
              />
              <div className="container-about">
                <h2> Abhijeet Jawale</h2>
                <p className="title-about">Backend Developer</p>
                <p>
                  <FaEnvelope /> abhijeet123@gmail.com
                </p>

                <div className="social-icons">
                  <a href="https://www.instagram.com/tejaskolambe/">
                    <FaInstagram />
                  </a>
                  <a href="www.linkedin.com/in/tejas-kolambe-2a0310209">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-about">
          <h2 style={{ textAlign: "center" }}></h2>
          <div className="row justify-content-between">
            {/* Team members */}
            <div className="col-md-4">
              <div className="card-about">
                <img
                  src={imageNilesh}
                  className="card-img-top rounded-circle border"
                  alt="Card-about"
                  style={{ width: "200px", height: "200px", margin: "auto" }}
                />
                <div className="container-about">
                  <h2>Nilesh Bhamare</h2>
                  <p className="title-about">Frontend Developer</p>
                  <p>
                    <FaEnvelope /> nilesh123@gmail.com
                  </p>

                  <div className="social-icons">
                    <a href="https://www.instagram.com/mudassirraza1286/">
                      <FaInstagram />
                    </a>
                    <a href="http://www.linkedin.com/in/mudassir-raza-14bb15289">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-about">
                <img
                  src={imageGaurav}
                  className="card-img-top rounded-circle border"
                  alt="Card"
                  style={{ width: "200px", height: "200px", margin: "auto" }}
                />
                <div className="container-about">
                  <h2>Gaurav Pal</h2>
                  <p className="title-about">Backend Developer</p>
                  <p>
                    <FaEnvelope /> gaurav.org114@gmail.com
                  </p>

                  <div className="social-icons">
                    <a href="#">
                      <FaInstagram />
                    </a>
                    <a href="#">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-about">
                <img
                  src={imageSayali}
                  className="card-img-top rounded-circle border"
                  alt="Card"
                  style={{ width: "200px", height: "200px", margin: "auto" }}
                />
                <div className="container-about">
                  <h2>Sayali Chavan</h2>
                  <p className="title-about">Backend Developer</p>
                  <p>
                    <FaEnvelope /> sayali123@gmail.com
                  </p>

                  <div className="social-icons">
                    <a href="#">
                      <FaInstagram />
                    </a>
                    <a href="#">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}
export default AboutUs;
