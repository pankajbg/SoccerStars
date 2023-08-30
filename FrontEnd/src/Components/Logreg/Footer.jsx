import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaFacebook,
} from "react-icons/fa";
import "./Footer.css"; // Import your custom CSS for the footer
const logostyle = {
  color: "rgb(65 175 40)",
  size: "20px",
};
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div>
              <Navbar.Brand className="fs-1">
                <span style={logostyle}>
                  <i>
                    <b>Soccer</b>
                  </i>
                </span>
                <lable className="fw-bold">Stars</lable>
              </Navbar.Brand>
            </div>
            <div className="lh-1">
              <h2 className="ms mt-3 lh-1">Contact Us</h2>
              <p className="lh-1">
                <FaEnvelope /> Soccer Stars
              </p>
              <p className="lh-1">
                <FaPhone /> +1234567890
              </p>
            </div>
          </div>

          <div className="col-md-4 mt-5 ">
            <h2>Address</h2>
            <p className="lh-1">123 Main Street</p>
            <p className="lh-1">City, Country</p>
          </div>
          <div className="col-md-4  mt-5">
            <h2>Our Social Media handels are </h2>
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
