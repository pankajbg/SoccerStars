import React from "react";
import styled from "styled-components";
import Topcarousel from "./Topcarousel";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "./Footer";

function Homewithoutlogin(props) {
  return (
    <div>
      <Navbar />
      <Topcarousel />
      <Homewithoutloginout>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <h1>PLAY</h1>
                  <h1>FOOTBALL</h1>
                </div>
                <div className="d-flex flex-column">
                  <h6>
                    Kickstart Your Career In Football With Our Optimised
                    Training Batch Or A Personal Coach.
                  </h6>
                </div>
                <div className="d-flex flex-column">
                  <a href="/login">
                    <input
                      type="submit"
                      value="Login/Signup"
                      className="btn btn-success"
                    />{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img src="footbal1.gif" />
            </div>
          </div>
        </div>

      </Homewithoutloginout>

      <div classname="Footer">
        <Footer />
      </div>
    </div>
  );
}
const Homewithoutloginout = styled.div`
  background-color: White;
  img {
    width: 100%;
  }
 
`;
const Extrapaddingforbottom = styled.div`
  height: 300px;
`;

export default Homewithoutlogin;
