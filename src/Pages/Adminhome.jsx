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
    axios.get(process.env.REACT_APP_BACKEND_URL + "/coach/delete/" + pid).then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log("some error");
      }
    );
  };
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
          <div
            className="cursor_pointer"
            onClick={() => deletecoach(coach.coach_id)}
          >
            <h3 className="w-100 book-now-coach text-center">delete</h3>
          </div>
        </div>
      </Outersectionsinglecoachview>
    </>
  );
};

const Singleplayerview = ({ player }) => {
  const deleteplayer = (pid) => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/player/delete/" + pid).then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log("some error");
      }
    );
  };
  return (
    <>
      <Outersectionsinglecoachview>
        <div className="bg-coach p-3 ">
          <h2>{player.player_id}</h2>
          <h2>{player.user.name}</h2>
          <h6>{player.user.email}</h6>
          <div
            className="cursor_pointer"
            onClick={() => deleteplayer(player.pid)}
          >
            <h3 className="w-100 book-now-coach text-center">delete</h3>
          </div>
        </div>
      </Outersectionsinglecoachview>
    </>
  );
};

//_______________________________________________
const getallplayersfunc = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/player/all`
  );
  return response.data;
};
const Seeandadduser = () => {
  const {
    data: allplayers,
    isLoading: il1,
    refetch: refetchallplayers,
  } = useQuery("get_all_players", () => getallplayersfunc(), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });

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
    player.roles = "PLAYER";
    axios.post(process.env.REACT_APP_BACKEND_URL + "/user/add", player).then(
      (response) => {
        console.log(response);
      },
      (error) => {}
    );
  };

  if (il1) return "Loading...";
  return (
    <div className="container">
      <div className="row">
        {allplayers.map((player, index) => (
          <div className="col-lg-4  col-sm-6 col-12 my-2" key={index}>
            <Singleplayerview player={player} />
          </div>
        ))}
      </div>
      <Addplayerview className="mt-5">
        <h1>Add an player</h1>
        <div class="row">
          <div className="col-lg-4 col-12">
            <input
              type="text"
              placeholder="enter player name"
              className="px-2 m-2"
              name="name"
              onChange={changePlayer}
            />
          </div>

          <div className="col-lg-4 col-12">
            <input
              type="text"
              placeholder="set player email id for login"
              className="px-3 col-lg-4 col-12 m-2"
              name="email"
              onChange={changePlayer}
            />
          </div>

          <div className="col-lg-4 col-12">
            <input
              type="text"
              placeholder="set player password"
              name="password"
              className="px-3 col-lg-4 col-12 m-2"
              onChange={changePlayer}
            />
          </div>

          <div className="col-lg-4 col-12">
            <input
              type="submit"
              value="create new player"
              name="password col-lg-4 col-12"
              className="px-3 btn btn-primary m-2"
              onClick={() => addplayer()}
            />
          </div>
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
  return response.data;
};
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
    coach.roles = "COACH";
    axios.post(process.env.REACT_APP_BACKEND_URL + "/user/add", coach).then(
      (response) => {
        console.log(response);
      },
      (error) => {}
    );
  };

  const {
    data: allcoaches,
    isLoading: allcoachesloading,
    refetch: refetchallcoaches,
  } = useQuery("get_all_coaches", () => getallcoachesfunc(), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });

  //console.log(allcoaches)

  if (allcoachesloading) {
    return "loading";
  }
  return (
    <div className="container">
      <div className="row container">
        {allcoaches.map((coach, index) => (
          <div className="col-lg-4  col-sm-6 col-12 my-2" key={index}>
            <Singlecoachview coach={coach} />
          </div>
        ))}
      </div>
      <Addplayerview className="mt-5">
        <h1>Add a new coach</h1>
        <div class="row">
          <div className="col-lg-4 col-12">
            <input
              type="text"
              placeholder="enter coach name"
              className="px-2 m-2"
              name="name"
              onChange={changePlayer}
            />
          </div>

          <div className="col-lg-4 col-12">
            <input
              type="text"
              placeholder="set coach emailid/username for login"
              className="px-3 m-2"
              name="email"
              onChange={changePlayer}
            />
          </div>

          <div className="col-lg-4 col-12">
            <input
              type="text"
              placeholder="set coach password"
              name="password"
              className="px-3 m-2"
              onChange={changePlayer}
            />
          </div>

          <div className="col-lg-4 col-12">
            <input
              type="submit"
              value="create new coach"
              className="px-3 btn btn-primary mx-2"
              onClick={() => addcoach()}
            />
          </div>
        </div>
      </Addplayerview>
    </div>
  );
};
//_______________________________________________

//___________________________________________________
const Addtrainingsession = ({ user }) => {
  const [selectedDivIndex, setSelectedDivIndex] = useState(-1);
  const [booking, setBooking] = useState({
    bookingdate: "none",
    bookingtime: "none",
  });
  const [training, setTraining] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const {
    data: allcoaches,
    isLoading: allcoachesloading,
    refetch: refetchallcoaches,
  } = useQuery("get_all_coaches", () => getallcoachesfunc(), {
    refetchOnMount: false,
    refetchInterval: 5000,
  });

  const changeTraining = (event) => {
    const { name, value } = event.target;
    setTraining((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
    console.log(training)
  };

  const addEvent = () => {
    training.time = booking.bookingtime
    console.log(training);
    axios.post(process.env.REACT_APP_BACKEND_URL + "/club/addTrainingGroup/" + user.clubid+"/1", training).then(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.log("some error");
      }
    );
    
  };
  const time_slot_for_a_ground = ["Div 1", "Div 2", "Div 3", "Div 4"];
  function handleButtonClick() {
    window.scrollTo(0, 0);
  }
  function handlebookingdate(event) {
    setBooking({ ...booking, bookingdate: event.target.value });
  }
  const handlebookingtime = (val, index) => {
    setBooking({ ...booking, bookingtime: val });
    setSelectedDivIndex(index);
  };
  return (
    <Admin_view_schedule_traing_season className="container">
      <Addplayerview className="mt-5">
        <h1>Add an traing batch</h1>
        <div class="">
          <input
            type="text"
            placeholder="enter traing batch name"
            className="px-2"
            name="name"
            onChange={changeTraining}
          />
          <br />

          <br/>
          <div className="d-flex flex-row my-3">
            <div>
              <h5>select a start date</h5>
              <input
                type="date"
                placeholder="choose the start date"
                className="px-3"
                name="startDate"
                onChange={changeTraining}
              />
            </div>

            <div className="mx-5">
              <h5>select a end date</h5>
              <input
                type="date"
                placeholder="choose the start date"
                className="px-3 mx-3"
                name="endDate"
                onChange={changeTraining}
              />
            </div>
          </div>
          <br />

          <h5>choose a time duration for the traing batch</h5>
          <div className="row my-3">
            {time_slot_for_a_ground.map((single_time_slot, index) => (
              <div className="col-lg-3">
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

          <input
            type="submit"
            value="create new training batch"
            name="password"
            className="px-3 btn btn-primary"
            onClick={() => addEvent()}
          />
        </div>
      </Addplayerview>
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

const Returncomponentbasedonchoose = ({ choose, user }) => {
  if (choose === 0) {
    return <Seeandadduser />;
  }
  if (choose === 1) {
    return <Seeallcoaches />;
  }
  if (choose === 2) {
    return <Addtrainingsession user={user}  />;
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
        <Returncomponentbasedonchoose choose={choose} user={user} />
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
