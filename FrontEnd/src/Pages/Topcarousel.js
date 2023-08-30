import React from "react";
import Carousel from "react-bootstrap/Carousel";
import hero1 from "./hero1.jpeg";
import hero2 from "./hero2.jpeg";
import hero3 from "./hero3.jpg";
import "./style.css";

function Topcarousel() {
  return (
    <div className="carousel-container"> {/* Adding the bordered container */}
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100 h-50" src={hero1} alt="First slide" />
          <Carousel.Caption>
            <h2 className="text-success">
              {/* Content for the caption */}
              <br />
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={hero2} alt="Second slide" />
          <Carousel.Caption>
            <h2 className="text-success">
              {/* Content for the caption */}
              <br />
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={hero3} alt="Third slide" />
          <Carousel.Caption>
            <h2 className="text-success">
              {/* Content for the caption */}
              <br />
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Topcarousel;
