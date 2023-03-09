import React, { useState } from "react";
import "../Assets/Common.css";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";

import Navbar from "../Components/Navbar/Navbar";

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

const Singlecoachview = ({ coach }) => {
  const deletecoach = (pid) => {
    axios.get(process.env.REACT_APP_BACKEND_URL+ "/coach/delete/"+pid)
      .then((response) => {
        console.log(response.data)
      }, (error) => {
        console.log("some error")
       })
  }
  return (
    <>
      <Outersectionsinglecoachview>
        <div className="bg-coach p-3 ">
          <h2>{coach.user.name}</h2>
          <h6>{coach.user.email}</h6>
          <h6>$200 per hour</h6>
          <div className="d-flex flex-row">
            <div>s1</div> <div>s2</div> <div>s3</div> <div>s4</div>
          </div>
          <div className="cursor_pointer" onClick={()=>deletecoach(coach.coach_id)}>
            <h3 className="w-100 book-now-coach text-center">delete</h3>
          </div>
        </div>
      </Outersectionsinglecoachview>
    </>
  );
};

const Singleplayerview = ({ player }) => {
  const deleteplayer = (pid) => {
    axios.get(process.env.REACT_APP_BACKEND_URL+ "/player/delete/"+pid)
      .then((response) => {
        console.log(response.data)
      }, (error) => {
        console.log("some error")
       })
  }
  return (
    <>
      <Outersectionsinglecoachview>
        <div className="bg-coach p-3 ">
        <h2>{player.player_id}</h2>
          <h2>{player.user.name}</h2>
          <h6>{player.user.email}</h6>
          <div className="cursor_pointer" onClick={()=>deleteplayer(player.pid)}>
            <h3 className="w-100 book-now-coach text-center">delete</h3>
          </div>
        </div>
      </Outersectionsinglecoachview>
    </>
  );
};







