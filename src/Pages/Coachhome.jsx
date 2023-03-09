import { Upcoming } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";

import Navbar from "../Components/Navbar/Navbar";
function Coachhome({ user }) {
  const [upcomingevents, setUpcomingevents] = useState([
    "evt1",
    "evt2",
    "evt3",
    "evt4",
  ]);
  return (
    <Coachviewoutside>
      <Navbar user={user} />
      <div className="container my-5">
        <h1>Your upcoming events</h1>
        <Upcomingevents className="container">
          <table style={{ width: "100%" }} className="p-2">
            <tr className="heading_row h2">
              <th>event type</th>
              <th>event location</th>
              <th>event date</th>
              <th>eventtime</th>
            </tr>
            {upcomingevents.map((singleevent) => (
              <tr className="not_heading_row my-1 h6">
                <td>Player name</td>
                <td>Requested coach</td>
                <td>date</td>
                <td>time</td>
              </tr>
            ))}
          </table>
        </Upcomingevents>
      </div>
    </Coachviewoutside>
  );
}
const Upcomingevents = styled.div`
  .heading_row {
    background-color: #ffcd24;
    color: white;
  }
  .not_heading_row {
    background-color: #2aabe4;
    color: white;
  }
`;
const Coachviewoutside = styled.div``;

export default Coachhome;
