import { React, useState } from "react";
import "../../Assets/Common.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-query";
import axios from "axios";

const Singletrainingview = ({ handleButtonClick }) => {
  return (
    <Outersectionsingletrainingview>
      <div className="bg-training p-3 ">
        <h2>ground name goes here</h2>
        <h6>ground dimensions goes here</h6>
        <h6>date and timing goes here</h6>
        <h6>price goes here</h6>
        <div onClick={() => handleButtonClick()} className="cursor_pointer">
          <h3 className="w-100 book-now-coach text-center">Book now</h3>
        </div>
      </div>
    </Outersectionsingletrainingview>
  );
};
const Singlecoachview = ({ handlecoachbooking }) => {
  return (
    <Outersectionsinglecoachview>
      <div className="bg-coach p-3 ">
        <h2>coach name goes here</h2>
        <h6>how many years of exp..</h6>
        <h6>$200 per hour</h6>
        <div className="d-flex flex-row">
          <div>s1</div> <div>s2</div> <div>s3</div> <div>s4</div>
        </div>
        <div onClick={() => handlecoachbooking()} className="cursor_pointer">
          <h3 className="w-100 book-now-coach text-center">
            Request for the coach
          </h3>
        </div>
      </div>
    </Outersectionsinglecoachview>
  );
};

const Showbookingdateandtime = ({ booking }) => {
  if (booking.bookingdate === "none" && booking.bookingtime === "none") {
    return <></>;
  } else if (booking.bookingdate != "none" && booking.bookingtime != "none") {
    return (
      <>
        <h6>
          The current booking date is{" "}
          <span style={{ color: "#34bbcc" }}>{booking.bookingdate}</span> and
          time is
          <span style={{ color: "#34bbcc" }} className="px-2">
            {booking.bookingtime}
          </span>{" "}
        </h6>
      </>
    );
  }
};

const getallgroundsfunc = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/user/all`
  );
  return response.data;
};
const getallcoachesfunc = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/user/all`
  );
  return response.data;
};

