import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaFacebook,
} from "react-icons/fa";
import "../Pages/Footer.css"; // Import your custom CSS for the footer
const logostyle = {
  color: "rgb(68 177 49)",
  size: "40px",
};
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Container>
              <Navbar.Brand className="fs-1 ">
                <span style={logostyle}>
                  <i>
                    <b>Soccer</b>
                  </i>
                </span>
                <span style={logostyle}>
                  <i>
                    <b>S</b>
                  </i>
                </span>
                tars
              </Navbar.Brand>
            </Container>
            <div className="lh-1">
              <h2 className=" lh-1.5" style={{ marginRight: "185px" }}>
                Contact Us
              </h2>
              <p className="lh-1">
                <FaEnvelope /> SoccerStars@gmail.com
              </p>
              <p className="lh-1">
                <FaPhone /> +1234567890
              </p>
            </div>
          </div>

          <div className="col-md-4 mt-5  ">
            <h2 className="mt-3" style={{ marginRight: "225px" }}>
              Address
            </h2>
            <p className="lh-1">123 Main Street</p>
            <p className="lh-1">City, Country</p>
          </div>
          <div className="col-md-4  mt-5">
            <h2 className="mt-3">Our Social Media Handles Are </h2>
            <a className="fs-1 p-2" href="#">
              <FaInstagram />
            </a>
            <a className="fs-1 p-2" href="#">
              <FaLinkedin />
            </a>
            <a className="fs-1 p-2" href="#">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