//_______________________________________________
const getallplayersfunc = async() => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/player/all`
  );
  return response.data
};
const Seeandadduser = () => {
  const { data: allplayers, isLoading:il1, refetch: refetchallplayers } = useQuery(
    "get_all_players",
    () => getallplayersfunc(),
    {
      refetchOnMount: false,
      refetchInterval: 5000,
    }
  );

  let players = ["coach1", "coach2", "coach3"];
  //console.log(allplayers)
  const [player, setPlayer] = useState({
    name: "",
    email: "",
    password: "",
  });
  const changePlayer = (event) => {
    const { name, value } = event.target;
    setPlayer((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
    //console.log(player);
  };
  const addplayer = () => {
    player.roles = "PLAYER"
    axios.post(process.env.REACT_APP_BACKEND_URL + "/user/add", player)
      .then((response) => {
        console.log(response)
      }, (error) => { })
  }

  if (il1) return "Loading...";
  return (
    <div className="container">
      <div className="row">
        {allplayers.map((player, index) => (
          <div className="col-4 my-2" key={index}>
            <Singleplayerview  player={player} />
          </div>
        ))}
      </div>
      <Addplayerview className="mt-5">
        <h1>Add an player</h1>
        <div class="d-flex flex-row">
          <input
            type="text"
            placeholder="enter player name"
            className="px-2"
            name="name"
            onChange={changePlayer}
          />
          <input
            type="text"
            placeholder="set player email id for login"
            className="px-3 mx-3"
            name="email"
            onChange={changePlayer}
          />
          <input
            type="text"
            placeholder="set player password"
            name="password"
            className="px-3"
            onChange={changePlayer}
          />
          <input
            type="submit"
            value="create new player"
            name="password"
            className="px-3 btn btn-primary mx-2"
            onClick={()=>addplayer()}
          />
        </div>
      </Addplayerview>
    </div>
  );
};
//___________________________________________________________















//______________________________________________
const getallcoachesfunc = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/coach/all`
  );
  return response.data
}
const Seeallcoaches = () => {
  const [coach, setCoach] = useState({
    name: "",
    email: "",
    password: "",
  });
  let players = ["coach1", "coach2", "coach3"];
  const changePlayer = (event) => {
    const { name, value } = event.target;
    setCoach((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
    //console.log(coach);
  };
  const addcoach = () => {
    coach.roles = "COACH"
    axios.post(process.env.REACT_APP_BACKEND_URL + "/user/add", coach)
      .then((response) => {
        console.log(response)
      }, (error) => { })
  }

  const { data: allcoaches, isLoading:allcoachesloading, refetch: refetchallcoaches } = useQuery(
    "get_all_coaches",
    () => getallcoachesfunc(),
    {
      refetchOnMount: false,
      refetchInterval: 5000,
    }
  );

  //console.log(allcoaches)

  if(allcoachesloading) {return "loading"}
  return (
    <div className="container">
      <div className="row container">
        {allcoaches.map((coach, index) => (
          <div className="col-4 my-2" key={index}>
            <Singlecoachview coach={coach} />
          </div>
        ))}
      </div>
      <Addplayerview className="mt-5">
        <h1>Add a new coach</h1>
        <div class="d-flex flex-row">
          <input
            type="text"
            placeholder="enter coach name"
            className="px-2"
            name="name"
            onChange={changePlayer}
          />
          <input
            type="text"
            placeholder="set player username"
            className="px-3 mx-3"
            name="email"
            onChange={changePlayer}
          />
          <input
            type="text"
            placeholder="set player password"
            name="password"
            className="px-3"
            onChange={changePlayer}
          />
          <input
            type="submit"
            value="create new coach"
            className="px-3 btn btn-primary mx-2"
            onClick={()=>addcoach()}
          />
        </div>
      </Addplayerview>
    </div>
  );
};
//_______________________________________________









//___________________________________________________
const Addtrainingsession = () => {
  const [visiblegroundbooking, setVisiblegroundbooking] = useState(false); // groundbooking
  const [selectedDivIndex, setSelectedDivIndex] = useState(-1);
  const [booking, setBooking] = useState({
    bookingdate: "none",
    bookingtime: "none",
  });
  const time_slot_for_a_ground = ["Div 1", "Div 2", "Div 3", "Div 4"];
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
  return (
    <Admin_view_schedule_traing_season>
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
                        onClick={() => handlebookingtime("08.00-10.00", index)}
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
      {!visiblegroundbooking && (
        <div className="container">
          <h1 className="mt-5">book a coach for personal training</h1>
          <div className="row">
            <div className="col-lg-4 my-2">
              <Singlecoachview handleButtonClick={handleButtonClick} />
            </div>
            <div className="col-lg-4 my-2">
              <Singlecoachview handleButtonClick={handleButtonClick} />
            </div>
            <div className="col-lg-4 my-2">
              <Singlecoachview handleButtonClick={handleButtonClick} />
            </div>
            <div className="col-lg-4 my-2">
              <Singlecoachview handleButtonClick={handleButtonClick} />
            </div>
          </div>
        </div>
      )}
    </Admin_view_schedule_traing_season>
  );
};
//______________________________________________________-










//_______________________________________________________________
const Aproovecoachrequests = () => {
  return (
    <Approvecoach className="container">
      <table style={{ width: "100%" }}>
        <tr className="heading_row h2">
          <th>Player name</th>
          <th>Requested coach</th>
          <th>date</th>
          <th>time</th>
          <th>buttons</th>
        </tr>
        <tr className="not_heading_row my-1 h6">
          <td>Player name</td>
          <td>Requested coach</td>
          <td>date</td>
          <td>time</td>
          <td className="p-2">
            <input type="submit" className="btn btn-success" value="approve" />
            <input type="submit" className="btn btn-danger" value="deny" />
          </td>
        </tr>
        <tr className="not_heading_row my-5 h6">
          <td>Player name</td>
          <td>Requested coach</td>
          <td>date</td>
          <td>time</td>
          <td className="p-2">
            <input type="submit" className="btn btn-success" value="approve" />
            <input type="submit" className="btn btn-danger" value="deny" />
          </td>
        </tr>
        <tr className="not_heading_row my-1 h6">
          <td>Player name</td>
          <td>Requested coach</td>
          <td>date</td>
          <td>time</td>
          <td className="p-2">
            <input type="submit" className="btn btn-success" value="approve" />
            <input type="submit" className="btn btn-danger" value="deny" />
          </td>
        </tr>
        <tr className="not_heading_row my-5 h6">
          <td>Player name</td>
          <td>Requested coach</td>
          <td>date</td>
          <td>time</td>
          <td className="p-2">
            <input type="submit" className="btn btn-success" value="approve" />
            <input type="submit" className="btn btn-danger" value="deny" />
          </td>
        </tr>
      </table>
    </Approvecoach>
  );
};
//_________________________________________________________________

const Returncomponentbasedonchoose = ({ choose }) => {
  if (choose === 0) {
    return <Seeandadduser />;
  }
  if (choose === 1) {
    return <Seeallcoaches />;
  }
  if (choose === 2) {
    return <Addtrainingsession />;
  }
  if (choose === 3) {
    return <Aproovecoachrequests />;
  }
};

function Adminhome({ user }) {
  const [choose, setChoose] = useState(0);
  let actions = [
    "add or delete players",
    "add or delete coaches",
    "schedule events",
    "approve coach requests",
  ];
  return (
    <Outsideadminhome>
      <Navbar user={user} />
      <div className="">
        <div className="container d-flex flex-row my-3">
          {actions.map((action, index) => (
            <div
              className="singletimeslot mx-2 p-2 h6 cursor_pointer"
              style={{
                backgroundColor: choose === index ? "red" : "#38bacf",
              }}
              onClick={() => setChoose(index)}
            >
              {action}
            </div>
          ))}
        </div>
        <Returncomponentbasedonchoose choose={choose} />
      </div>
    </Outsideadminhome>
  );
}

const Admin_view_schedule_traing_season = styled.div`
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

const Outsideadminhome = styled.div`
  .singletimeslot {
    background-color: #2aabe4;
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
const Addplayerview = styled.div`
  input[type="text"] {
    border: 4px solid #2aabe4;
    height: 40px;
    border-radius: 0 10px 0 10px;
    width: 80%;
  }
`;
const Approvecoach = styled.div`
  .heading_row {
    background-color: #ffcd24;
    color: white;
  }
  .not_heading_row {
    background-color: #2aabe4;
    color: white;
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

export default Adminhome;