function Userview({ user, updateUser }) {
  const [visiblegroundbooking, setVisiblegroundbooking] = useState(false); // groundbooking overlay show or not
  const [personalcoachbooking, setPersonalcoachbooking] = useState(false); // personal coach booking overlay show or not
  const [clubid, setClubid] = useState(-1);
  const [selectedDivIndex, setSelectedDivIndex] = useState(-1);
  const [booking, setBooking] = useState({
    bookingdate: "none",
    bookingtime: "none",
  });

  //join the club player
  const joinclub = () => {
    axios.post(process.env.REACT_APP_BACKEND_URL + "player/joinclub/" + clubid, { params: { pid: user.email } }).then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log("some error");
      }
    );
  };

  const {
    data: allgrounds,
    isLoading: allgroundsloading,
    refetch: refetchallplayers,
  } = useQuery("get_all_grounds", () => getallgroundsfunc(), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });

  const {
    data: allcoaches,
    isLoading: allcoachesloading,
    refetch: refetchallcoaches,
  } = useQuery("get_all_coaches", () => getallcoachesfunc(), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });

  const time_slot_for_a_ground = ["Div 1", "Div 2", "Div 3", "Div 4"];

  // common for coach booking and traing season booking...
  function handleButtonClick() {
    window.scrollTo(0, 0);
    setVisiblegroundbooking(!visiblegroundbooking);
  }

  function handlebookingdate(event) {
    setBooking({ ...booking, bookingdate: event.target.value });
  }
  const handlebookingtime = (val, index) => {
    setBooking({ ...booking, bookingtime: val });
    setSelectedDivIndex(index);
  };

  // onclick on `book coach` show a tost and raise a request for admin
  const handlecoachbooking = () => {
    setPersonalcoachbooking(true);
    /*consoletoast.success("your request has been sent to a admin", {
      position: "top-right",
      autoClose: 2000,
    });*/
  };
  const cancealcoachbooking = () => {
    setPersonalcoachbooking(false);
  };

  if (allgroundsloading) {
    return "loading";
  }
  return (
    <>
      <ToastContainer />
      <Outersectionuserview>
        <Navbar user={user} />
        {!user.isregisteredforclub && (
          <Registerforaclub className="container my-5">
            <h1>Register for a club forst to get all the ebnifits</h1>
            <input
              type="text"
              placeholder="enter the club name to register for it"
              className="px-3"
              onChange={(event) => {
                setClubid(event.target.value);
                console.log(clubid);
              }}
            />
            <input
              type="submit"
              value="register"
              className="btn btn-primary mx-5"
              onClick={() => joinclub()}
            />
            <p style={{ color: "red" }} className="p-small">
              *please do not share this code with others. for more price realted
              details contact the clubs
            </p>
          </Registerforaclub>
        )}
        {visiblegroundbooking && (
          <div className="overlay">
            <div className="bookoutside p-3">
              <div className="row">
                <div className="col-lg-6">
                  <h5>Ground details</h5>
                  <Outersectionsingletrainingview className="mb-5">
                    <div className="bg-training p-3 ">
                      <h2>ground name goes here</h2>
                      <h6>ground dimensions goes here</h6>
                    </div>
                  </Outersectionsingletrainingview>

                  <h5>Coach details</h5>
                  <Outersectionsinglecoachview>
                    <div className="bg-coach p-3 ">
                      <h2>coach name goes here</h2>
                      <h6>how many years of exp..</h6>
                      <div className="d-flex flex-row">
                        <div>s1</div> <div>s2</div> <div>s3</div> <div>s4</div>
                      </div>
                    </div>
                  </Outersectionsinglecoachview>
                </div>
                <div className="col-lg-6">
                  <h2>choose a date and time</h2>
                  <input type="date" onChange={handlebookingdate} />
                  <div className="row my-3">
                    {time_slot_for_a_ground.map((single_time_slot, index) => (
                      <div className="col-lg-6">
                        <div
                          className="singletimeslot h6 cursor_pointer px-3"
                          onClick={() =>
                            handlebookingtime("08.00-10.00", index)
                          }
                          style={{
                            backgroundColor:
                              selectedDivIndex === index ? "red" : "#38bacf",
                          }}
                        >
                          08.00-10.00
                        </div>
                      </div>
                    ))}
                  </div>

                  <Showbookingdateandtime booking={booking} />
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="h5 text-white book_now text-center p-2 cursor_pointer">
                        Book now
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        className="h5 canceal_now text-center p-2 cursor_pointer"
                        onClick={() => {
                          setBooking({
                            bookingdate: "none",
                            bookingtime: "none",
                          });
                          setSelectedDivIndex(-1);
                          setVisiblegroundbooking(false);
                        }}
                      >
                        canceal now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {personalcoachbooking && (
          <div className="overlay">
            <div className="bookoutside p-3">
              <div className="row">
                <div className="col-lg-6">
                  <h5>Ground details</h5>
                  <Outersectionsingletrainingview className="mb-5">
                    <div className="bg-training p-3 ">
                      <h2>ground name goes here</h2>
                      <h6>ground dimensions goes here</h6>
                    </div>
                  </Outersectionsingletrainingview>

                  <h5>Coach details</h5>
                  <Outersectionsinglecoachview>
                    <div className="bg-coach p-3 ">
                      <h2>coach name goes here</h2>
                      <h6>how many years of exp..</h6>
                      <div className="d-flex flex-row">
                        <div>s1</div> <div>s2</div> <div>s3</div> <div>s4</div>
                      </div>
                    </div>
                  </Outersectionsinglecoachview>
                </div>
                <div className="col-lg-6">
                  <h2 className="">choose a date and time</h2>

                  <div className="d-flex flex-row justify-content-between">
                    <div>
                      <h5>start date</h5>
                      <input type="date" onChange={handlebookingdate} />
                    </div>
                    <div>
                      <h5>end date</h5>
                      <input type="date" onChange={handlebookingdate} />
                    </div>
                  </div>

                  <div className="row my-3">
                    {time_slot_for_a_ground.map((single_time_slot, index) => (
                      <div className="col-lg-6">
                        <div
                          className="singletimeslot h6 cursor_pointer px-3"
                          onClick={() =>
                            handlebookingtime("08.00-10.00", index)
                          }
                          style={{
                            backgroundColor:
                              selectedDivIndex === index ? "red" : "#38bacf",
                          }}
                        >
                          08.00-10.00
                        </div>
                      </div>
                    ))}
                  </div>

                  <Showbookingdateandtime booking={booking} />
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="h5 text-white book_now text-center p-2 cursor_pointer">
                        Book now
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        className="h5 canceal_now text-center p-2 cursor_pointer"
                        onClick={() => {
                          setBooking({
                            bookingdate: "none",
                            bookingtime: "none",
                          });
                          setSelectedDivIndex(-1);
                          cancealcoachbooking();
                        }}
                      >
                        canceal now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!personalcoachbooking &&
          !visiblegroundbooking &&
          user.isregisteredforclub && (
            <div className="container">
              <h1 className="mt-5">book a coach for personal training</h1>
              <div className="row">
                <div className="col-lg-4 my-2">
                  <Singlecoachview handlecoachbooking={handlecoachbooking} />
                </div>
                <div className="col-lg-4 my-2">
                  <Singlecoachview handlecoachbooking={handlecoachbooking} />
                </div>
                <div className="col-lg-4 my-2">
                  <Singlecoachview handlecoachbooking={handlecoachbooking} />
                </div>
                <div className="col-lg-4 my-2">
                  <Singlecoachview handlecoachbooking={handlecoachbooking} />
                </div>
              </div>

              <h1 className="mt-5">Book a ground for personal traing</h1>
              <div className="row">
                <div className="col-lg-4 my-2 singletrain">
                  <Singletrainingview handleButtonClick={handleButtonClick} />
                </div>
                <div className="col-lg-4 my-2">
                  <Singletrainingview handleButtonClick={handleButtonClick} />
                </div>
                <div className="col-lg-4 my-2">
                  <Singletrainingview handleButtonClick={handleButtonClick} />
                </div>
                <div className="col-lg-4 my-2">
                  <Singletrainingview handleButtonClick={handleButtonClick} />
                </div>
              </div>

              {/*<h1 className="mt-5">
              Register for a club for feel proud about it.
            </h1>
            <Registerforaclub>
              <input
                type="text"
                placeholder="enter the club it to register for it"
                className="px-3"
              />
              <input
                type="submit"
                value="register"
                className="btn btn-primary mx-5"
              />
              <p style={{ color: "red" }} className="p-small">
                *please do not share this code with others. for more price
                realted details contact the clubs
              </p>
        </Registerforaclub>*/}
            </div>
          )}

        <Extrapaddingforbottom></Extrapaddingforbottom>
      </Outersectionuserview>
    </>
  );
}
const Outersectionuserview = styled.div`
  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: grey;
    z-index: 1;
  }
  .canceal_now {
    border: 1px solid #38bacf;
    color: #38bacf;
    background-color: white;
  }
  .bookoutside {
    width: 50%;
    height: 50%;
    background-color: white;
  }
  input[type="date"] {
    border: 2px solid #dddcdd;
    border-radius: 5px;
  }
  .singletimeslot {
    background-color: #38bacf;
    border-radius: 5px;
    color: white;
  }
  .book_now {
    background-color: #38bacf;
    border-radius: 5px;
    color: white;
  }
`;
const Outersectionsinglecoachview = styled.div`
  .bg-coach {
    background-color: #ffcd24;
    border-radius: 20px;
  }
  .book-now-coach {
    background-color: #2aabe4;
    border-radius: 20px;
  }
`;
const Outersectionsingletrainingview = styled.div`
  .bg-training {
    background-color: #ffcd24;
    border-radius: 20px;
  }
  .book-now-coach {
    background-color: #2aabe4;
    border-radius: 20px;
  }
`;
const Registerforaclub = styled.div`
  input[type="text"] {
    border: 2px solid #2aabe4;
    height: 40px;
    border-radius: 20px;
    width: 80%;
  }
`;
const Extrapaddingforbottom = styled.div`
  height: 300px;
`;

export default Userview;
