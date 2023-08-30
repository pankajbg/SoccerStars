import React from "react";
import "../../Assets/Common.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Loginprofile = ({ user }) => {
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("pid");
    localStorage.removeItem("isregisteredforclub");
    localStorage.removeItem("clubid");
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("email");
    localStorage.removeItem("userrole");
    localStorage.removeItem("trainingbooking");
    localStorage.removeItem("coachbooking");
    navigate("/");
  };

  if (localStorage.getItem("isloggedin") === null) {
    return (
      <>
        <div class=" py-1 px-3 h6 login_border cursor_pointer ">
          <a href="/login" class="text-white ">
            Login
          </a>
        </div>
        <div class=" py-1 px-3 h6 login_border cursor_pointer mx-2">
          <a href="/register" class="text-white ">
            Signup
          </a>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div class=" py-1 px-3 h6 login_border cursor_pointer ">
          <a href="/upcomingevents" class="text-white ">
            My events
          </a>
        </div>
        <div
          class=" py-1 px-3 p-small  cursor_pointer text-white h6"
          onClick={signout}
        >
          logout{" "}
          <i
            class="fa fa-sign-out px-2"
            aria-hidden="true"
            onClick={() => signout()}
          ></i>
        </div>
      </>
    );
  }
};
function Navbar({ user }) {
  return (
    <NavbarouterSection>
      <div id="navbar" class=" outerNavbar ">
        <div class=" innerNavbar">
          <div class=" container ">
            <div class=" row py-2 ">
              <div class=" col-lg-4 ">
                <a class=" text-white" href="/">
                  <h3 class="cursor_pointer"> Soccer Stars </h3>
                </a>
              </div>

              <div class=" col-lg-8 text-white">
                <div class=" d-flex flex-row navbar_option ">
                  <a href="/" class="text-white">
                    <div class=" py-1 px-3 p-small cursor_pointer">HOME</div>
                  </a>
                  <a href="/aboutUs" class="text-white">
                    <div class=" py-1 px-3 p-small cursor_pointer">AboutUs</div>
                  </a>
                  <div class=" py-1 px-3 p-small cursor_pointer ">
                    <a href="/contactUs" class="text-white">
                      ContactUs{" "}
                    </a>
                  </div>

                  <Loginprofile user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarouterSection>
  );
}
const NavbarouterSection = styled.div`
  .outerNavbar .login_border {
    border: 3px solid white;
    border-radius: 5px;
  }

  .outerNavbar .navbar_option {
    position: relative;
    float: right;
  }

  .outerNavbar .innerNavbar {
    border-bottom: 2px solid #e6ecf2;
  }
  .outerNavbar {
    background: #4caf50; /* Green background color */
    box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
  }
`;

export default Navbar;
